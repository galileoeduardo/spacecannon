import Bomb from './bomb.js';

export default class BombGroup extends Phaser.Physics.Arcade.Group {
    
    bombTime = 0;
    _scene = null;
    
    constructor(scene) {
        super(scene.physics.world,scene);
        this._scene = scene;
        

        this.createMultiple({
            classType: Bomb,
            frameQuantity: 3,
            active: false,
            visible: false,
            key: ['loop'],
        });

    }

    update() {

        this._scene.physics.collide(
            this._scene.PlataformaGroup.children.entries,
            this.children.entries,
            this.bombHit,
            this.processHit,
            this
        );

    }

    bombHit(plat,bomb) {

        plat.play(plat.texture.key+'hit');

        const particles = this._scene.add.particles('explosion');

        particles.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 0.5, end: 2.0 },
            tint: { start: 0xff6600, end: 0xff6600 },
            speed: 10,
            accelerationY: 0,
            accelerationX: 0,
            angle: { min: -360, max: 360 },
            rotate: { min: -360, max: 360 },
            lifespan: { min: 750, max: 800 },
            blendMode: 'ADD',
            frequency: 0,
            maxParticles: 5,
            x: bomb.x,
            y: bomb.y
        });

        bomb.setVelocityX(0);
        bomb.setVelocityY(0);
        
        this._scene.children.remove(bomb);
        
        this._scene.registry.set('shield', this._scene.registry.list.shield - 5);

    }

    processHit(plat) {
        
    }

    fireBomb(config) {

        let bomb;
        bomb = this.getFirstDead(true);
        if (bomb) {
            bomb.fire(config);
        }
    
    }

}