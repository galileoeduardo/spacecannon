export default class Cannon {

    pointer;
    cannon_rotation = { 
        cannon_left: 0,
        cannon_right:0,
        cannon_center:0
    };

    constructor(scene) {
        this._scene = scene;
    }

    create() {
        
        //cannon left
        const cannon_left = this._scene.add.sprite(14,196,'cannon_left').setOrigin(0.3,0.7).setInteractive();
        cannon_left.name = "cannon_left";
        
        cannon_left.on('pointerdown', function (event) {
            this.BulletGroup.fireBullet(this.time.now,'left',this.Cannon.cannon_rotation["cannon_left"]);
            this.pointer = this.input.activePointer;
        },this._scene);

        cannon_left.on('pointermove', function (event) {
            if (event.isDown == true) {

                const distance = Phaser.Math.Distance.Between(event.downX, event.downY, event.x, event.y);

                if(distance >= 7.5 && event.downTime > 3000) {
                    const direction = ((event.angle * Phaser.Math.RAD_TO_DEG) > 0) ? 'down' : 'up';
                    this.Cannon.setAngle('cannon_left',direction);
                    event.downTime = 0;
                }

            }
        },this._scene);

        cannon_left.on('pointerup', function (event) {
            //event.downTime = 0;
           
        },this._scene);

        //cannon right
        
        const cannon_right = this._scene.add.sprite(498,196,'cannon_right').setOrigin(0.7,0.7).setInteractive();
        cannon_right.name = "cannon_right";

        cannon_right.on('pointerdown', function (event) {
            this.BulletGroup.fireBullet(this.time.now,'right',this.Cannon.cannon_rotation["cannon_right"]);
            this.pointer = this.input.activePointer;
        },this._scene);

        cannon_right.on('pointermove', function (event) {
            if (event.isDown == true) {

                const distance = Phaser.Math.Distance.Between(event.downX, event.downY, event.x, event.y);

                if(distance >= 7.5 && event.downTime > 3000) {
                    const direction = ((event.angle * Phaser.Math.RAD_TO_DEG) > 0) ? 'up' : 'down';
                    this.Cannon.setAngle('cannon_right',direction);
                    event.downTime = 0;
                }

            }
        },this._scene);

        cannon_right.on('pointerup', function (event) {
            //event.downTime = 0;
           
        },this._scene);

        //cannon center
        const cannon_center = this._scene.add.sprite(224,177,'cannon_center').setOrigin(0,0).setInteractive();
        cannon_center.name = "cannon_center";

        cannon_center.on('pointerdown', function (event) {
            this.BulletGroup.fireBullet(this.time.now,'center',this.Cannon.cannon_rotation["cannon_center"]);
            this.pointer = this.input.activePointer;
        },this._scene);

    }

    update() {

      
    }

    setAngle(name,direction) {
        const cannon = this._scene.children.getAll( "name" , name);

        if(direction == 'up') {
            if (cannon[0].rotation > -.25) cannon[0].rotation = cannon[0].rotation - .25;

        } else if (direction == 'down') {
            if (cannon[0].rotation < .25) cannon[0].rotation = cannon[0].rotation + .25;
        }

        this.cannon_rotation[name] = cannon[0].rotation;

    }

}