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

    fireBulletLeft(time) {
        
        if (time > this.bulletTime) {

            let bullet = this.getFirstDead(true);

            if (bullet) {
                bullet.fire(16,192,45,500,-500);
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