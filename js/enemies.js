export default class Enemies {

    timedEnemyLaunchEvent;

    enemies_actual_position = new Array();
    speed = 50;

    config = [ 
        { id:"enemy01", frame: 0, force: 3.8 },
        { id:"enemy01", frame: 0, force: 3.6 },
        { id:"enemy01", frame: 0, force: 3.4 },
        { id:"enemy02", frame: 0, force: 3.6 },
        { id:"enemy02", frame: 0, force: 3.2 },
        { id:"enemy02", frame: 0, force: 3.1 },
        { id:"enemy02", frame: 0, force: 3.0 },
        { id:"enemy03", frame: 0, force: 5 },
        { id:"enemy03", frame: 0, force: 6 },
        { id:"enemy03", frame: 0, force: 8 }
    ];

    enemies_launch = { next: 0, total: this.config.length};

    constructor(scene) {
        this._scene = scene;
        for (let i = 0; i < this.config.length; i++) {
            
            let addConfig = this.config[i];
            
            addConfig = {...addConfig, index: i, start_y: 48, on_base: true};

            addConfig = this.getBoolRandon() 
            ? { ...addConfig, start_on: 'right', start_x: 512 } 
            : { ...addConfig, start_on: 'left', start_x: -64};

            this.config[i] = addConfig;
            
        }
    }

    create() {
        this.timedEnemyLaunchEvent = setInterval(this.launch, 5000);
    }

    update() {

        const enemies = this._scene.children.getAll( "name" , "enemies_ship");
        
        this._scene.physics.collide(enemies, this._scene.BulletGroup.children.entries, this.enemyHit, this.processHit, this);
        
        let same_level;
        
        enemies.forEach(enemy => {
            
            for (let index = 0; index < enemies.length; index++) {
                same_level = (enemies[index].y == enemy.y && enemies[index].getData("id") != enemy.getData("id")) ? index : undefined;
            };

            if (same_level != undefined) { //enemy in the same level
                const distance = Phaser.Math.Distance.Between(
                    enemy.x,
                    enemy.y,
                    enemies[same_level].x,
                    enemies[same_level].y
                );

                if (distance < 64) this.dodge(enemies[same_level]);
            }

            if(enemy.x < -64 || enemy.x > 512) { //fora da tela
                
                //move para faixa inferior
                this.moveLower(enemy);
                
            }
            
        });

    }

    getBoolRandon() {
        return Phaser.Math.Between(0, 1);
    }

    launch = () => {

        const enemy = this._scene.physics.add.sprite(0,0,this.config[0].id,this.config[0].frame);
        enemy.name = "enemies_ship";
        enemy.setData(this.config.shift());

        if (enemy.getData("start_on") == 'left') {
            enemy.body.velocity.x = enemy.getData("force") * this.speed;
            enemy.flipX = true;
        } else {
            enemy.body.velocity.x = (enemy.getData("force") * this.speed) * -1;
            enemy.flipX = false;
        }

        enemy.x = enemy.getData("start_x");
        enemy.y = enemy.getData("start_y");

        this._scene.anims.create({
            key: enemy.getData('id') + 'loop',
            frameRate: 12,
            frames: this._scene.anims.generateFrameNumbers(enemy.getData('id'), { start: 0, end: 1}),
            repeat: -1
        });

        this._scene.anims.create({
            key: enemy.getData('id') + 'hit',
            frameRate: 12,
            frames: this._scene.anims.generateFrameNumbers(enemy.getData('id'), { start: 2, end: 4}),
            repeat: 0,
            hideOnComplete: true
        });
        
        enemy.play(enemy.getData('id') + 'loop');

        enemy.on('animationcomplete', this.animationCompleteHit, this);
        
        if(this.config.length <= 0) clearInterval(this.timedEnemyLaunchEvent); //stop launch

    }

    moveLower(enemy) {
        enemy.x = enemy.getData("start_x");
        enemy.y += 32;
    }

    dodge(enemy) {
        
        enemy.y = enemy.y + 32;
    }

    enemyHit(enemy,bullet) {

        bullet.setActive(false);
        bullet.setVisible(false);

        enemy.setVelocityX(0);
        enemy.setVelocityY(0);
        enemy.play(enemy.getData("id") + "hit");

    }

    animationCompleteHit(animation,frame,enemy) {

        if(animation.key === enemy.getData("id") + "hit") {
            enemy.setActive(false);
            this._scene.children.remove(enemy);    
        }
        
    }

    processHit(enemy) {
          
    }

}