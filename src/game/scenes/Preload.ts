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
    this.createPlaceholderTextures()
    this.scene.start('MainGame')
  }

  private createPlaceholderTextures() {
    // Player placeholder — teal rectangle (32x48, MapleStory-ish proportions)
    const playerGfx = this.make.graphics({ x: 0, y: 0 })
    playerGfx.fillStyle(0x00bcd4)
    playerGfx.fillRect(0, 0, 32, 48)
    playerGfx.generateTexture('player', 32, 48)
    playerGfx.destroy()

    // Ground placeholder — grey tile
    const groundGfx = this.make.graphics({ x: 0, y: 0 })
    groundGfx.fillStyle(0x555566)
    groundGfx.fillRect(0, 0, 32, 32)
    groundGfx.generateTexture('ground', 32, 32)
    groundGfx.destroy()
  }
}
