import Animation from './animation.js';
import Bullet from './bullet.js';
import Player from './player.js';
import Enemies from './enemies.js';
import Keyboard from './keyboard.js';
export default class Level extends Phaser.Scene {
    
    static Animation;
    static Player;
    static Bullets;
    static Keyboard;
    static Console;
    
    constructor() {
        super({
            key: "Level"
        });
    }

    preload() {}

    create() {
        this.add.image(0,0,'bg_level01').setOrigin(0,0);
        this.Enemies = new Enemies(this);
        this.Bullet = new Bullet(this);
        this.Player = new Player(this);
        this.Enemies = new Enemies(this);
        this.Animation = new Animation(this);
        this.Keyboard = new Keyboard(this);

        this.Console = this.add.text(10, 10, 'Console', { font: '"Press Start 2P"' });
    }

    update() {
        this.Enemies.update();
        
        //this.Player.gameObject.body.velocity.x = 0;

        if (this.Keyboard.Cursors.left.isDown)
        {
            this.Bullet.fireBulletLeft(this.time.now);
        }
        else if (this.Keyboard.Cursors.right.isDown)
        {
            this.Bullet.fireBulletRight(this.time.now);
        }
        
        if (this.Keyboard.FireButton.isDown)
        {
            //this.Bullet.fireBullet(this.time.now);
        }

    }

}