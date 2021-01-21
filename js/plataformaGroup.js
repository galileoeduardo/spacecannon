export default class PlataformaGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene) {

        super(
            scene.physics.world,
            scene,
            [
                scene.add.sprite(0,224,'plataforma03').setOrigin(0,0),
                scene.add.sprite(152,230,'plataforma04').setOrigin(0,0),
                scene.add.sprite(360,224,'plataforma05').setOrigin(0,0)
            ],
            {immovable:true}
        );

        this.children.entries.forEach(element => {
            element.body.immovable = true;
        });
        
    }

}