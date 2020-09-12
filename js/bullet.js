export default class Bullets {
    
    constructor(scene) {
        this._scene = scene;
        this._bulletTime = 0;
        this.Group = this._scene.physics.add.group({
            key: 'bullet',
            quantity: 1,
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: false,
            outOfBoundsKill: true,
            velocityX: 0,
            velocityY: 200
        });
    }
    
    fireBullet = (time) => {

        if (time > this._bulletTime)
        {
            if (!!this.Group.getFirst(true))
            {
                let bullet = this.Group.getFirst(true);
                bullet.x = this._scene.Player.gameObject.x + 6;
                bullet.y =  this._scene.Player.gameObject.y - 12;
                bullet.body.velocity.y = -600;
                this._bulletTime = time + 100;
            }
        }
    
    }
}