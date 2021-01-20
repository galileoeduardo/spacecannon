export default class PlataformaGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene) {

        super(
            scene.physics.world,
            scene,
            [
                scene.add.image(0,224,'plataforma03').setOrigin(0,0),
                scene.add.image(153,230,'plataforma04').setOrigin(0,0),
                scene.add.image(361,224,'plataforma05').setOrigin(0,0)
            ],
            {immovable:true}
        );

        this.children.entries.forEach(element => {
            element.body.immovable = true;
        });
        
    }

}