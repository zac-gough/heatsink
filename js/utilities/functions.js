import { NUMBEROFOBSTACLES } from '../constants/config.js';

function getRandomFour() {
    return Math.floor(Math.random() * (NUMBEROFOBSTACLES) + 1);
}

function getRandomHundred() {
    return Math.floor(Math.random() * (100) + 1);
}

export {getRandomFour, getRandomHundred};