import Animation from './animation.js';
import BulletGroup from './bulletGroup.js';
import Cannon from './cannon.js';
import Enemies from './enemies.js';
import MyInputs from './myinputs.js';
import Player from './player.js';

export default class Level extends Phaser.Scene {
    
    static Animation;
    static BulletGroup;
    static Console;
    static Text;
    static Enemies;
    static Keyboard;
    static Player;
    static Cannon;
    
    constructor() {
        super({
            key: "Level"
        });

        this.Cannon = new Cannon(this);
        this.MyInputs = new MyInputs(this);
        this.Player = new Player(this);

    }

    preload() {}

    create() {
        
        this.Enemies = new Enemies(this);
        this.BulletGroup = new BulletGroup(this);

        const bg_color = this.add.graphics();
        bg_color.fillGradientStyle(0x000000, 0x000000, 0x0000ff, 0x0000ff, 1);
        bg_color.fillRect(0, 64, 512, 512);

        this.add.image(0,0,'bg_stars').setOrigin(0,0);

        this.Console = this.add.bitmapText(256, 16, 'sunset', '00000000', 16, 1).setOrigin(0.5).setCenterAlign();
        this.Text = this.add.text(10, 20, '', { font: '10px Courier', fill: '#00ff00' });

        this.add.image(0,200,'bg_level01').setOrigin(0,0);
        this.add.image(0,208,'fg_level01').setOrigin(0,0);

        this.Cannon.create();
        


        this.Enemies.create();
        this.MyInputs.create();
        
    }

    update() {
        this.Cannon.update();
        this.Enemies.update();
        
        //this.Player.gameObject.body.velocity.x = 0;

        if (this.MyInputs.Cursors.left.isDown)
        {
            
        }
        else if (this.MyInputs.Cursors.right.isDown)
        {
            this.BulletGroup.fireBulletRight(this.time.now);
        }

    }

}