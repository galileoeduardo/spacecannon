export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene,x,y) {
        super(scene,x,y,'bullet');
    }

    fire(x,y,rotation,vx,vy) {
        this.body.reset(x,y);
        
        this.setActive(true);
        this.setVisible(true);
        this.depth = 9999;

        this.x = x;
        this.y =  y;
        this._rotation = rotation;
        this.body.velocity.x = vx;
        this.body.velocity.y = vy;
    }

}