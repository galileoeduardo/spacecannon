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
        
        this.load.image('enemy01', 'nave_blue_slow.png');
        this.load.image('enemy02', 'nave_blue_medium.png');
        this.load.image('enemy03', 'nave_blue_fast.png');
        this.load.spritesheet({
            key: 'bullet',
            url: 'fire_bullet.png',
            frameConfig: {
                frameWidth: 2,
                frameHeight: 4,
                startFrame: 0,
                endFrame: 0
            }
        });
        
    }

    create() {}
    update() {}

}