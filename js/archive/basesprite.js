import { WIDTH, HEIGHT} from '../constants/config.js';

class baseSprite extends Phaser.Physics.Arcade.Sprite{

    spawn() {
        this.sprite = this.scene.physics.add.sprite(this.xPosition, this.yPosition, this.sprite_assets);
        this.sprite.setBounce(this.bounce);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setGravityY(this.yGravity);
    };
}

export default baseSprite;