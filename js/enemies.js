export default class Enemies {

    static handlerEnd;
    speed = 100;
    enemy_base = {
        position: {  x: 0, y: -64 }
    };

    config = [ 
        { id:"enemy01", spritex:32, spritey:64, force: 5 },
        { id:"enemy02", spritex:32, spritey:64, force: 3 },
        { id:"enemy03", spritex:32, spritey:64, force: 4 },
        { id:"enemy01", spritex:32, spritey:64, force: 1 },
        { id:"enemy02", spritex:32, spritey:64, force: 2 },
        { id:"enemy03", spritex:32, spritey:64, force: 3 }
    ];

    enemies = Array();

    constructor(scene) {

        this._scene = scene;

        for (let i = 0; i < this.config.length; i++) {
            
            let addConfig = this.config[i];
            
            addConfig = {...addConfig, index: i, start_y: 48, on_base: true};

            addConfig = this.getBoolRandon() 
            ? { ...addConfig, start_on: 'right', start_x: 512 } 
            : { ...addConfig, start_on: 'left', start_x: -64};
            

            this.enemies[i] = this._scene.physics.add.sprite( this.config[i].spritex, this.config[i].spritey, this.config[i].id);
            this.enemies[i].config = addConfig;
            
            this.enemies[i].x = this.enemy_base.position.x;
            this.enemies[i].y = this.enemy_base.position.y * (i+1);
            
        }
        
        this.launch(this.getEnemyFromBase());

    }

    getBoolRandon() {
        return Math.round(Math.random() * 1);
    }

    update() {
        this.enemies.forEach(enemy => {
            
            //move para faixa inferior
            if(enemy.config.on_base == false && enemy.x < -64 || enemy.x > 512) {
                
                if(enemy.y == enemy.config.start_y) { //saiu da tela na primeira faixa de cima
                    let next = this.getEnemyFromBase();
                    if (next != undefined) this.launch(next);
                }
                
                enemy.x = enemy.config.start_x;
                enemy.y += 32;
                
            }    

            
        });
    }

    launch(enemy) {
        
        enemy.config.on_base = false;
        
        enemy.x = enemy.config.start_x;
        enemy.y = enemy.config.start_y;
        

        if (enemy.config.start_on == 'left') enemy.flipX = true;
        const velocity_x = (enemy.config.start_on == 'left') ? enemy.config.force * this.speed : (enemy.config.force * this.speed) * -1;
        enemy.body.velocity.x = velocity_x;
    
    }

    getEnemyFromBase() {
        return this.enemies.find(enemy => enemy.config.on_base);
    }

}