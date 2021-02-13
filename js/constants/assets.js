import { WIDTH, HEIGHT } from './config.js';
import spriteData from '../objects/spritedata.js';
import { BASESPEED } from './config.js';

//Button

export const BUTTON = 'js/assets/buttons/Free Buttons/red/play.png';
export const GAMEOVER = 'js/assets/final/text/gameover.png';
export const PLAYAGAIN = 'js/assets/final/text/playagain.png';
export const PLAYERSELECT = 'js/assets/final/text/playerselect.png';
export const SOUND_ON = 'js/assets/final/buttons/soundon.png';
export const SOUND_OFF = 'js/assets/final/buttons/soundoff.png';

//TileSprites

export const SKY = new spriteData('js/assets/final/background/Sky.png', WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, BASESPEED);
export const CLOUD = new spriteData('js/assets/background/cloud.png', WIDTH/2, 50, WIDTH, 128, BASESPEED);
export const PLATFORM = new spriteData('js/assets/final/background/station.png', WIDTH/2, HEIGHT/1.6, WIDTH, HEIGHT-1, BASESPEED*1.5);
export const CITY_BACKGROUND = new spriteData('js/assets/final/background/City_Background.png', WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, BASESPEED);
export const CITY_FOREGROUND = new spriteData('js/assets/final/background/City_foreground.png', WIDTH/2, HEIGHT/2.3, WIDTH, HEIGHT, BASESPEED);
export const FENCE = new spriteData('js/assets/final/background/Fence.png', WIDTH/2, HEIGHT, WIDTH, HEIGHT, BASESPEED);

//Signs

export const SIGN1 = 'js/assets/final/signs/1.png';
export const SIGN2 = 'js/assets/final/signs/2.png';
export const SIGN3 = 'js/assets/final/signs/3.png';
export const SIGN4 = 'js/assets/final/signs/4.png';
export const SIGN5 = 'js/assets/final/signs/5.png';
export const SIGN6 = 'js/assets/final/signs/6.png';
export const SIGN7 = 'js/assets/final/signs/7.png';
export const SIGN8 = 'js/assets/final/signs/8.png';
export const SIGN9 = 'js/assets/final/signs/9.png';
export const SIGN10 = 'js/assets/final/signs/10.png';
export const SIGN11 = 'js/assets/final/signs/11.png';
export const SIGN12 = 'js/assets/final/signs/12.png';
export const SIGN13 = 'js/assets/final/signs/13.png';
export const SIGN14 = 'js/assets/final/signs/14.png';
export const SIGN15 = 'js/assets/final/signs/15.png';
export const SIGN16 = 'js/assets/final/signs/16.png';
export const SIGN17 = 'js/assets/final/signs/17.png';
export const SIGN18 = 'js/assets/final/signs/18.png';
export const SIGN19 = 'js/assets/final/signs/19.png';
export const SIGN20 = 'js/assets/final/signs/20.png';

//Platforms

export const BASEPLATFORM = 'js/assets/background/underplatformbig.png';

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
    'path': 'js/assets/final/obstacles/OldLady.png',
    'name': 'oldlady',
    'width': 68,
    'height': 68,
    'frames': 3};


//Text

export const HEATSINK_LOGO = 'js/assets/final/text/heatsink-chrome.png';
export const ARTIST_LOGO = 'js/assets/final/text/artist-chrome.png';