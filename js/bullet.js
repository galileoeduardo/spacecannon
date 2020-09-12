export default class Bullets {
    
    constructor(scene) {
        this._scene = scene;
        this._bulletTime = 0;
        this._bullets = this._scene.physics.add.group({
            key: 'bullet',
            quantity: 24,
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            outOfBoundsKill: true,
            velocityX: 300,
            velocityY: 150
        });
    }
    
    static fireBullet = (time) => {
        console.log(Object.getOwnPropertyNames(this));
        console.log(this._bullets.scene.player.x)
        if (time > this._bulletTime)
        {
            
            if (this._bullets[0])
            {
                this._bullets[0].reset(this._bullets.scene.player.x + 6, this._bullets.scene.player.x - 12);
                this._bullets[0].body.velocity.y = -600;
                this._bulletTime = time + 100;
            }
        }
    
    }
}