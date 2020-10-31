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
 
}