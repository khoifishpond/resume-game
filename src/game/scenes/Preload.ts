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

    // Parallax layer placeholders — wide strips that tile horizontally
    // Far layer: deep indigo shapes (distant mountains / skyline)
    const farGfx = this.make.graphics({ x: 0, y: 0 })
    farGfx.fillStyle(0x1a1a3e)
    farGfx.fillRect(0, 0, 1280, 300)
    farGfx.fillStyle(0x2a2a5e)
    for (let x = 0; x < 1280; x += 160) {
      const h = 80 + ((x * 37) % 120)
      farGfx.fillRect(x + 10, 300 - h, 120, h)
    }
    farGfx.generateTexture('bg-far', 1280, 300)
    farGfx.destroy()

    // Mid layer: darker silhouettes (mid-distance buildings / hills)
    const midGfx = this.make.graphics({ x: 0, y: 0 })
    midGfx.fillStyle(0x14142e, 0)
    midGfx.fillRect(0, 0, 1280, 200)
    midGfx.fillStyle(0x252545)
    for (let x = 0; x < 1280; x += 100) {
      const h = 50 + ((x * 53) % 100)
      midGfx.fillRect(x + 5, 200 - h, 80, h)
    }
    midGfx.generateTexture('bg-mid', 1280, 200)
    midGfx.destroy()

    // Near layer: foreground silhouettes (close structures / props)
    const nearGfx = this.make.graphics({ x: 0, y: 0 })
    nearGfx.fillStyle(0x1e1e38)
    for (let x = 0; x < 1280; x += 200) {
      nearGfx.fillRect(x, 80, 30, 120)
      nearGfx.fillRect(x + 80, 100, 20, 100)
    }
    nearGfx.generateTexture('bg-near', 1280, 200)
    nearGfx.destroy()
  }
}
