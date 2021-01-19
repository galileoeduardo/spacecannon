import Bomb from './bomb.js';

export default class BombGroup extends Phaser.Physics.Arcade.Group {
    
    bombTime = 0;
    
    constructor(scene) {
        super(scene.physics.world,scene);

        scene.anims.create({
            key: 'loop',
            frameRate: 12,
            frames: scene.anims.generateFrameNumbers('bomb', { start: 0, end: 1}),
            repeat: -1
        });

        this.createMultiple({
            classType: Bomb,
            frameQuantity: 3,
            active: false,
            visible: false,
            key: ['loop'],
        });

    }

    fireBomb(config) {

        let bomb;
        bomb = this.getFirstDead(true);
        if (bomb) {
            bomb.fire(config);
        }
    
    }

}