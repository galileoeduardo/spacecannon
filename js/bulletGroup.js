import Bullet from './bullet.js';

export default class BulletGroup extends Phaser.Physics.Arcade.Group {
    
    bulletTime = 0;
    
    constructor(scene) {
        super(scene.physics.world,scene);   

        this.createMultiple({
            classType: Bullet,
            frameQuantity: 5,
            active: false,
            visible: false,
            key: 'bullet'
        });

    }

    fireBulletLeft(time,angle) {
        const config = {
            "-0.25" : {x:30, y:166, rotation:-175, vx:350, vy:-600},
            "0"     : {x:40, y:170, rotation:  45, vx:500, vy:-500},
            "0.25"  : {x:50, y:174, rotation:  45, vx:650, vy:-400}
        };

        if (time > this.bulletTime) {

            let bullet = this.getFirstDead(true);

            if (bullet) {
                bullet.fire(config[angle]);
                this.bulletTime = time + 700;
            }
            
        }
    
    }

    fireBulletRight(time) {

        if (time > this.bulletTime) {
            
            let bullet = this.getFirstDead(true);
            
            if (bullet) {
                bullet.fire(496,192,-45,-500,-500);
                this.bulletTime = time + 700;
            }

        }
    
    }

}