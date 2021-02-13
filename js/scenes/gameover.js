import { WIDTH, HEIGHT } from '../constants/config.js';
import { SKY, GAMEOVER, PLAYAGAIN } from '../constants/assets.js'
import {getRandomFour, getRandomHundred, resize} from '../utilities/functions.js';


var playAgain = false;

class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    init(data){
        this.score = data.score;
    }
    preload() {

    }

    create(){

        playAgain = false;
        var skyTile = this.add.tileSprite(SKY.xPosition, SKY.yPosition, SKY.width, SKY.height, 'sky');
/*         floorTile = this.add.tileSprite(PLATFORM.xPosition, PLATFORM.yPosition, PLATFORM.width, PLATFORM.height, 'platform');
 */
        // this.scoreText = this.add.text(10, 10, '', {font: '28px Courier', fill: '#FF1493'});
        // this.scoreText.setText(['Score: ' + this.data.get('Score')])
        this.add.image(WIDTH/2, 100, 'gameover');
        this.playagain = this.add.image(WIDTH/2, HEIGHT-80, 'playagain').setInteractive();

    };


    update(){
        
        this.playagain.on('pointerdown', function (pointer) {
            playAgain = true;
            console.log('clicked play again')
        })

        if (playAgain == true) {
            this.scene.get('gameScene').registry.destroy();
            this.scene.get('menuScene').registry.destroy();
            this.scene.restart('gameScene');
            this.scene.restart('menuScene');
            this.registry.destroy();

            this.scene.start('Preloader');
        }
        
    }

        
}

export default GameOver;