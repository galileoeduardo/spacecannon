export default class Keybpoard {
    
    static Cursors;
    static FireButton;

    constructor(scene) {
        this._scene = scene;
        this.Cursors = this._scene.input.keyboard.createCursorKeys();
        this.FireButton = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
 
}