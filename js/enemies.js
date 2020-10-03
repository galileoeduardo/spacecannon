export default class Enemies {

    timedEnemyLaunchEvent;
    enemies = new Array();

    enemies_actual_position = new Array();
    speed = 50;

    config = [ 
        { id:"enemy01", frame: 0, force: 3.2 },
        { id:"enemy02", frame: 0, force: 3.6 },
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

            this.enemies[i] = this._scene.physics.add.sprite(0,0,this.config[i].id,this.config[i].frame);
            this.enemies[i].config = addConfig;
            
        }

        Phaser.Actions.SetXY(this.enemies, 0, -96, 0, -64);

    }

    update() {

        this.enemies.forEach(({config,x,y,on_base}) => {
            if (!on_base) this.enemies_actual_position.push(
                {config,x,y}
            );
        });

        this._scene.physics.collide(this.enemies, this._scene.Bullet.Group, this.enemyHit, this.processHit, this);

        this.enemies.forEach(enemy => {
            
            const same_level = this.enemies_actual_position.find(({config,y}) => y == enemy.y && config.id != enemy.config.id);
            
            if (same_level != undefined) { //enemy in the same level
                const distance = Phaser.Math.Distance.Between(
                    enemy.x,
                    enemy.y,
                    this.enemies[same_level.config.index].x,
                    this.enemies[same_level.config.index].y
                );
                if (distance < 64) this.dodge(this.enemies[same_level.config.index]);
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

    launch = () => {
        const enemy = this.enemies[this.enemies_launch.next];
        this.enemies_launch.next++;
        if (enemy.config.start_on == 'left') {
            enemy.body.velocity.x = enemy.config.force * this.speed;
            enemy.flipX = true;
        } else {
            enemy.body.velocity.x = (enemy.config.force * this.speed) * -1;
            enemy.flipX = false;
        }

        enemy.config.on_base = false;
        enemy.x = enemy.config.start_x;
        enemy.y = enemy.config.start_y;

        if(this.enemies_launch.next >= this.enemies_launch.total) clearInterval(this.timedEnemyLaunchEvent); //stop launch

    }

    moveLower(enemy) {
        enemy.x = enemy.config.start_x;
        enemy.y += 32;
    }

    dodge(enemy) {
        enemy.y = enemy.y + 32;
    }

    enemyHit(enemy) {
        //enemy.play('hit');
    }

    processHit(enemy) {
        enemy.destroy();    
    }

}