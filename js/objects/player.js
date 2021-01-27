import { WIDTH, HEIGHT} from '../constants/config.js';
import { PLAYER_IMAGE } from '../constants/assets.js';
import { GAME_SCENE } from '../constants/scenes.js'

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
                    
        this.texture = texture;
        this.setState('alive');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setGravityY(300);
        this.body.setVelocityX(0);

        this.setCollideWorldBounds(true);
    }

    initAnims() {
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers(this.texture, {start: 9, end: 13}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers(this.texture, {start: 17, end: 23}),
            frameRate: 10
        });  

        this.scene.anims.create({
            key: 'slide',
            frames: this.scene.anims.generateFrameNumbers(this.texture, {start: 25, end: 28}),
            frameRate: 2,
            repeat: -1
        });        
    };
}

export default Player;