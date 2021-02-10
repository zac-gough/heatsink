import { WIDTH, HEIGHT } from './js/constants/config.js';
import GameScene from './js/scenes/gamescene.js';
import Preloader from './js/scenes/preloader.js';
import menuScene from './js/scenes/menuscene.js';
import GameOver from './js/scenes/gameover.js';

var preloader = new Preloader;
var menuscene = new menuScene;
var gameScene = new GameScene;
var gameOver = new GameOver;

const config = {
    width: WIDTH,
    height: HEIGHT,
   /*  scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,  */
    physics: { 
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    },
    type: Phaser.AUTO,
    parent: 'game',
    scene: [preloader, menuscene, gameScene, gameOver],
    audio: {
        disableWebAudio: true
    }
};


const game = new Phaser.Game(config);