export default class Player {
    constructor(scene) {
        this._scene = scene;
        this._player = this._scene.physics.add.sprite(400, 550, 'ship');
        this._player.body.collideWorldBounds = true;
    }


}