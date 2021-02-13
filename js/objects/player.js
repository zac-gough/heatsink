import { WIDTH, HEIGHT} from '../constants/config.js';
import { GAME_SCENE } from '../constants/scenes.js';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);              
            this.texture = texture;
            this.setDepth(2);
    };

    initAnims(frameRate) {

        this.scene.anims.create({
            key: this.texture,
            frames: this.scene.anims.generateFrameNumbers(this.texture, {start: 0, end: 5}),
            frameRate: frameRate,
            repeat: -1
        });   
    };
}

export default Player;