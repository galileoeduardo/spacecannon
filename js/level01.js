import Bullet from './bullet.js';
import Player from './player.js';
export default class Level01 extends Phaser.Scene {
    
    constructor() {
        super({
            key: "Level01"
        });
        this.Player = null;
        this.Bullets = null;
        this.Cursors = null;
        this.FireButton = null;
    }

    preload() {}

    create() {
        this.add.image(0,0,'bg_level01').setOrigin(0,0);
        this.Bullet = new Bullet(this);
        this.Player = new Player(this);
        
        this.Cursors = this.input.keyboard.createCursorKeys();
        this.FireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update = () => {

        this.Player.gameObject.body.velocity.x = 0;

        if (this.Cursors.left.isDown)
        {
            this.Player.gameObject.body.velocity.x = -300;
        }
        else if (this.Cursors.right.isDown)
        {
            this.Player.gameObject.body.velocity.x = 300;
        }

        if (this.FireButton.isDown)
        {
            this.Bullet.fireBullet(this.time.now);
        }

    }

    

}