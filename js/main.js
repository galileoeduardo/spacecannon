import Loader from './loader.js';
import Level1 from './level1.js';

const config = {
        type: Phaser.AUTO,
        disableContextMenu: true,
        pixelArt: true,
        scale: {
            parent: 'stage',
            width: 512,
            height: 256
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

