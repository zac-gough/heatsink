import { WIDTH, HEIGHT } from '../constants/config.js';

class MenuSprite extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        this.texture = texture;
    }

    spawn(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.texture, {start: 0, end:2}),
            frameRate: 7,
            repeat: -1
        })
        this.anims.play('idle');
        this.scene.add.existing(this);
        this.setInteractive();
    };
}

export default MenuSprite;