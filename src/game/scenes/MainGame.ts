import Phaser from 'phaser'

// Total width of the game world across all zones
const WORLD_WIDTH = 9000
const WORLD_HEIGHT = 720

export class MainGame extends Phaser.Scene {
  constructor() {
    super('MainGame')
  }

  create() {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)

    // Camera will follow the player once the Player entity is added.
    // this.cameras.main.startFollow(player, true, 0.1, 0.1)
  }

  update() {
    // Per-frame game logic goes here
  }
}
