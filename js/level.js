import Animation from './animation.js';
import PowerUp from './powerup.js';
import BulletGroup from './bulletGroup.js';
import BombGroup from './bombGroup.js';
import PlataformaGroup from './plataformaGroup.js';
import Cannon from './cannon.js';
import Enemies from './enemies.js';
import MyInputs from './myinputs.js';
import Player from './player.js';

export default class Level extends Phaser.Scene {
    
    static Animation;
    static PowerUp;
    static BulletGroup;
    static BombGroup;
    static PlataformaGroup;
    static TextScore;
    static LifeBar;
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
        this.data.life = 100;

        //Enemies
        this.Enemies = new Enemies(this);
        this.BombGroup = new BombGroup(this);
        this.Enemies.create();

        //Background
        const bg_color = this.add.graphics();
        bg_color.fillGradientStyle(0x000000, 0x000000, 0x0000ff, 0x0000ff, 1);
        bg_color.fillRect(0, 64, 512, 512);

        this.add.image(0,0,'bg_stars').setOrigin(0,0);
        this.add.image(400,50,'bg_planet').setOrigin(0,0);

        //Player
        this.add.image(0,200,'plataforma01').setOrigin(0,0);
        this.add.image(462,200,'plataforma02').setOrigin(0,0);
        this.PlataformaGroup = new PlataformaGroup(this);

        this.Cannon.create();
        this.BulletGroup = new BulletGroup(this);
        this.PowerUp.create();

        //Input Player
        this.MyInputs.create();

        //HUD
        this.TextScore = this.add.bitmapText(256, 16, 'sunset', '', 16, 1).setOrigin(0.5).setCenterAlign();
        this.Text = this.add.bitmapText(370, 15, 'sunset', 'life', 10, 1).setOrigin(0.5);
        this.LifeBar = this.add.image(400,12,'lifebar').setOrigin(0);
        
        //Global
        this.Animation.create();
        
    }

    update() {
        this.Cannon.update();
        this.Enemies.update();
        this.BombGroup.update();
        

        this.TextScore.setText(this.data.score);
        this.LifeBar.scaleX = this.data.life / 100;
        
        
        if (this.MyInputs.Cursors.left.isDown) {
            //this.BulletGroup.fireBulletLeft(this.time.now);
        } else if (this.MyInputs.Cursors.right.isDown) {
            //this.BulletGroup.fireBulletRight(this.time.now);
        }

    }

}