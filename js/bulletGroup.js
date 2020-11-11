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

    fireBulletLeft(time,cannon,angle) {

        const config = {
            left: {
                "-0.25" : {x:35, y:160, rotation: 45, vx:250, vy:-400},
                "0"     : {x:40, y:170, rotation: 45, vx:400, vy:-400},
                "0.25"  : {x:50, y:175, rotation: 45, vx:550, vy:-400}
            },
            right: {
                "-0.25" : {x:458, y:170, rotation: 15, vx:-550, vy:-400},
                "0"     : {x:468, y:165, rotation: 15, vx:-400, vy:-400},
                "0.25"  : {x:478, y:160, rotation: 15, vx:-250, vy:-400}
            }
        };

        if (time > this.bulletTime) {

            let bullet = this.getFirstDead(true);

            if (bullet) {
                bullet.fire(config[cannon][angle]);
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