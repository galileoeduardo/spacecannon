export default class Animation {

    static _scene;

    constructor(scene) {
        this._scene = scene;
    }

    create() {

        //animate frames
        this._scene.anims.create({
            key: "powerup_2loop",
            frameRate: 12,
            frames: this._scene.anims.generateFrameNumbers( "powerup_2", { start: 0, end: 1}),
            repeat: -1
        });

        const powerup2 = this._scene.children.getFirst( "name" , "powerup_2");
        powerup2.play("powerup_2loop");

        this._scene.anims.create({
            key: "plataforma03hit",
            frameRate: 24,
            frames: this._scene.anims.generateFrameNumbers( "plataforma03", { start: 0, end: 2}),
            repeat: 2
        });

        this._scene.anims.create({
            key: "plataforma04hit",
            frameRate: 24,
            frames: this._scene.anims.generateFrameNumbers( "plataforma04", { start: 0, end: 2}),
            repeat: 2
        });

        this._scene.anims.create({
            key: "plataforma05hit",
            frameRate: 24,
            frames: this._scene.anims.generateFrameNumbers( "plataforma05", { start: 0, end: 2}),
            repeat: 2
        });

        this._scene.anims.create({
            key: 'loop',
            frameRate: 12,
            frames: this._scene.anims.generateFrameNumbers('bomb', { start: 0, end: 1}),
            repeat: -1
        });
        
        

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