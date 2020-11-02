export default class Cannon {

    pointer;
    cannon_left_rotation = 0;

    constructor(scene) {
        this._scene = scene;
    }

    create() {
        
        const cannon_left = this._scene.add.sprite(14,196,'cannon_left').setOrigin(0.3,0.7).setInteractive();
        cannon_left.name = "cannon_left";

        const text = this._scene.add.text(10, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' });
        
        cannon_left.on('pointerdown', function (event) {
            this.BulletGroup.fireBulletLeft(this.time.now,this.Cannon.cannon_left_rotation);
            this.pointer = this.input.activePointer;
        },this._scene);

        cannon_left.on('pointermove', function (event) {
            if (event.isDown == true) {

                const distance = Phaser.Math.Distance.Between(event.downX, event.downY, event.x, event.y);

                if(distance >= 7.5 && event.downTime > 3000) {
                    const direction = ((event.angle * Phaser.Math.RAD_TO_DEG) > 0) ? 'down' : 'up';
                    this.Cannon.setAngle(direction);
                    event.downTime = 0;
                }

            }
        },this._scene);

        cannon_left.on('pointerup', function (event) {
            //event.downTime = 0;
           
        },this._scene);

        this._scene.add.sprite(470,168,'cannon_right').setOrigin(0,0);
        this._scene.add.sprite(192,160,'cannon_center').setOrigin(0,0);
    }

    update() {

      
    }

    setAngle(direction) {
        const cannon = this._scene.children.getAll( "name" , "cannon_left");

        if(direction == 'up') {
            if (cannon[0].rotation > -.25) cannon[0].rotation = cannon[0].rotation - .25;

        } else if (direction == 'down') {
            if (cannon[0].rotation < .25) cannon[0].rotation = cannon[0].rotation + .25;
        }

        this.cannon_left_rotation = cannon[0].rotation;

    }

}