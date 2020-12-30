export default class Animation {

    static _scene;

    constructor(scene) {
        this._scene = scene;
    }

    create() {
        
        /*this._scene.tweens.add({
            target: ,
            key: 'rotatiom',
            value: 0,
            yoyo: true,
            repeat: -1,
            repeatDelay: 1000,
            hold: 1000,
            duraton: 3000
        });*/
        this._scene.tweens.add({
            targets: this._scene.children.getFirst( "name" , "powerup_2"),
            angle: -90, // '+=100'
            ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1500,
            repeat: -1,
            yoyo: true
        });
    }
}