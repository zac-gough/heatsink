import { WIDTH, HEIGHT } from '../constants/config.js';
import menuSprite from '../objects/menuSprite.js';
import GameScene from '/js/scenes/gamescene.js';
import { SKY, CLOUD, PLATFORM } from '../constants/assets.js'
import {getRandomFour, getRandomHundred, resize} from '../utilities/functions.js';



var playerSelect = null; 

class MenuScene extends Phaser.Scene {
    constructor() {
        super('menuScene');
            
    }

    init(){
    }

    preload() {

    }

    create(){
        
       
        playerSelect = null;
        var skyTile = this.add.tileSprite(SKY.xPosition, SKY.yPosition, SKY.width, SKY.height, 'sky');

        this.atro = new menuSprite(this, WIDTH/3, HEIGHT/1.8, 'atro_idle');
        this.atro.setScale(1.5);
        this.atro.spawn();

        this.kal = new menuSprite(this, WIDTH/2, HEIGHT/1.8, 'kal_idle');
        this.kal.setScale(1.5);
        this.kal.spawn();

        this.imbi = new menuSprite(this, WIDTH/1.5, HEIGHT/1.8, 'imbi_idle');
        this.imbi.setScale(1.5);
        this.imbi.spawn();

        this.add.image(WIDTH/2, 50, 'heatsink_logo');
        this.add.image(WIDTH/2, HEIGHT-30, 'artist_logo');
        //this.add.image(WIDTH/2, 50, 'player_select');
        


    };


    update(){
        
        this.atro.on('pointerdown', function (pointer) {
            playerSelect = 'atro_run';
        });
      
        this.kal.on('pointerdown', function (pointer) {
            playerSelect = 'kal_run';        
        });

        this.imbi.on('pointerdown', function (pointer) {
            playerSelect = 'imbi_run';
        });

    

        if (playerSelect != null){
             this.scene.start('gameScene', { playerSelect: playerSelect} );
         }
        
    }

        
}

export default MenuScene;