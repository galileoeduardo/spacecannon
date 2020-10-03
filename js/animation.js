export default class Animation {

    static _scene;

    constructor(scene) {
        this._scene = scene;
    }

    create() {
        this._scene.anims.create({
            key: 'loop',
            frameRate: 12,
            frames: this._scene.anims.generateFrameNumbers('enemies_ship', { start: 0, end: 1}),
            repeat: -1
        });

        this._scene.anims.create({
            key: 'hit',
            frameRate: 12,
            frames: this._scene.anims.generateFrameNumbers('enemies_ship', { start: 2, end: 8}),
            repeat: 0,
            hideOnComplete: true
        });
    }
}