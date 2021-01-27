class newTileSprite extends Phaser.GameObjects.TileSprite{
    constructor(scene, x, y, width, height, textureKey, speed){
        super(scene, x, y, width, height, textureKey);
        this.speed = speed;
    }
}

export default newTileSprite;