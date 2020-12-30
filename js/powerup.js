export default class PowerUp {

    constructor(scene) {
        this._scene = scene;
    }

    create() {
        let el = this._scene.add.sprite(256,16,'powerup_2').setOrigin(0.5,-10);
        el.name = "powerup_2";
        el.angle = 90;
    }

    launchPowerUp(number = 0) {

        let powerup = this._scene.children.getAll( "name" , "powerup_" + number);
        //TODO: active and play
        
    }
}