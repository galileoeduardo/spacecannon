import Player from './player.js';
export default class Level01 extends Phaser.Scene {
    
    constructor() {
        super({
            key: "Level01"
        });
        this._player = null;
        this._bullets = null;
        this._cursors = null;
        this._fireButton = null;
    }

    preload() {}

    create = () => {
        this.add.image(0,0,'bg_level01').setOrigin(0,0);
        this._bullets = new Bullets(this);
        this._player = new Player(this);
        
        this._cursors = this.input.createCursorKeys();
        this._fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {

        this._player.body.velocity.x = 0;

        if (this._cursors.left.isDown)
        {
            this._player.body.velocity.x = -300;
        }
        else if (this._cursors.right.isDown)
        {
            this._player.body.velocity.x = 300;
        }

        if (this._fireButton.isDown)
        {
            this._bullets.fireBullet(this.time.now);
        }

    }

    

}