export default class Enemies {

    timedEnemyLaunchEvent;

    enemies_actual_position = new Array();
    speed = 50;

    config = [ 
        { id:"enemy01", scale: 1, force: 3.8 },
        { id:"enemy01", scale: 1, force: 3.6 },
        { id:"enemy01", scale: 1, force: 3.4 },
        { id:"enemy02", scale: 1, force: 3.6 },
        { id:"enemy02", scale: 1, force: 3.2 },
        { id:"enemy02", scale: 1, force: 3.1 },
        { id:"enemy02", scale: 1, force: 3.0 },
        { id:"enemy03", scale: 1, force: 5.1 },
        { id:"enemy03", scale: 1, force: 6.1 },
        { id:"enemy03", scale: 1, force: 8.1 }
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

        const enemy = this._scene.physics.add.sprite(0,0,this.config[0].id,0);
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

        enemy.play(enemy.getData('id') + 'loop');

        if(this.config.length <= 0) clearInterval(this.timedEnemyLaunchEvent); //stop launch

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
        enemy.y += 20;
        enemy.data.values.nivel += 1;

        //if passed by 5 shoot bomb
        if (enemy.getData('nivel') == 5) {
            setTimeout(() => {
                const vx = (enemy.getData('start_on') == "left") ? 30 : -30;
                this._scene.BombGroup.fireBomb({x: enemy.x, y:enemy.y + 10, vx: vx, vy: 50});
            }, 1500);
            
        }

        console.log(enemy.getData('nivel'));
        
    }

    enemyHit(enemy,bullet) {
       
        const particles = this._scene.add.particles('explosion');

        particles.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 0.5, end: 2.0 },
            tint: { start: 0x6666ff, end: 0x6666ff },
            speed: 20,
            accelerationY: 0,
            accelerationX: 0,
            angle: { min: -360, max: 360 },
            rotate: { min: -360, max: 360 },
            lifespan: { min: 750, max: 800 },
            blendMode: 'ADD',
            frequency: 0,
            maxParticles: 5,
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
        this._scene.data.score += enemy.getData('force') * 10;

    }

    processHit(enemy) {
          
    }

}