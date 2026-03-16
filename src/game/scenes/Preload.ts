import Phaser from 'phaser'

export class Preload extends Phaser.Scene {
  constructor() {
    super('Preload')
  }

  preload() {
    // Assets will be loaded here as they are created
    // e.g. this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 64 })
    // e.g. this.load.tilemapTiledJSON('zone1', 'assets/tilemaps/zone1.tmj')
    // e.g. this.load.audio('bgm', 'assets/audio/bgm.mp3')
  }

  create() {
    this.scene.start('MainGame')
  }
}
