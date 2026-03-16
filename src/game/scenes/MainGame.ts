import Phaser from 'phaser'
import { Player } from '../entities/Player'

const WORLD_WIDTH = 9000
const WORLD_HEIGHT = 720
const GROUND_Y = 688

export class MainGame extends Phaser.Scene {
  private player!: Player
  private ground!: Phaser.Physics.Arcade.StaticGroup

  constructor() {
    super('MainGame')
  }

  create() {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)

    this.createGround()
    this.createDistanceMarkers()
    this.player = new Player(this, 100, GROUND_Y - 48)
    this.physics.add.collider(
      this.player as unknown as Phaser.Physics.Arcade.Sprite,
      this.ground
    )
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
  }

  update() {
    this.player.update()
  }

  private createGround() {
    this.ground = this.physics.add.staticGroup()
    for (let x = 0; x < WORLD_WIDTH; x += 32) {
      this.ground.create(x + 16, GROUND_Y, 'ground')
    }
  }

  private createDistanceMarkers() {
    const gfx = this.add.graphics()

    for (let x = 200; x < WORLD_WIDTH; x += 200) {
      const isMajor = x % 1000 === 0

      // Tick mark above the ground
      gfx.fillStyle(isMajor ? 0xffffff : 0x888899, isMajor ? 1 : 0.6)
      gfx.fillRect(x - 1, GROUND_Y - 48, 2, isMajor ? 40 : 20)

      // Label every 1000px
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
