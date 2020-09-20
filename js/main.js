import Loader from './loader.js';
import Level from './level.js';

const config = {
        type: Phaser.CANVAS,
        scale: {
            parent: 'stage',
            mode: Phaser.Scale.FIT,
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
        Level
    ]
};

const game = new Phaser.Game(config);

function preload() {}

function create() {

    
}

function update () {

    
}

