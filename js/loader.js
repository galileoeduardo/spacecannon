export default class Loader extends Phaser.Scene {
    constructor() {
        super({
            key: "Loader"
        });
    }

    preload() {

        this.load.on('complete', () => {
            this.scene.start('Level');
        });

        this.load.setBaseURL('/assets/sprites/');
        this.load.image('bg_level01', 'bg_stage_512x256_star.jpg');
        this.load.image('ship', 'ship_red_fast.png');
        this.load.image('bullet', 'fire_bullet.png');
        
    }

    create() {}
    update() {}

}