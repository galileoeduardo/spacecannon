import Animation from './animation.js';
import PowerUp from './powerup.js';
import BulletGroup from './bulletGroup.js';
import BombGroup from './bombGroup.js';
import PlataformaGroup from './plataformaGroup.js';
import Cannon from './cannon.js';
import Enemies from './enemies.js';
import MyInputs from './myinputs.js';
import Player from './player.js';

export default class Level1 extends Phaser.Scene {
    
    static Animation;
    static PowerUp;
    static BulletGroup;
    static BombGroup;
    static PlataformaGroup;
    static TextScore;
    static TextLevel;
    static LifeBar;
    static Enemies;
    static Keyboard;
    static Player;
    static Cannon;
    static timedEnemyEvent;
    
    constructor() {
        super({
            key: "Level1"
        });

        
        this.PowerUp = new PowerUp(this);
        this.Cannon = new Cannon(this);
        this.Animation = new Animation(this);
        this.MyInputs = new MyInputs(this);
        this.Player = new Player(this);

    }

    preload() {}

    create() {
        
        //Enemies
        this.Enemies = new Enemies(this);
        this.BombGroup = new BombGroup(this);

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
        this.TextScore = this.add.bitmapText(256, 16, 'sunset', '0', 16, 1).setOrigin(0.5).setCenterAlign();
        this.TextLevel = this.add.bitmapText(256, 128, 'sunset', 'LEVEL' + this.registry.list.level, 16, 1).setOrigin(0.5).setCenterAlign().setName('LevelText').setAlpha(0);
        this.Text = this.add.bitmapText(362, 14, 'sunset', 'shield', 10, 1).setOrigin(0.5);
        this.ShieldBar = this.add.image(400,12,'shieldbar').setOrigin(0);
        
        //Global
        this.Animation.create();
        
        
        
        //Start level
        setTimeout(() =>
                this.tweens.add({
                    targets: this.TextLevel,
                    alpha: 1, // '+=100'
                    ease: "Cubic", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 1000,
                    repeat: 0,
                    yoyo: true
                })
        ,0);

        this.events.emit('enemyLaunched');

    }

    update() {

        this.MyInputs.update();
        this.Cannon.update();
        this.Enemies.update();
        this.BombGroup.update();


    }

}