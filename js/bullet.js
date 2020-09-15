export default class Bullets {

    static Group;
    static bulletTime = 0;
    
    constructor(scene) {
        this._scene = scene;
        this.bulletTime = 0;
        this.Group = this._scene.physics.add.group({
            key: 'bullet',
            quantity: 4,
            collideWorldBounds: false,
            outOfBoundsKill: true,
            velocityX: 1200,
            velocityY: -600
        });
    }
    
    fireBullet(time) {

        if (time > this.bulletTime)
        {
            if (!!this.Group)
            {
                let bullet = this.Group.getFirst(true);
                bullet.x = 32;
                bullet.y =  192;
                bullet._rotation = 45;
                this.bulletTime = time + 100;
            }
        }
    
    }
}