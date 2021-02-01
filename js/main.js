import Loader from './loader.js';
import Level1 from './level1.js';

const config = {
        type: Phaser.AUTO,
        parent: 'stage',
        disableContextMenu: true,
        pixelArt: true,
        width: 512,
        height: 256,
        scale: {
            mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
    scene: [
        Loader,
        Level1
    ]
};

const game = new Phaser.Game(config);

function preload() {}

function create() {

    
}

function update () {

    
}

