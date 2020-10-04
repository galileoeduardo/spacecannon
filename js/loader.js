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
        
        this.load.spritesheet(
            'enemy01',
            'enemy_ship_1.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 8
            }
        );

        this.load.spritesheet(
            'enemy02',
            'enemy_ship_2.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 8
            }
        );

        this.load.spritesheet(
            'enemy03',
            'enemy_ship_3.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 8
            }
        );

       
        this.load.spritesheet({
            key: 'bullet',
            url: 'fire_bullet.png',
            frameConfig: {
                frameWidth: 2,
                frameHeight: 4,
                startFrame: 0,
                endFrame: 1
            }
        });
        
    }

    create() {}
    update() {}

}