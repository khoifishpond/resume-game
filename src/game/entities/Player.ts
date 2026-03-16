import Phaser from 'phaser'

export const PLAYER_SPEED = 220
export const JUMP_VELOCITY = -560

type PlayerState = 'idle' | 'run' | 'jump'

export class Player extends Phaser.Physics.Arcade.Sprite {
  private keys: {
    left: Phaser.Input.Keyboard.Key
    right: Phaser.Input.Keyboard.Key
    jump: Phaser.Input.Keyboard.Key
  }
  private playerState: PlayerState = 'idle'

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player')
    scene.add.existing(this as unknown as Phaser.GameObjects.GameObject)
    scene.physics.add.existing(this as unknown as Phaser.GameObjects.GameObject)

    this.setCollideWorldBounds(true)

    const kb = scene.input.keyboard!
    this.keys = {
      left: kb.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: kb.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      jump: kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    }
  }

  update() {
    this.handleMovement()
  }

  private handleMovement() {
    const { left, right, jump } = this.keys
    const body = this.body as Phaser.Physics.Arcade.Body
    const onGround = body.blocked.down

    // Horizontal movement
    if (left.isDown) {
      this.setVelocityX(-PLAYER_SPEED)
      this.setFlipX(true)
    } else if (right.isDown) {
      this.setVelocityX(PLAYER_SPEED)
      this.setFlipX(false)
    } else {
      this.setVelocityX(0)
    }

    // Jump — only when grounded to prevent double-jump
    if (Phaser.Input.Keyboard.JustDown(jump) && onGround) {
      this.setVelocityY(JUMP_VELOCITY)
    }

    // Update state for animation system
    if (!onGround) {
      this.setPlayerState('jump')
    } else if (left.isDown || right.isDown) {
      this.setPlayerState('run')
    } else {
      this.setPlayerState('idle')
    }
  }

  private setPlayerState(next: PlayerState) {
    if (this.playerState === next) return
    this.playerState = next
    this.playAnimation(next)
  }

  private playAnimation(state: PlayerState) {
    // Animations will be wired here once sprite sheets are loaded.
    // e.g. this.play(`player-${state}`, true)
    void state
  }

  get isGrounded(): boolean {
    const body = this.body as Phaser.Physics.Arcade.Body
    return body.blocked.down
  }
}
