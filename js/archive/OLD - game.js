
//Global variables
var image;
var sprite;
var player;
var wizard;
var platforms;
var cursors;
var playerVel = 10;
var speed = 0.1;
var startTime = Date.now();
var speedModifier = 1.5;
var lastStage = 0;
var stageLength = 10;
var MainMenu;
var Game;

//Create Clock

//Background Variables

var skyTile;
var cloudTile;
var mountainTile;
var pineTile1;
var pineTile2;
var floorTile;

let tileSprites = [skyTile, cloudTile, mountainTile, pineTile1, pineTile2, floorTile];





const config = {
    width: 800,
    height: 300,
    physics: { 
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    },
    type: Phaser.AUTO,
    parent: 'phaser-game',
    scene: {
        preload: preload,
        create: create,
        update: update
    
    },
    audio: {
        disableWebAudio: true
    }
    
};


const game = new Phaser.Game(config);

//define class for obstacles

class Obstacle {

    constructor(game, image){
        this.game = game;
        this.image = image
        this.xPosition = config.width-50;
        this.yPosition = config.height-100;
        this.sprite = null;
    }

    spawn() {
        this.sprite = this.game.physics.add.sprite(this.xPosition, this.yPosition, image);
        this.sprite.body.setGravityY(300);
        this.game.physics.add.collider(this.sprite, platforms);
        
    }


}

function preload() {

    //Sound
    this.load.audio('heatsink', ['audio/heatsinkv3.mp3', 'audio/heatsinkv3.ogg']);
    //Background
   /*  this.load.image('sky', 'assets/background/new/sky.png');
    this.load.image('cloud', 'assets/background/new/cloud.png');
    this.load.image('mountain', 'assets/background/new/mountain2.png');
    this.load.image('pine1', 'assets/background/new/pine1.png');
    this.load.image('pine2', 'assets/background/new/pine2.png');

    //Platforms

    this.load.image('platformbig', 'assets/environment/platforms/platformbig.png');
    this.load.image('underplatformbig', 'assets/environment/platforms/underplatformbig.png');
    
    //Character
    this.load.spritesheet('player1', 'assets/player/adventurer1/adventurer1.png', { frameWidth: 50, frameHeight: 37});
    
    //NPCs
    this.load.spritesheet('wizard1','assets/player/warrior1/Crouch/Warrior_Crouch_1.png', { frameWidth: 69, frameHeight: 44}); */
    //Clock


}


function create () {

    /* //Add Base Platform
    platforms = this.physics.add.staticGroup();
    platforms.create(config.width/2, config.height, 'underplatformbig').refreshBody();

    //Add Backgrounds

    skyTile = this.add.tileSprite(config.width/2, config.height/2, config.width, config.height, 'sky');
    cloudTile = this.add.tileSprite(config.width/2, config.height-80, config.width, config.height, 'cloud');
    mountainTile = this.add.tileSprite(config.width/2, config.height-40, config.width, config.height-50, 'mountain');
    pineTile1 = this.add.tileSprite(config.width/2, config.height-50, config.width, 80, 'pine1');
    pineTile2 = this.add.tileSprite(config.width/2, config.height-60, config.width, 70, 'pine2');
    floorTile = this.add.tileSprite(config.width/2, config.height, config.width, 70, 'platformbig');
 */
  /*   for (var tileSprite in tileSprites) {
        tileSprite.fixedTocamera = true;
    }; */

    //Player Anims

  /*   this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player1', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('player1', {start: 17, end: 23}),
        frameRate: 10
    });

    this.anims.create({
        key: 'slide',
        frames: this.anims.generateFrameNumbers('player1', {start: 25, end: 28}),
        frameRate: 2,
        repeat: -1
    });
 */

    this.anims.create({
        key: 'wizard-idle',
        frames: this.anims.generateFrameNumbers('wizard1', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
    })

    //Add Player
    // player = this.physics.add.sprite(100, config.height/2, 'player1');
    this.physics.add.collider(player,platforms);
    /* player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player1', {start: 9, end: 13}),
        frameRate: 10,
        repeat: -1
    }); */

    

    //Add NPC

    wizard = new Obstacle(this, 'wizard1');
    wizard.spawn();

   


    //Stuff

   

     //var music = this.sound.add('heatsink');
    //music.play();

    //Define Function that moves background

/*     this.moveTiles = function() {
        skyTile.tilePositionX += speed; 
        cloudTile.tilePositionX += speed;
        mountainTile.tilePositionX += speed*1.2;
        pineTile2.tilePositionX += speed*1.3;
        pineTile1.tilePositionX += speed*1.4;
        floorTile.tilePositionX += speed*1.5;

    };

    //Define Function that checks time passed since game starts

    this.checkTime = function() {

        var elapsed = (Date.now() - startTime)/1000;
        return elapsed
    } */

    //Define function that moves the stage up if 10 secs has passed

    this.checkStage = function(speed, time) {

        if (time - lastStage >= stageLength) {
            var newSpeed = speed*speedModifier;
            lastStage += stageLength;
            console.log('yeah');
            return newSpeed;
        } else {
            return speed;
        }     
    }

    cursors = this.input.keyboard.createCursorKeys();

}

function update () {
    
    //console.log(clock.now);

    this.moveTiles();

    if (cursors.up.isDown && player.body.touching.down) {

        player.setVelocityY(-230);
        player.anims.play('jump', true); 
    
    } else if (cursors.down.isDown && player.body.touching.down){

        player.anims.play('slide', true);

    } else {

        if (player.body.touching.down) {

            player.anims.play('right', true);
        }   
    }

    //wizard.sprite.anims.play('wizard-idle', true);
    wizard.sprite.setVelocityX(-50);

    time = this.checkTime();
    //speed = this.checkStage(speed, time);
    
 }


//Sound



