export default class Enemies {

    static timedEnemyLaunchEvent;
    static enemies;
    enemies_actual_position = new Array();
    speed = 50;

    config = [ 
        { id:"enemy01", spritex:32, spritey:64, force: 3.2 },
        { id:"enemy02", spritex:32, spritey:64, force: 3.6 },
        { id:"enemy03", spritex:32, spritey:64, force: 4.1 },
        { id:"enemy01", spritex:32, spritey:64, force: 3.2 },
        { id:"enemy02", spritex:32, spritey:64, force: 3.4 },
        { id:"enemy03", spritex:32, spritey:64, force: 4.3 },
        { id:"enemy01", spritex:32, spritey:64, force: 3.2 },
        { id:"enemy02", spritex:32, spritey:64, force: 3.5 },
        { id:"enemy03", spritex:32, spritey:64, force: 4.5 }
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

        this.timedEnemyLaunchEvent = this._scene.time.addEvent({
            delay: 5000,
            callback: this.launch,
            callbackScope: this,
            repeat: this.config.length - 1,
            startAt: 5000 
        });

    }

    update() {

        this.enemies.children.entries.forEach(({config,x,y,on_base}) => {
            if (!on_base) this.enemies_actual_position.push(
                {config,x,y}
            );
        });

        this.enemies.children.entries.forEach(enemy => {
            
            const same_level = this.enemies_actual_position.find(({config,y}) => y == enemy.y && config.id != enemy.config.id);
            
            if (same_level != undefined) { //enemy in the same level
                const distance = Phaser.Math.Distance.Between(
                    enemy.x,
                    enemy.y,
                    this.enemies.children.entries[same_level.config.index].x,
                    this.enemies.children.entries[same_level.config.index].y
                );
                if (distance < 64) this.dodge(this.enemies.children.entries[same_level.config.index]);

            }

            if(enemy.config.on_base == false && enemy.x < -64 || enemy.x > 512) { //fora da tela
                
                //move para faixa inferior
                this.moveLower(enemy);
                
            }

            
        });

        this.enemies_actual_position = [];

    }

    getBoolRandon() {
        return Phaser.Math.Between(0, 1);
    }

    launch() {
        const enemy = this.getEnemyFromBase();
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

    dodge(enemy) {
        enemy.y = enemy.y + 32;
    }

}