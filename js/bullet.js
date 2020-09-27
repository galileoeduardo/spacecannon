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
            outOfBoundsKill: true
        });
    }
    
    fireBulletLeft(time) {

        if (time > this.bulletTime)
        {
            if (!!this.Group)
            {
                let bullet = this.Group.getFirst(true);
                bullet.x = 32;
                bullet.y =  192;
                bullet._rotation = 45;
                bullet.body.velocity.x = 1200;
                bullet.body.velocity.y = -600;
                this.bulletTime = time + 250;
            }
        }
    
    }

    fireBulletRight(time) {

        if (time > this.bulletTime)
        {
            if (!!this.Group)
            {
                let bullet = this.Group.getFirst(true);
                bullet.x = 480;
                bullet.y =  192;
                bullet._rotation = -45;
                bullet.body.velocity.x = -1200;
                bullet.body.velocity.y = -600;
                this.bulletTime = time + 250;
            }
        }
    
    }
}