import { NUMBEROFOBSTACLES } from '../constants/config.js';



function getRandomFour() {
    return Math.floor(Math.random() * (NUMBEROFOBSTACLES) + 1);
}

function getRandomHundred() {
    return Math.floor(Math.random() * (100) + 1);
}

function resize() {
  /*   var canvas = game.canvas, width = document.getElementsByClassName("parent-container")[0].offsetWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + 'px';
        canvas.style.height = (width / ratio) + 'px';
    } else {
        canvas.style.width = (height * ratio) + 'px';
        canvas.style.height = height + 'px'; */
    }

export {getRandomFour, getRandomHundred, resize};