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

        this.load.setBaseURL('/assets/');

        this.load.image('bg_stars', 'sprites/stars_paralax.png');
        
        this.load.image('bg_level01', 'sprites/base_bg.png');
        this.load.image('fg_level01', 'sprites/base_fg.png');

        this.load.bitmapFont('sunset', 'fonts/bitmap/atari-sunset.png', 'fonts/bitmap/atari-sunset.xml');

        this.load.spritesheet(
            'cannon_left',
            'sprites/cannon_left.png',
            {
                frameWidth: 41,
                frameHeight: 41,
                startFrame: 0,
                endFrame: 0
            }
        );

        this.load.spritesheet(
            'cannon_right',
            'sprites/cannon_right.png',
            {
                frameWidth: 41,
                frameHeight: 41,
                startFrame: 0,
                endFrame: 0
            }
        );

        this.load.spritesheet(
            'cannon_center',
            'sprites/cannon_center.png',
            {
                frameWidth: 126,
                frameHeight: 80,
                startFrame: 0,
                endFrame: 0
            }
        );
        
        this.load.spritesheet(
            'enemy01',
            'sprites/enemy_ship_1.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 4
            }
        );

        this.load.spritesheet(
            'enemy02',
            'sprites/enemy_ship_2.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 4
            }
        );

        this.load.spritesheet(
            'enemy03',
            'sprites/enemy_ship_3.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 4
            }
        );

       
        this.load.spritesheet({
            key: 'bullet',
            url: 'sprites/fire_bullet.png',
            frameConfig: {
                frameWidth: 4,
                frameHeight: 4,
                startFrame: 0,
                endFrame: 5
            }
        });
        
    }

    create() {

        

    }
    update() {}

}