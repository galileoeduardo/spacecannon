export default class Enemies {

    static handlerEnd;
    enemies = new Array();
    
    constructor(scene) {
        this._scene = scene;    
        console.log(this.enemies);
        this.enemies[0] = this._scene.physics.add.sprite(32, 64, 'enemy01');
        console.log(this.enemies[0]);
        this.enemies[0].x = 512;
        this.enemies[0].y = 48;
        this.enemies[0].body.velocity.x = -150;

    }

    update() {

        if(this.enemies[0].x <= -32) {
            this.enemies[0].x = 512;
            this.enemies[0].y += 32;
        }
        
    }

}