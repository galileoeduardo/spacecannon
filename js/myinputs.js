export default class MyInputs {
    _scene;
    static Cursors;
    static Pointer;

    constructor(scene) {
        this._scene = scene;
        
    }

    create() {
        this.Cursors = this._scene.input.keyboard.createCursorKeys();
        this.Pointer = this._scene.input.addPointer(3);
    }

    update() {
        //TODO: limit time for best performance
        if (this.Cursors.left.isDown)
        {
            this._scene.BulletGroup.fireBullet(this._scene.time.now,'left',this._scene.Cannon.cannon_rotation["cannon_left"]);
        }

        if (this.Cursors.up.isDown)
        {
            this._scene.BulletGroup.fireBullet(this._scene.time.now,'center',this._scene.Cannon.cannon_rotation["cannon_center"]);
        }
        
        if (this.Cursors.right.isDown)
        {
            this._scene.BulletGroup.fireBullet(this._scene.time.now,'right',this._scene.Cannon.cannon_rotation["cannon_right"]);
        }

    }
 
}