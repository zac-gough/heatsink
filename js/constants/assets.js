import { WIDTH, HEIGHT } from './config.js';
import spriteData from '../objects/spritedata.js';
import { BASESPEED } from './config.js';

//Button

export const BUTTON = 'js/assets/buttons/Free Buttons/red/play.png';
export const GAMEOVER = 'js/assets/final/text/gameover.png'
export const PLAYAGAIN = 'js/assets/final/text/playagain.png'
export const PLAYERSELECT = 'js/assets/final/text/playerselect.png'

//TileSprites

export const SKY = new spriteData('js/assets/background/sky.png', WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, BASESPEED);
export const CLOUD = new spriteData('js/assets/background/new/cloud.png', WIDTH/2, 50, WIDTH, 128, BASESPEED);
export const PLATFORM = new spriteData('js/assets/final/background/station.png', WIDTH/2, HEIGHT/1.6, WIDTH, HEIGHT-1, BASESPEED*1.5);

//Platforms

export const BASEPLATFORM = 'js/assets/environment/platforms/underplatformbig.png';

//Player

export const KAL_RUN = {
    'path': 'js/assets/final/player/kal/kal-run.png',
    'width': 47,
    'height': 80,
    'frames': 6
};

export const ATRO_RUN = {
    'path': 'js/assets/final/player/atro/atro-run.png',
    'width': 47,
    'height': 80,
    'frames': 6
};

export const IMBI_RUN = {
    'path': 'js/assets/final/player/imbi/imbi-run.png',
    'width': 47,
    'height': 80,
    'frames': 6
};

export const KAL_IDLE = {
    'path': 'js/assets/final/player/kal/kal-idle.png',
    'width': 47,
    'height': 80,
    'frames': 3
};

export const ATRO_IDLE = {
    'path': 'js/assets/final/player/atro/atro-idle.png',
    'width': 47,
    'height': 80,
    'frames': 3
};

export const IMBI_IDLE = {
    'path': 'js/assets/final/player/imbi/imbi-idle.png',
    'width': 47,
    'height': 80,
    'frames': 6
}; 

//Obstacles

export const OBSTACLE_1 = {
    'path': 'js/assets/final/obstacles/lad.png',
    'name': 'lad',
    'width': 47,
    'height': 58,
    'frames': 3};

export const OBSTACLE_2 = {
    'path': 'js/assets/final/obstacles/transit.png',
    'name': 'transit',
    'width': 47,
    'height': 68,
    'frames': 6};
    
export const OBSTACLE_3 = {
    'path': 'js/assets/final/obstacles/redbin.png',
    'name': 'redbin'
};
export const OBSTACLE_4 = {
    'path': 'js/assets/final/obstacles/yellowbin.png',
    'name': 'yellowbin'
};

export const OBSTACLE_5 = {
    'path': 'js/assets/final/obstacles/doublebin.png',
    'name': 'doublebin'
};


//Text

export const HEATSINK_LOGO = 'js/assets/final/text/heatsink-chrome.png';
export const ARTIST_LOGO = 'js/assets/final/text/artist-chrome.png';