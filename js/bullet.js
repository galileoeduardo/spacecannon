export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene,x,y) {
        super(scene,x,y,'bullet_1');
    }

    fire(config) {
        
        this.body.reset(config.x,config.y);
        
        this.setActive(true);
        this.setVisible(true);
        this.depth = 9999;

        this.x = config.x;
        this.y =  config.y;
        this._rotation = config.rotation;
        this.body.velocity.x = config.vx;
        this.body.velocity.y = config.vy;
    }

}