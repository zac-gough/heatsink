import { WIDTH, HEIGHT} from '../constants/config.js';


class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
         
        this.texture = texture;
        
     };

     initAnims(key, start, end, frameRate, repeat) {
        this.scene.anims.create({
            key: key,
            frames: this.scene.anims.generateFrameNumbers(this.texture, {start: start, end: end}),
            frameRate: frameRate,
            repeat: repeat
        })
     };

     spawn() {
        this.anims.play(this.texture, true)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setGravityY(300);
        this.setCollideWorldBounds(false);
        this.setVelocityX(this.scene.obstacleVelocity);
     }
}

export default Obstacle;