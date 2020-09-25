export default class Enemies {

    static handlerEnd;
    static enemies;
    enemies_actual_position = new Array();
    speed = 100;

    config = [ 
        { id:"enemy01", spritex:32, spritey:64, force: 3 },
        { id:"enemy02", spritex:32, spritey:64, force: 3 },
        { id:"enemy03", spritex:32, spritey:64, force: 4 }
    ];

    constructor(scene) {

        this._scene = scene;

        this.enemies = this._scene.physics.add.group({
            quantity: this.config.length,
            collideWorldBounds: false,
            velocityX: 0,
            velocityY: 0
        });

        for (let i = 0; i < this.config.length; i++) {
            
            let addConfig = this.config[i];
            
            addConfig = {...addConfig, index: i, start_y: 48, on_base: true};

            addConfig = this.getBoolRandon() 
            ? { ...addConfig, start_on: 'right', start_x: 512 } 
            : { ...addConfig, start_on: 'left', start_x: -64};
            
            this.enemies.children.entries[i] = this._scene.physics.add.sprite( this.config[i].spritex, this.config[i].spritey, this.config[i].id);
            this.enemies.children.entries[i].config = addConfig;
        }

        Phaser.Actions.SetXY(this.enemies.getChildren(), 0, -96, 0, -64);
        
        this.launch(this.getEnemyFromBase());

    }

    update() {

        this.enemies.children.entries.forEach(({x,y,on_base}) => {
            if (!on_base) this.enemies_actual_position.push({x,y});
        });
        
        this.enemies.children.entries.forEach(enemy => {
            
            //move para faixa inferior
            if(enemy.config.on_base == false && enemy.x < -64 || enemy.x > 512) {
                
                if(enemy.y == enemy.config.start_y) { //saiu da tela na primeira faixa de cima
                    let next = this.getEnemyFromBase();
                    if (next != undefined) this.launch(next);
                }

                this.moveLower(enemy);
                
            }

            
        });

        this.enemies_actual_position = [];

    }

    getBoolRandon() {
        return Phaser.Math.Between(0, 1);
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
        return this.enemies.children.entries.find(enemy => enemy.config.on_base);
    }

    moveLower(enemy) {
        enemy.x = enemy.config.start_x;
        enemy.y += 32;
    }

}