export default class Bullets {

    static Group;
    static bulletTime = 0;
    
    constructor(scene) {
        this._scene = scene;
        this.bulletTime = 0;
        this.Group = this._scene.physics.add.group({
            key: 'bullet',
            quantity: 24,
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: false,
            outOfBoundsKill: true,
            velocityX: 0,
            velocityY: 200
        });
    }
    
    fireBullet(time) {

        if (time > this.bulletTime)
        {
            if (!!this.Group.getFirst(true))
            {
                let bullet = this.Group.getFirst(true);
                bullet.x = this._scene.Player.gameObject.x + 6;
                bullet.y =  this._scene.Player.gameObject.y - 12;
                bullet.body.velocity.y = -600;
                this.bulletTime = time + 100;
            }
        }
    
    }
}