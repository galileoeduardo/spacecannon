import Animation from './animation.js';
import BulletGroup from './bulletGroup.js';
import Enemies from './enemies.js';
import Keyboard from './keyboard.js';
import Player from './player.js';

export default class Level extends Phaser.Scene {
    
    static Animation;
    static BulletGroup;
    static Console;
    static Enemies;
    static Keyboard;
    static Player;
    
    constructor() {
        super({
            key: "Level"
        });

        this.Keyboard = new Keyboard(this);
        this.Player = new Player(this);

    }

    preload() {}

    create() {
        this.Enemies = new Enemies(this);
        this.BulletGroup = new BulletGroup(this);

        this.add.image(0,0,'bg_level01').setOrigin(0,0);
        this.Enemies.create();
        this.Keyboard.create();
        this.Console = this.add.text(10, 10, 'Console', { font: '"Press Start 2P"' });
    }

    update() {
        this.Enemies.update();
        
        //this.Player.gameObject.body.velocity.x = 0;

        if (this.Keyboard.Cursors.left.isDown)
        {
            this.BulletGroup.fireBulletLeft(this.time.now);
        }
        else if (this.Keyboard.Cursors.right.isDown)
        {
            this.BulletGroup.fireBulletRight(this.time.now);
        }
        
        if (this.Keyboard.FireButton.isDown)
        {
            //this.Bullet.fireBullet(this.time.now);
        }

    }

}