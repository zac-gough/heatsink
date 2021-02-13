import { BASESPEED, SPAWNCOOLDOWN, SPEEDMODIFIER, STAGELENGTH, WIDTH, HEIGHT } from '../constants/config.js';
import Player from '../objects/player.js';
import Obstacle from '../objects/obstacles.js';
import Sign from '../objects/signs.js';
import { CITY_BACKGROUND, CITY_FOREGROUND, FENCE, SKY, CLOUD, PLATFORM, BASEPLATFORM, OBSTACLE_1, OBSTACLE_2, OBSTACLE_3, OBSTACLE_4, OBSTACLE_5, BUTTON} from '../constants/assets.js';
import {getRandomFour, getRandomHundred, resize} from '../utilities/functions.js';

//Global Vars

var platforms;
var skyTile;
var cloudTile;
var cityTile1;
var cityTile2;
var fenceTile;
var floorTile;
var cursors;
//Main loop var
var active = false;
var tiles = [];
var spawned = false;
var collisionTime = 0;
var base_modifier = 1;
var music = null;
var instance;

//Sign Array

let signArray = ['sign1', 'sign2', 'sign3', 'sign4', 'sign5', 'sign6', 'sign7', 'sign8',
'sign9', 'sign10', 'sign11', 'sign12', 'sign13', 'sign14', 'sign15', 'sign16', 'sign17', 'sign18', 'sign19', 'sign20'];

class GameScene extends Phaser.Scene {
    constructor() {
        super('gameScene');     
             
    };

    init(data) {
        this.dataPush = data;
        this.playerSelect = data.playerSelect;
    };

    //Reset Data

    resetData() {
        this.collided = false;
        this.speed = BASESPEED;
        this.speedModifier = SPEEDMODIFIER;
        this.stageLength = STAGELENGTH;
        this.lastStage = 0;
        this.obstacleVelocity = -180;
        this.obstacleCount = 0;
        this.spawnCooldown = SPAWNCOOLDOWN;
        this.spawnTimer = 0;
        this.elapsed = 0;
        this.timeOfLastSpawn = 0;
        this.button = null;
        this.obstacleGroup = null;
        this.nextCheck = 0;
        this.startTime = 0;
        this.frameRate = 10;
        this.nextSign = 0;
    };
   
    //Updates the speed values for each tile when the level progresses
    updateSpeeds() {
        for (var i of tiles) {
            i.scrollSpeed = this.speed * base_modifier;
            base_modifier +=3;
            
        }
        base_modifier = 1;
    };
    //Fixes all tilesprites to camera
    fixToCamera() {
        for (var i of tiles) {
            i.fixedToCamera = true;
            i.setActive(true);
        }
    };

    //Gives each tilesprite a speed property
    createSpeedProperty() {
        for (var i of tiles) {
            i.scrollspeed = 0;
            i.scrollSpeed = this.speed * base_modifier;
            base_modifier += 3;
            console.log(base_modifier);
        }
        base_modifier = 1;
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
        this.nextCheck = Math.floor(this.elapsed) + 1;
        this.elapsed = (Date.now() - this.startTime)/1000;
        this.spawnTimer = (Date.now() - this.timeOfLastSpawn)/1000;

    };
    
    //If designated time has passed, progresses the level and increases speed/updates cooldownsetc
    updateStage() {

        if (this.elapsed - this.lastStage >= this.stageLength) {
            this.spawnSign();
            if (this.data.get('Level') <= 10) { 
                this.speed = this.speed * this.speedModifier;
                this.obstacleVelocity = this.obstacleVelocity * 1.15;
                this.frameRate = this.frameRate + 50;

        }
            this.lastStage += this.stageLength;
            this.data.set('Level', this.data.get('Level') + 1);
            if (this.spawnCooldown > 0.5) {
            this.spawnCooldown = this.spawnCooldown - 0.3;
                }
            } else {
        };
    };

    spawnSign() {
        var sign = new Sign(this, WIDTH+100, 180, signArray[this.nextSign]);
        this.physics.add.collider(sign, platforms);
        sign.spawn();
        this.nextSign = this.nextSign + 1;
        console.log(sign);
    };

    //Updates the score and level text
    updateText() {
        this.data.set('Score', Math.round(this.elapsed*100));
        this.scoreText.setText([
            'Score: ' + this.data.get('Score'),
/*             'Level: ' + this.data.get('Level')
 */        ]);
    };

    //Has it been a second? Spawn chance if so
    spawnCheck() {
        var elapsed = Math.floor(this.elapsed);
        if (elapsed == this.nextCheck) {
            return true
        } else {
            return false
        };

    }

    //Calculates the probability of an obstacle spawning
    getChance() {
        var percents = 100/this.spawnCooldown;
        var chance = Math.floor(percents*Math.floor(this.spawnTimer))
        return chance
    };

    //Spawns an obstacle, takes key and frame value as args
    spawnObstacle(name, frames, isAnimated, count) {
        var obstacleInstance = new Obstacle(this, WIDTH-20, HEIGHT/1.25, name, isAnimated, count);
        if (isAnimated == true) {
            obstacleInstance.initAnims(0, frames, 10, -1);
        }
        
        obstacleInstance.spawn();
        //Temporary fix for oversized transit
        if (name != 'obstacle1') {
            obstacleInstance.setScale(.9);
        }
        this.physics.add.collider(obstacleInstance, platforms);
        this.nextCheck = this.elapsed + 1;
        return obstacleInstance
    };

    stopMusic() {
        music = false;
        this.music.stop();
        this.soundButton.destroy();
        this.soundButton = this.add.image(WIDTH-30, 27, 'sound_off').setInteractive();
    };

    playMusic() {
        music = true;
        this.music.play();
        this.soundButton.destroy();
        this.soundButton = this.add.image(WIDTH-35, 25, 'sound_on').setInteractive();
    }

    toggleMusic() {
        if (music == true) {
            this.stopMusic();
        } else if (music == false) {
            this.playMusic();
        }
    }

    //Updates the time that an obstacle was last spawned
    setTimeofSpawn(){
        this.timeOfLastSpawn = Date.now();
    };

    //Spawn player at start
    spawnPlayer() {
        this.player = null;
        this.player = new Player(this, 50, HEIGHT/2, this.playerSelect);
        this.player.initAnims(this.frameRate);
        this.add.existing(this.player);
        this.physics.add.existing(this.player);
        this.physics.add.collider(this.player, platforms);
        this.player.body.setGravityY(1100);
        this.player.body.setVelocityX(0);
        this.player.setCollideWorldBounds(true);
        this.player.setActive(true);
        this.player.anims.play(this.player.texture, true);
     }

    //Updates 'playing' property to false
    endGame() {
        active = false;
    };

    preload() {
    

    };

    create() {

        this.resetData();
        //Play Track

        if (music == null) {
            this.music = this.sound.add('heatsink');
            this.music.play();
            music = true;
        }

        //Add Base Platform 
        platforms = this.physics.add.staticGroup();
        platforms.create(WIDTH/2, HEIGHT, 'baseplatform').refreshBody();

        //Add Backgrounds
        tiles = [];
        skyTile = this.add.tileSprite(SKY.xPosition, SKY.yPosition, SKY.width, SKY.height, 'sky');
        cloudTile = this.add.tileSprite(CLOUD.xPosition, CLOUD.yPosition, CLOUD.width, CLOUD.height, 'cloud');
        cityTile1 = this.add.tileSprite(CITY_BACKGROUND.xPosition, CITY_BACKGROUND.yPosition, CITY_BACKGROUND.width, CITY_BACKGROUND.height, 'city1');
        cityTile2 = this.add.tileSprite(CITY_FOREGROUND.xPosition, CITY_FOREGROUND.yPosition, CITY_FOREGROUND.width, CITY_FOREGROUND.height, 'city2');
        fenceTile = this.add.tileSprite(FENCE.xPosition, FENCE.yPosition, FENCE.width, FENCE.height, 'fence');
        floorTile = this.add.tileSprite(PLATFORM.xPosition, PLATFORM.yPosition, PLATFORM.width, PLATFORM.height, 'platform');
        floorTile.setDepth(2);
        tiles.push(skyTile, cloudTile, cityTile1, cityTile2, fenceTile, floorTile);
        this.soundButton = this.add.image(WIDTH-35, 25, 'sound_on').setInteractive();
        
        this.createSpeedProperty();
        this.fixToCamera();

        //Create Score

        this.initScore();

        this.scoreText = this.add.text(10, 10, '', {font: '28px Courier', fill: '#FF1493'});

        //Spawn Player
        this.spawnPlayer();
        cursors = this.input.keyboard.createCursorKeys();
        this.startTime = Date.now();
        this.timeOfLastSpawn = Date.now();
        console.log(this.speed);
        this.spawnSign();
    };

    update() {

        //Handle Sound

        this.soundButton.on('pointerdown', () => {
            this.toggleMusic();
        }, { once: true });
        

        if (this.collided == false) {

          
            this.moveTiles();
            this.checkTime();
            //Check for Spawn and if true spawn random obstacle

            var spawnCheck = this.spawnCheck();
            if (spawnCheck == true){
                var chanceToSpawn = this.getChance();
                var randomInt = getRandomHundred();

                if (chanceToSpawn >= randomInt) {

                    ;
                    var randomObstacleID = getRandomFour();
                    this.setTimeofSpawn();

                    if (randomObstacleID == 1) {
                        instance = this.spawnObstacle('obstacle1', 2, true, this.obstacleCount);
                    } else if (randomObstacleID == 2){
                        instance = this.spawnObstacle('obstacle2', 5, true, this.obstacleCount);
                    } else if (randomObstacleID == 3) {
                        instance = this.spawnObstacle('obstacle3', 0, false, this.obstacleCount);
                    } else if (randomObstacleID == 4) {
                        instance =this.spawnObstacle('obstacle4', 0, false, this.obstacleCount);
                        } else if (randomObstacleID == 5) {
                        instance = this.spawnObstacle('obstacle5', 2, true, this.obstacleCount);
                        }
                    };

                   
                    
                    this.physics.add.collider(this.player, instance, () => {

                        this.physics.pause();
                       this.collided = true;
                        this.speed = 0;
                        this.obstacleVelocity = 0;
                        collisionTime = Date.now();
                    });

                    if (this.obstacleCount < 10) {
                        this.obstacleCount += 1;
                    } else {
                        this.obstacleCount = 0;
                    };
                }


            //Player Movement - Keys & Mobile            
            if (cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-650);
            }
            this.input.on('pointerdown', () => {
                if (this.player.body.touching.down) {
                    this.player.setVelocityY(-650);
                }
            });
            
            this.updateStage();
            this.updateSpeeds();
            this.updateText();
            

        } else if (this.collided == true)   {
            
            this.player.anims.pause();
            this.player.setTint(0xff0000);
            this.tweens.add({
                targets: [this.player],
                alpha: 0,
                duration: 1000,
                repeat: -1,
                yoyo: true
              })

            if ((Date.now() - collisionTime)/1000 > 1) {
                this.scene.start('gameOver', {score: this.data.get('Score')});
        }
      }
    }
 } 
            
            
/*             this.initScore();
 */        
        


export default GameScene;