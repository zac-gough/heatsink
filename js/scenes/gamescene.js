import { BASESPEED, SPAWNCOOLDOWN, SPEEDMODIFIER, STAGELENGTH, WIDTH, HEIGHT } from '../constants/config.js';
import Player from '../objects/player.js';
import Obstacle from '../objects/obstacles.js';
import { SKY, CLOUD, MOUNTAIN, PINE1, PINE2, PLATFORM, BASEPLATFORM, PLAYER_IMAGE, OBSTACLE_1, OBSTACLE_2, OBSTACLE_3, OBSTACLE_4, BUTTON} from '../constants/assets.js';
import {getRandomFour, getRandomHundred} from '../utilities/functions.js';

//Global Vars

var platforms;
var skyTile;
var cloudTile;
var mountainTile;
var pineTile1;
var pineTile2;
var floorTile;
var cursors;
var obstacleInstance;
//Main loop var
var active = false;
//Var to only allow one click of play button

var tiles = [];

class GameScene extends Phaser.Scene {
    constructor(key) {
        super({ key });
            this.key = key;
            this.player = null;
            this.speed = BASESPEED;
            this.speedModifier = SPEEDMODIFIER;
            this.stageLength = STAGELENGTH;
            this.lastStage = 0;
            this.obstacleVelocity = -200;
            this.spawnCooldown = SPAWNCOOLDOWN;
            this.spawnTimer = 0;
            this.elapsed = 0;
            this.timeOfLastSpawn = 0;
            this.button = null;
            this.obstacleGroup = null;
    };
   
    //Updates 'playing' property to false
    endGame() {
        active = false;
    };
    //Gives each tilesprite a speed property
    createSpeedProperty() {
        var base_modifier = 1;
        for (var i of tiles) {
            i.scrollSpeed = this.speed * base_modifier;
            base_modifier += 3;
        }
    };
    //Updates the speed values for each tile when the level progresses
    updateSpeeds() {
        var base_modifier = 1;
        for (var i of tiles) {
            i.scrollSpeed = this.speed * base_modifier;
            base_modifier +=3;
        }
    };
    //Fixes all tilesprites to camera
    fixToCamera() {
        for (var i of tiles) {
            i.fixedToCamera = true;
            i.setActive(true);
        }
    };
    //Scrolls the tilesprites
    moveTiles() {
        for (var i of tiles) {
            i.tilePositionX += i.scrollSpeed;
        }
    };

    //Set Score and Level to Base
    initScore() {
        this.data.set('Score', 0);
        this.data.set('Level', 1);
    };

    //Updates the timer values
    checkTime() {

        this.elapsed = (Date.now() - this.startTime)/1000;
        this.spawnTimer = (Date.now() - this.timeOfLastSpawn)/1000;

    };
    
    //If designated time has passed, progresses the level and increases speed/updates cooldownsetc
    updateStage() {

        if (this.elapsed - this.lastStage >= this.stageLength) {
            this.speed = this.speed * this.speedModifier;
            this.obstacleGroup.setVelocityX(this.obstacleVelocity * this.speedModifier);
            this.lastStage += this.stageLength;
            this.data.set('Level', this.data.get('Level') + 1);
            if (this.data.get('Level') % 3 == 0){
                if (this.spawnCooldown >= 2) {
                    this.spawnCooldown -= 0.5;
                    }
                }
            } else {
        };
    };

    //Updates the score and level text
    updateText() {
        this.data.set('Score', Math.round(this.elapsed*100));
        this.scoreText.setText([
            'Score: ' + this.data.get('Score'),
            'Level: ' + this.data.get('Level')
        ]);
    };

    //Calculates the probability of an obstacle spawning
    getChance() {
        var percents = 100/this.spawnCooldown;
        var chance = Math.floor(percents*Math.floor(this.spawnTimer))
        return chance
    };

    //Spawns an obstacle, takes key and frame value as args
    spawnObstacle(name, frames) {
        obstacleInstance = new Obstacle(this, WIDTH, HEIGHT-40, name);
        obstacleInstance.initAnims(name, 0, frames, 20, -1);
        obstacleInstance.spawn();
        this.physics.add.collider(obstacleInstance, platforms);
        //this.obstacleGroup.add(obstacleInstance);
    };

    //Updates the time that an obstacle was last spawned
    setTimeofSpawn(){
        this.timeOfLastSpawn = Date.now();
        console.log('done')
    };

    preload() {
    
        //Button
        this.load.image('button', BUTTON);
        //Background
        this.load.image('sky', SKY.image);
        this.load.image('cloud', CLOUD.image);
        this.load.image('mountain', MOUNTAIN.image);
        this.load.image('pine1', PINE1.image);
        this.load.image('pine2', PINE2.image);
        this.load.image('platform', PLATFORM.image);

        //Platforms
        this.load.image('baseplatform', BASEPLATFORM);

        //Player
        this.load.spritesheet('player', PLAYER_IMAGE, { frameWidth: 50, frameHeight: 37});

        //Obstacles
        this.load.spritesheet('obstacle1', OBSTACLE_1.path, {frameWidth: OBSTACLE_1.width, frameHeight: OBSTACLE_1.height});
        this.load.spritesheet('obstacle2', OBSTACLE_2.path, {frameWidth: OBSTACLE_2.width, frameHeight: OBSTACLE_2.width});
        this.load.spritesheet('obstacle3', OBSTACLE_3.path, {frameWidth: OBSTACLE_3.width, frameHeight: OBSTACLE_3.width});
        this.load.spritesheet('obstacle4', OBSTACLE_4.path, {frameWidth: OBSTACLE_4.width, frameHeight: OBSTACLE_4.width});
    };

    create() {

        //Add Base Platform 
        platforms = this.physics.add.staticGroup();
        platforms.create(WIDTH/2, HEIGHT, 'baseplatform').refreshBody();

        //Add Backgrounds
        skyTile = this.add.tileSprite(SKY.xPosition, SKY.yPosition, SKY.width, SKY.height, 'sky');
        cloudTile = this.add.tileSprite(CLOUD.xPosition, CLOUD.yPosition, CLOUD.width, CLOUD.height, 'cloud');
        mountainTile = this.add.tileSprite(MOUNTAIN.xPosition, MOUNTAIN.yPosition, MOUNTAIN.width, MOUNTAIN.height, 'mountain');
        pineTile1 = this.add.tileSprite(PINE1.xPosition, PINE1.yPosition, PINE1.width, PINE1.height, 'pine1');
        pineTile2 = this.add.tileSprite(PINE2.xPosition, PINE2.yPosition, PINE2.width, PINE2.height, 'pine2');
        floorTile = this.add.tileSprite(PLATFORM.xPosition, PLATFORM.yPosition, PLATFORM.width, PLATFORM.height, 'platform');
        tiles.push(skyTile, cloudTile, mountainTile, pineTile1, pineTile2, floorTile);
        
        this.createSpeedProperty();
        this.fixToCamera();

        console.log(this.stageLength)

        //Create Score

        this.initScore();

        this.scoreText = this.add.text(10, 10, '', {font: '28px Courier', fill: '#00ff00'});

        //Spawn Player

        this.player = new Player(this, 50, HEIGHT/2, 'player');
        this.physics.add.collider(this.player, platforms);
        this.player.initAnims();
        this.player.setActive(true);

        cursors = this.input.keyboard.createCursorKeys();

        //Add Group for Obstacles

        this.obstacleGroup = new Phaser.Physics.Arcade.Group(this.physics.world, this);

        //Add The Start Button
        this.button = this.add.image(WIDTH/2, HEIGHT/2, 'button');
        this.button.setInteractive();
    };

    update() {
        //Waits for Player to Start game
        if (active == false) {

            this.moveTiles();
            this.button.once('pointerdown', () => {
                this.startTime = Date.now();
                this.timeOfLastSpawn = Date.now();
                this.button.visible = false;
                active = true;
            });

        } else if (active == true) {
            
            this.moveTiles();
            this.checkTime();
            //Check for Spawn and if true spawn random obstacle

            var chanceToSpawn = this.getChance();
            var randomInt = getRandomHundred();

            if (chanceToSpawn >= randomInt) {

                var randomObstacleID = getRandomFour();
                this.setTimeofSpawn();

                if (randomObstacleID == 1) {
                    this.spawnObstacle(OBSTACLE_1.name, OBSTACLE_1.frames);
                } else if (randomObstacleID == 2){
                    this.spawnObstacle(OBSTACLE_2.name, OBSTACLE_2.frames);
                } else if (randomObstacleID == 3) {
                    this.spawnObstacle(OBSTACLE_3.name, OBSTACLE_3.frames);
                } else {
                    this.spawnObstacle(OBSTACLE_4.name, OBSTACLE_4.frames);
                    }
                };

            //Player Movement
            if (cursors.up.isDown && this.player.body.touching.down) {

                this.player.setVelocityY(-230);
                this.player.anims.play('jump', true); 
            
            } else if (cursors.down.isDown && this.player.body.touching.down){

                this.player.anims.play('slide', true);
        
            } else {
        
                if (this.player.body.touching.down) {
        
                    this.player.anims.play('run', true);
                }   
            };
            
            this.updateStage();
            this.updateSpeeds();
            this.updateText();
            this.physics.add.collider(this.player, obstacleInstance, () => {
                this.initScore();
                this.button.visible = true;
                this.obstacleGroup.destroy();
                active = false;
            });
        }
    };
}

export default GameScene;