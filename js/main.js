import Loader from './loader.js';
import Level01 from './level01.js';
import Bullet from './bullet.js';

const config = {
        type: Phaser.AUTO,
        width: 512,
        height: 256,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
    scene: [
        Loader,
        Level01
    ]
};

const game = new Phaser.Game(config);

function preload() {}

function create() {

    
}

function update () {

    
}

