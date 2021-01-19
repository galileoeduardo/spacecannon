export default class Bomb extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene,x,y) {
        super(scene,x,y,'bomb');
    }

    fire(config) {
        
        this.body.reset(config.x,config.y);
        
        this.setActive(true);
        this.setVisible(true);
        this.depth = 1000;
        this.play('loop');

        if (config.vx < 0) this.flipX = true;

        this.x = config.x;
        this.y =  config.y;
        this.body.velocity.x = config.vx;
        this.body.velocity.y = config.vy;
        //gravity
    }

}