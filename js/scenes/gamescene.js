import { BASESPEED, SPAWNCOOLDOWN, SPEEDMODIFIER, STAGELENGTH, WIDTH, HEIGHT } from '../constants/config.js';
import Player from '../objects/player.js';
import Obstacle from '../objects/obstacles.js';
import { SKY, CLOUD, PLATFORM, BASEPLATFORM, OBSTACLE_1, OBSTACLE_2, OBSTACLE_3, OBSTACLE_4, OBSTACLE_5, BUTTON} from '../constants/assets.js';
import {getRandomFour, getRandomHundred} from '../utilities/functions.js';

//Global Vars

var platforms;
var skyTile;
var cloudTile;
var floorTile;
var cursors;
var obstacleInstance;
//Main loop var
var active = false;
var tiles = [];
var spawned = false;
var collisionTime = 0;

class GameScene extends Phaser.Scene {
    constructor() {
        super('gameScene');     
            
            
            
    };

    init(data) {
        this.dataPush = data;
        this.playerSelect = data.playerSelect;
        this.collided = false;
        this.player = 0;
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
        this.nextCheck = 0;
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

    //Gives each tilesprite a speed property
    createSpeedProperty() {
        var base_modifier = 1;
        for (var i of tiles) {
            i.scrollSpeed = this.speed * base_modifier;
            base_modifier += 3;
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
        this.nextCheck = Math.floor(this.elapsed) + 1;
        this.elapsed = (Date.now() - this.startTime)/1000;
        this.spawnTimer = (Date.now() - this.timeOfLastSpawn)/1000;

    };
    
    //If designated time has passed, progresses the level and increases speed/updates cooldownsetc
    updateStage() {

        if (this.elapsed - this.lastStage >= this.stageLength) {
            this.speed = this.speed * this.speedModifier;
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
    spawnObstacle(name, frames, isAnimated) {
        obstacleInstance = new Obstacle(this, WIDTH-20, HEIGHT/1.4, name, isAnimated);
        if (isAnimated == true) {
            obstacleInstance.initAnims(0, frames, 20, -1);
        }
        
        obstacleInstance.spawn();
        //Temporary fix for oversized transit
        if (name != 'obstacle1') {
            obstacleInstance.setScale(.9);
        }
        this.physics.add.collider(obstacleInstance, platforms);
        this.nextCheck = this.elapsed + 1;
    };

    //Updates the time that an obstacle was last spawned
    setTimeofSpawn(){
        this.timeOfLastSpawn = Date.now();
        console.log('done')
    };

    //Spawn player at start
    spawnPlayer() {
        this.player = null;
        this.player = new Player(this, 50, HEIGHT/2, this.playerSelect);
        this.add.existing(this.player);
        this.physics.add.existing(this.player);
        this.physics.add.collider(this.player, platforms);
        this.player.body.setGravityY(500);
        this.player.body.setVelocityX(0);
        this.player.setCollideWorldBounds(true);
        this.player.initAnims();
        console.log(this.player.texture)
        this.player.setActive(true);
        this.player.anims.play('run', true);
    }

    //Updates 'playing' property to false
    endGame() {
        active = false;
    };

    preload() {
    

    };

    create() {

        console.log('Game Scene started!');
        //Add Base Platform 
        platforms = this.physics.add.staticGroup();
        platforms.create(WIDTH/2, HEIGHT, 'baseplatform').refreshBody();

        //Add Backgrounds
        skyTile = this.add.tileSprite(SKY.xPosition, SKY.yPosition, SKY.width, SKY.height, 'sky');
        cloudTile = this.add.tileSprite(CLOUD.xPosition, CLOUD.yPosition, CLOUD.width, CLOUD.height, 'cloud');
        floorTile = this.add.tileSprite(PLATFORM.xPosition, PLATFORM.yPosition, PLATFORM.width, PLATFORM.height, 'platform');
        tiles.push(skyTile, cloudTile, floorTile);
        
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
        console.log(this.player.texture.key);
        console.log(this.playerSelect);
        

    };

    update() {

        if (this.collided == false) {
            this.moveTiles();
            this.checkTime();
            //Check for Spawn and if true spawn random obstacle

            var spawnCheck = this.spawnCheck();
            if (spawnCheck == true){
                var chanceToSpawn = this.getChance();
                var randomInt = getRandomHundred();
                console.log(randomInt);

                if (chanceToSpawn >= randomInt) {

                    var randomObstacleID = getRandomFour();
                    this.setTimeofSpawn();

                    if (randomObstacleID == 1) {
                        this.spawnObstacle('obstacle1', 2, true);
                    } else if (randomObstacleID == 2){
                        this.spawnObstacle('obstacle2', 5, true);
                    } else if (randomObstacleID == 3) {
                        this.spawnObstacle('obstacle3', 0, false);
                    } else {
                        this.spawnObstacle('obstacle4', 0, false);
                        }
                    };
                }
            

            //Player Movement            
            if (cursors.up.isDown && this.player.body.touching.down) {

                this.player.setVelocityY(-300);
            }
            
            this.updateStage();
            this.updateSpeeds();
            this.updateText();
            this.physics.add.collider(this.player, obstacleInstance, () => {

                this.physics.pause();
                this.collidedInstance = obstacleInstance;
                this.collided = true;
                this.speed = 0;
                this.obstacleVelocity = 0;
                this.player.anims.pause();
                collisionTime = Date.now();
            });

        } else if (this.collided == true)   {
            
            this.player.anims.pause();
            this.player.setTint(0xff0000);
            this.collidedInstance.setTint(0xff0000);
            this.tweens.add({
                targets: [this.player, this.collidedInstance],
                alpha: 0,
                duration: 3000,
                repeat: -1,
                yoyo: true
              })

            if ((Date.now() - collisionTime)/1000 > 3) {
                this.scene.start('gameOver');
        }
      }
    }
}
            
            
/*             this.initScore();
 */        
        


export default GameScene;