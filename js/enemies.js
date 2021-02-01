export default class Enemies {

    enemies_actual_position = new Array();
    speed = 60;

    config = [ 
        { id:"enemy01", scale: .7, force: 3.8 },
        { id:"enemy01", scale: .7, force: 3.6 },
        { id:"enemy01", scale: .7, force: 3.4 },
        { id:"enemy02", scale: .7, force: 3.6 },
        { id:"enemy02", scale: .7, force: 3.2 },
        { id:"enemy02", scale: .7, force: 3.1 },
        { id:"enemy02", scale: .7, force: 3.0 },
        { id:"enemy03", scale: .7, force: 5.1 },
        { id:"enemy03", scale: .7, force: 6.1 },
        { id:"enemy03", scale: .7, force: 8.1 }
    ];

    enemies_launch = { next: 0, total: this.config.length};

    constructor(scene) {
        this._scene = scene;
        for (let i = 0; i < this.config.length; i++) {
            
            let addConfig = this.config[i];
            
            addConfig = {...addConfig, index: i, start_y: 36, on_base: true, nivel: 0};

            addConfig = this.getBoolRandon() 
            ? { ...addConfig, start_on: 'right', start_x: 512 } 
            : { ...addConfig, start_on: 'left', start_x: -64};

            this.config[i] = addConfig;
            
        }
    }

    update() {

        const enemies = this._scene.children.getAll( "name" , "enemies_ship");
        
        this._scene.physics.collide(enemies, this._scene.BulletGroup.children.entries, this.enemyHit, this.processHit, this);
        
        let same_level;
        
        enemies.forEach(enemy => {
            
            for (let index = 0; index < enemies.length; index++) {
                same_level = (enemies[index].y == enemy.y && enemies[index].getData("id") != enemy.getData("id")) ? index : undefined;
            };

            if(enemy.x < -64 || enemy.x > 512) { //fora da tela
                
                //move para faixa inferior
                this.moveLower(enemy);
                
            }
            
        });

    }

    getBoolRandon() {
        return Phaser.Math.Between(0, 1);
    }

    launch = (resolve) => {

        const enemy = this._scene.physics.add.sprite(0,0,this.config[0].id,0);
        enemy.name = "enemies_ship";
        enemy.setData(this.config.shift());
        enemy.setScale(enemy.getData("scale"));

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

        enemy.play(enemy.getData('id') + 'loop');

        if(this.config.length <= 0) {
            clearInterval(this._scene.timedEnemyLaunchEvent); //stop launch
            console.log("End level");
        }

    }

    moveLower(enemy) {

        //if passed 5x destroy enemy
        if (enemy.getData('nivel') >= 5) {
            enemy.setActive(false);
            this._scene.children.remove(enemy);
            return;
        }

        //move lower
        enemy.x = enemy.getData("start_x");
        enemy.y += 22;
        enemy.data.values.nivel += 1;
        enemy.setData('scale',enemy.getData("scale") + .1)
        enemy.setScale(enemy.getData("scale"));

        //if passed by 5 shoot bomb
        if (enemy.getData('nivel') == 5) {
            setTimeout(() => {
                const vx = (enemy.getData('start_on') == "left") ? 40 : -40;
                this._scene.BombGroup.fireBomb({x: enemy.x, y:enemy.y + 10, vx: vx, vy: 80});
            }, enemy.getData('force') * 120);
            
        }
        
    }

    enemyHit(enemy,bullet) {
       
        const particles = this._scene.add.particles('explosion');

        particles.createEmitter({
            alpha: { start: 1, end: .0 },
            scale: { start: 0.5, end: 2.5 },
            //tint: { start: 0xffCCCC, end: 0x000000 },
            speed: 5,
            accelerationY: 0,
            accelerationX: 0,
            angle: { min: -360, max: 360 },
            rotate: { min: -180, max: 180 },
            lifespan: { min: 250, max: 350 },
            blendMode: 'ADD',
            frequency: 10,
            maxParticles: 8,
            x: enemy.x,
            y: enemy.y
        });

        bullet.x = -32;
        bullet.y = -32;
        bullet.setActive(false);
        bullet.setVisible(false);

        enemy.setVelocityX(0);
        enemy.setVelocityY(0);
        enemy.setActive(false);

        this._scene.children.remove(enemy);
        this._scene.registry.set('score',this._scene.registry.list.score + (enemy.getData('force') * 10));

    }

    processHit(enemy) {
          
    }

}