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

  // Called once from Preload after sprite sheet is loaded.
  // Registers idle, run, and jump animation keys against the player texture.
  static registerAnimations(anims: Phaser.Animations.AnimationManager) {
    if (anims.exists('player-idle')) return

    anims.create({
      key: 'player-idle',
      frames: anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    })
    anims.create({
      key: 'player-run',
      frames: anims.generateFrameNumbers('player', { start: 4, end: 9 }),
      frameRate: 12,
      repeat: -1,
    })
    anims.create({
      key: 'player-jump',
      frames: anims.generateFrameNumbers('player', { start: 10, end: 12 }),
      frameRate: 8,
      repeat: 0,
    })
  }

  private playAnimation(state: PlayerState) {
    if (!this.anims.exists(`player-${state}`)) return
    this.play(`player-${state}`, true)
  }

  get isGrounded(): boolean {
    const body = this.body as Phaser.Physics.Arcade.Body
    return body.blocked.down
  }
}
