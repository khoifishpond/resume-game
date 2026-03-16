import Phaser from 'phaser'
import { Player } from '../entities/Player'
import { PLATFORM_DATA } from '../levels/platforms'

const WORLD_WIDTH = 9000
const WORLD_HEIGHT = 720
const GROUND_Y = 688

export class MainGame extends Phaser.Scene {
  private player!: Player
  private ground!: Phaser.Physics.Arcade.StaticGroup
  private platforms!: Phaser.Physics.Arcade.StaticGroup
  private bgFar!: Phaser.GameObjects.TileSprite
  private bgMid!: Phaser.GameObjects.TileSprite
  private bgNear!: Phaser.GameObjects.TileSprite

  constructor() {
    super('MainGame')
  }

  create() {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)

    this.createParallaxBackground()
    this.createGround()
    this.createPlatforms()
    this.createDistanceMarkers()
    this.player = new Player(this, 100, GROUND_Y - 48)
    const playerSprite = this.player as unknown as Phaser.Physics.Arcade.Sprite
    this.physics.add.collider(playerSprite, this.ground)
    this.physics.add.collider(playerSprite, this.platforms)
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
  }

  update() {
    this.player.update()
    this.scrollParallax()
  }

  private createParallaxBackground() {
    // TileSprites are fixed to the camera and tiled — scrollOffset drives the illusion of depth
    this.bgFar = this.add
      .tileSprite(0, WORLD_HEIGHT - 300 - 32, 1280, 300, 'bg-far')
      .setOrigin(0, 0)
      .setScrollFactor(0)

    this.bgMid = this.add
      .tileSprite(0, WORLD_HEIGHT - 200 - 32, 1280, 200, 'bg-mid')
      .setOrigin(0, 0)
      .setScrollFactor(0)

    this.bgNear = this.add
      .tileSprite(0, WORLD_HEIGHT - 200 - 32, 1280, 200, 'bg-near')
      .setOrigin(0, 0)
      .setScrollFactor(0)
  }

  private scrollParallax() {
    const camX = this.cameras.main.scrollX
    this.bgFar.tilePositionX = camX * 0.1
    this.bgMid.tilePositionX = camX * 0.3
    this.bgNear.tilePositionX = camX * 0.6
  }

  private createGround() {
    this.ground = this.physics.add.staticGroup()
    for (let x = 0; x < WORLD_WIDTH; x += 32) {
      this.ground.create(x + 16, GROUND_Y, 'ground')
    }
  }

  private createPlatforms() {
    this.platforms = this.physics.add.staticGroup()
    for (const [x, y, tiles] of PLATFORM_DATA) {
      for (let i = 0; i < tiles; i++) {
        this.platforms.create(x + i * 32 + 16, y, 'ground')
      }
    }
  }

  private createDistanceMarkers() {
    const gfx = this.add.graphics()

    for (let x = 200; x < WORLD_WIDTH; x += 200) {
      const isMajor = x % 1000 === 0

      gfx.fillStyle(isMajor ? 0xffffff : 0x888899, isMajor ? 1 : 0.6)
      gfx.fillRect(x - 1, GROUND_Y - 48, 2, isMajor ? 40 : 20)

      if (isMajor) {
        this.add
          .text(x, GROUND_Y - 60, `${x}`, {
            fontSize: '11px',
            color: '#aaaacc',
          })
          .setOrigin(0.5, 1)
      }
    }
  }
}
