import { WIDTH, HEIGHT } from './config.js';
import spriteData from '../objects/spritedata.js';
import { BASESPEED } from './config.js';

//Button

export const BUTTON = 'js/assets/buttons/Free Buttons/red/play.png';

//TileSprites

export const SKY = new spriteData('js/assets/background/sky.png', WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, BASESPEED);
export const CLOUD = new spriteData('js/assets/background/new/cloud.png', WIDTH/2, HEIGHT-80, WIDTH, HEIGHT, BASESPEED);
export const MOUNTAIN = new spriteData('js/assets/background/new/mountain2.png', WIDTH/2, HEIGHT-30, WIDTH, HEIGHT - 50, BASESPEED*1.2);
export const PINE1 = new spriteData('js/assets/background/new/pine1.png', WIDTH/2, HEIGHT-50, WIDTH, 80, BASESPEED*1.3);
export const PINE2 = new spriteData('js/assets/background/new/pine2.png', WIDTH/2, HEIGHT-60, WIDTH, 70, BASESPEED*1.4);
export const PLATFORM = new spriteData('js/assets/environment/platforms/platformbig.png', WIDTH/2, HEIGHT, WIDTH, 70, BASESPEED*1.5);

//Platforms

export const BASEPLATFORM = 'js/assets/environment/platforms/underplatformbig.png';

//Player

export const PLAYER_IMAGE = 'js/assets/player/adventurer1/adventurer1.png';

//Obstacles

export const OBSTACLE_1 = {
    'path': 'js/assets/obstacles/Enemies/AngryPig/Run.png',
    'name': 'obstacle1',
    'width': 36,
    'height': 30,
    'frames': 11};

export const OBSTACLE_2 = {
    'path': 'js/assets/obstacles/Enemies/Radish/Run.png',
    'name': 'obstacle2',
    'width': 30,
    'height': 38,
    'frames': 11};
export const OBSTACLE_3 = {
    'path': 'js/assets/obstacles/Enemies/Chicken/Run.png',
    'name': 'obstacle3',
    'width': 32,
    'height': 34,
    'frames': 13};
export const OBSTACLE_4 = {
    'path': 'js/assets/obstacles/Enemies/Mushroom/Run.png',
    'name': 'obstacle4',
    'width': 32,
    'height': 32,
    'frames': 15};