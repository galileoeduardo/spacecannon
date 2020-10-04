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
                bullet.fire(32,192,45,1200,-600);
                this.bulletTime = time + 250;
            }
            
        }
    
    }

    fireBulletRight(time) {

        if (time > this.bulletTime) {
            
            let bullet = this.getFirstDead(true);
            
            if (bullet) {
                bullet.fire(480,192,-45,-1200,-600);
                this.bulletTime = time + 250;
            }

        }
    
    }

}