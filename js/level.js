﻿import Animation from './animation.js';
import PowerUp from './powerup.js';
import BulletGroup from './bulletGroup.js';
import BombGroup from './bombGroup.js';
import Cannon from './cannon.js';
import Enemies from './enemies.js';
import MyInputs from './myinputs.js';
import Player from './player.js';

export default class Level extends Phaser.Scene {
    
    static Animation;
    static PowerUp;
    static BulletGroup;
    static BombGroup;
    static CannonGroup;
    static TextScore;
    static Enemies;
    static Keyboard;
    static Player;
    static Cannon;
    
    constructor() {
        super({
            key: "Level"
        });

        
        this.PowerUp = new PowerUp(this);
        this.Cannon = new Cannon(this);

        this.Animation = new Animation(this);

        this.MyInputs = new MyInputs(this);
        this.Player = new Player(this);

    }

    preload() {}

    create() {
        this.data.score = 0;
        this.Enemies = new Enemies(this);
        this.BulletGroup = new BulletGroup(this);
        this.BombGroup = new BombGroup(this);

        const bg_color = this.add.graphics();
        bg_color.fillGradientStyle(0x000000, 0x000000, 0x0000ff, 0x0000ff, 1);
        bg_color.fillRect(0, 64, 512, 512);

        this.add.image(0,0,'bg_stars').setOrigin(0,0);

        this.TextScore = this.add.bitmapText(256, 16, 'sunset', '', 16, 1).setOrigin(0.5).setCenterAlign();
        //this.Text = this.add.text(10, 20, '', { font: '10px Courier', fill: '#00ff00' });

        this.add.image(0,200,'bg_level01').setOrigin(0,0);
        this.add.image(400,50,'bg_planet').setOrigin(0,0);

        
        

        this.Cannon.create();

        this.PowerUp.create();
        this.Enemies.create();

        this.Animation.create();
        this.MyInputs.create();        
        
    }

    update() {
        this.Cannon.update();
        this.Enemies.update();

        this.TextScore.setText(this.data.score);
        
        if (this.MyInputs.Cursors.left.isDown) {
            //this.BulletGroup.fireBulletLeft(this.time.now);
        } else if (this.MyInputs.Cursors.right.isDown) {
            //this.BulletGroup.fireBulletRight(this.time.now);
        }

    }

}