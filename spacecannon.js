var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.setBaseURL('');
    this.load.crossOrigin = 'anonymous';

    this.load.image('ship', 'assets/sprites/ship_red_fast.png');
    this.load.image('bullet ', 'assets/sprites/fire_bullet.png');
    

}

var player;
var bullets;

var cursors;
var fireButton;

var bulletTime = 0;
var bullet;

function create() {
    
    bullets = this.physics.add.group({
        key: 'bullet',
        quantity: 24,
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true,
        outOfBoundsKill: true,
        velocityX: 300,
        velocityY: 150
    });

    player = this.physics.add.sprite(400, 550, 'ship');
    player.body.collideWorldBounds = true;

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}

function update () {

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -600;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 600;
    }

    if (fireButton.isDown)
    {
        fireBullet();
    }

}

function fireBullet () {

    if (this.time > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x + 6, player.y - 12);
            bullet.body.velocity.y = -600;
            bulletTime = this.time + 100;
        }
    }

}