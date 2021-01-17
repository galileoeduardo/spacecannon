export default class Animation {

    static _scene;

    constructor(scene) {
        this._scene = scene;
    }

    create() {
        
        const powerup2 = this._scene.children.getFirst( "name" , "powerup_2");

        //animate frames
        this._scene.anims.create({
            key: "powerup_2loop",
            frameRate: 12,
            frames: this._scene.anims.generateFrameNumbers( "powerup_2", { start: 0, end: 1}),
            repeat: -1
        });
        
        powerup2.play("powerup_2loop");

        //animate tween
        this._scene.tweens.add({
            targets: powerup2,
            angle: -90, // '+=100'
            ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1500,
            repeat: -1,
            yoyo: true
        });
    }
}