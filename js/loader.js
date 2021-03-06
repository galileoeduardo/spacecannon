﻿export default class Loader extends Phaser.Scene {
    constructor() {
        super({
            key: "Loader"
        });
    }

    preload() {

        this.load.on('complete', () => {
            this.scene.start('Level1');
        });

        this.load.setBaseURL('/assets/');

        this.load.image('bg_stars', 'sprites/stars_paralax.png');
        this.load.image('bg_planet', 'sprites/planeta01.png');
        
        this.load.image('plataforma01', 'sprites/plataforma01.png');
        this.load.image('plataforma02', 'sprites/plataforma02.png');

        this.load.spritesheet(
            'plataforma03',
            'sprites/plataforma03.png',
            {
                frameWidth: 152,
                frameHeight: 31,
                startFrame: 0,
                endFrame: 2
            }
        );

        this.load.spritesheet(
            'plataforma04',
            'sprites/plataforma04.png',
            {
                frameWidth: 208,
                frameHeight: 25,
                startFrame: 0,
                endFrame: 2
            }
        );

        this.load.spritesheet(
            'plataforma05',
            'sprites/plataforma05.png',
            {
                frameWidth: 152,
                frameHeight: 31,
                startFrame: 0,
                endFrame: 2
            }
        );        

        this.load.image('shieldbar', 'sprites/lifebar.png');

        this.load.image('explosion', 'sprites/explosion.png');
        this.load.image('observatorio', 'sprites/observatorio.png');
        this.load.image('celula', 'sprites/celula.png');
        this.load.image('gerador', 'sprites/gerador.png');
        this.load.image('antena', 'sprites/antena.png');
        this.load.image('celula_small', 'sprites/celula_small.png');

        this.load.bitmapFont('sunset', 'fonts/bitmap/atari-sunset.png', 'fonts/bitmap/atari-sunset.xml');

        this.load.spritesheet(
            'cannon_left',
            'sprites/cannon_left.png',
            {
                frameWidth: 41,
                frameHeight: 41,
                startFrame: 0,
                endFrame: 0
            }
        );

        this.load.spritesheet(
            'cannon_right',
            'sprites/cannon_right.png',
            {
                frameWidth: 41,
                frameHeight: 41,
                startFrame: 0,
                endFrame: 0
            }
        );

        this.load.spritesheet(
            'cannon_center',
            'sprites/cannon_center.png',
            {
                frameWidth: 126,
                frameHeight: 80,
                startFrame: 0,
                endFrame: 1
            }
        );
        
        this.load.spritesheet(
            'enemy01',
            'sprites/enemy_ship_1.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 1
            }
        );

        this.load.spritesheet(
            'enemy02',
            'sprites/enemy_ship_2.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 1
            }
        );

        this.load.spritesheet(
            'enemy03',
            'sprites/enemy_ship_3.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 1
            }
        );

       
        this.load.spritesheet({
            key: 'bullet_1',
            url: 'sprites/fire_bullet_1.png',
            frameConfig: {
                frameWidth: 4,
                frameHeight: 4,
                startFrame: 0,
                endFrame: 5
            }
        });

        this.load.spritesheet({
            key: 'bullet_2',
            url: 'sprites/fire_bullet_2.png',
            frameConfig: {
                frameWidth: 4,
                frameHeight: 4,
                startFrame: 0,
                endFrame: 5
            }
        });

        this.load.spritesheet({
            key: 'bomb',
            url: 'sprites/bomb.png',
            frameConfig: {
                frameWidth: 8,
                frameHeight: 8,
                startFrame: 0,
                endFrame: 3
            }
        });

        this.load.spritesheet({
            key: 'powerup_2',
            url: 'sprites/powerup_2.png',
            frameConfig: {
                frameWidth: 22,
                frameHeight: 8,
                startFrame: 0,
                endFrame: 1
            }
        });
        
    }

    create() {

        this.registry.set('score',0);
        this.registry.set('shield',100);
        this.registry.set('shield_plus',0);
        this.registry.set('level',1);

        this.registry.events.on('changedata',this.updateData,this);

    }
    
    updateData(parent, key, data) {
        
        const scene_hud = this.scene.get('Level'+ this.registry.list.level);

        if (key == 'score') {
            scene_hud.TextScore.setText(data);
        } else if (key == 'shield') {
            scene_hud.ShieldBar.scaleX = data / 100;
        }

    }

}