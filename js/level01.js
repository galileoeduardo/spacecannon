import Bullet from './bullet.js';
import Player from './player.js';
import Keyboard from './keyboard.js'
export default class Level01 extends Phaser.Scene {
    
    static Player;
    static Bullets;
    static Keyboard;
    
    constructor() {
        super({
            key: "Level01"
        });
    }

    preload() {}

    create() {
        this.add.image(0,0,'bg_level01').setOrigin(0,0);
        this.Bullet = new Bullet(this);
        this.Player = new Player(this);
        this.Keyboard = new Keyboard(this);
    }

    update() {

        this.Player.gameObject.body.velocity.x = 0;

        if (this.Keyboard.Cursors.left.isDown)
        {
            this.Player.gameObject.body.velocity.x = -300;
        }
        else if (this.Keyboard.Cursors.right.isDown)
        {
            this.Player.gameObject.body.velocity.x = 300;
        }

        if (this.Keyboard.FireButton.isDown)
        {
            this.Bullet.fireBullet(this.time.now);
        }

    }

}