export default class Player {
    constructor(scene) {
        this._scene = scene;
        this.gameObject = this._scene.physics.add.sprite(400, 550, 'ship');
        this.gameObject.body.collideWorldBounds = true;
    }


}