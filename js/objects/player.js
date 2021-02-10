import { WIDTH, HEIGHT} from '../constants/config.js';
import { GAME_SCENE } from '../constants/scenes.js';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);              
            this.texture = texture;
    };

    initAnims() {

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers(this.texture, {start: 0, end: 5}),
            frameRate: 15,
            repeat: -1
        });   
    };
}

export default Player;