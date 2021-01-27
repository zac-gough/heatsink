import { WIDTH, HEIGHT } from './js/constants/config.js';
import GameScene from './js/scenes/gamescene.js';

var gameScene = new GameScene('level');

const config = {
    width: WIDTH,
    height: HEIGHT,
    physics: { 
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    },
    type: Phaser.AUTO,
    scene: gameScene,
    audio: {
        disableWebAudio: true
    }
};


const game = new Phaser.Game(config);