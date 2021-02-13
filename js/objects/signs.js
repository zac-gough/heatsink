import { WIDTH, HEIGHT } from '../constants/config.js';


class Sign extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);      
         this.texture = texture;
         this.x = x;
         this.y = y;
         this.setDepth(1);

     };

     spawn() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setGravityY(5000);
        this.setVelocityX(this.scene.obstacleVelocity);
   }
}

export default Sign;