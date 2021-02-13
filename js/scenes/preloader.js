import { CITY_BACKGROUND, CITY_FOREGROUND, FENCE, PLAYERSELECT, SKY, CLOUD, PLATFORM, BASEPLATFORM, KAL_RUN, ATRO_RUN, IMBI_RUN, KAL_IDLE, ATRO_IDLE, IMBI_IDLE, OBSTACLE_1, OBSTACLE_2, OBSTACLE_3, OBSTACLE_4, OBSTACLE_5, BUTTON, HEATSINK_LOGO, ARTIST_LOGO, GAMEOVER, PLAYAGAIN, SOUND_ON, SOUND_OFF, SIGN1, SIGN2, SIGN3, SIGN4, SIGN5, SIGN6, SIGN7, SIGN8, SIGN9, SIGN10, SIGN11, SIGN12, SIGN13, SIGN14, SIGN15, SIGN16, SIGN17, SIGN18, SIGN19, SIGN20 } from '../constants/assets.js';
import {getRandomFour, getRandomHundred, resize} from '../utilities/functions.js';


class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
            this.playerSelect = null;
    }

    preload() {

    //Audio
    this.load.audio('heatsink', ['./audio/heatsink.mp3', './audio/heatsink.mp3'])

    //Text
    this.load.image('heatsink_logo', HEATSINK_LOGO);
    this.load.image('artist_logo', ARTIST_LOGO);
    this.load.image('player_select', PLAYERSELECT);
    
    //Button
    this.load.image('button', BUTTON);
    this.load.image('gameover', GAMEOVER);
    this.load.image('playagain', PLAYAGAIN);
    this.load.image('sound_on', SOUND_ON);
    this.load.image('sound_off', SOUND_OFF);

    //Background
    this.load.image('sky', SKY.image);
    this.load.image('cloud', CLOUD.image);
    this.load.image('city1', CITY_BACKGROUND.image);
    this.load.image('city2', CITY_FOREGROUND.image);
    this.load.image('fence', FENCE.image);
    this.load.image('platform', PLATFORM.image);

    //Signs
    this.load.image('sign1', SIGN1);
    this.load.image('sign2', SIGN2);
    this.load.image('sign3', SIGN3);
    this.load.image('sign4', SIGN4);
    this.load.image('sign5', SIGN5);
    this.load.image('sign6', SIGN6);
    this.load.image('sign7', SIGN7);
    this.load.image('sign8', SIGN8);
    this.load.image('sign9', SIGN9);
    this.load.image('sign10', SIGN10);
    this.load.image('sign11', SIGN11);
    this.load.image('sign12', SIGN12);
    this.load.image('sign13', SIGN13);
    this.load.image('sign14', SIGN14);
    this.load.image('sign15', SIGN15);
    this.load.image('sign16', SIGN16);
    this.load.image('sign17', SIGN17);
    this.load.image('sign18', SIGN18);
    this.load.image('sign19', SIGN19);
    this.load.image('sign20', SIGN20);

    //Platforms
    this.load.image('baseplatform', BASEPLATFORM);

    //Player
    this.load.spritesheet('kal_run', KAL_RUN.path, { frameWidth: 47, frameHeight: 68});
    this.load.spritesheet('atro_run', ATRO_RUN.path, { frameWidth: 47, frameHeight: 68});
    this.load.spritesheet('imbi_run', IMBI_RUN.path, { frameWidth: 47, frameHeight: 68});
    this.load.spritesheet('kal_idle', KAL_IDLE.path, { frameWidth: 47, frameHeight: 68});
    this.load.spritesheet('atro_idle', ATRO_IDLE.path, { frameWidth: 47, frameHeight: 68});
    this.load.spritesheet('imbi_idle', IMBI_IDLE.path, { frameWidth: 47, frameHeight: 68});
    

    //Obstacles
    this.load.spritesheet('obstacle1', OBSTACLE_1.path, {frameWidth: 47, frameHeight: 58});
    this.load.spritesheet('obstacle2', OBSTACLE_2.path, {frameWidth: 47, frameHeight: 68});
    this.load.image('obstacle3', OBSTACLE_3.path);
    this.load.image('obstacle4', OBSTACLE_4.path);
    this.load.spritesheet('obstacle5', OBSTACLE_5.path, {frameWidth: 68, frameHeight: 68});

    }

    create(){
        
        /* function resizeApp(){
            let game_ratio = 800/300;
            let div = document.getElementById('game');
            div.style.width = (window.innerHeight * game_ratio) + 'px';
            div.style.height = window.innerHeight + 'px';
            let canvas = document.getElementsByTagName('canvas')[0];
            let dpi_w = parseInt(div.style.width) / canvas.width;
            let dpi_h = parseInt(div.style.height) / canvas.height;		
            
            let height = window.innerHeight * (dpi_w / dpi_h);
            let width = height * game_ratio;

            // Scale canvas	
            canvas.style.width	= width + 'px';
            canvas.style.height	= height + 'px'

        };

        resizeApp(); */
        this.scene.start('menuScene');
    } 

    update(){
        
    }

        
}

export default Preloader;


