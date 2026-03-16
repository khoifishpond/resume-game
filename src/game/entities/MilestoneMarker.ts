import Phaser from 'phaser'
import { EventBus, Events } from '../EventBus'

export interface MilestoneData {
  id: string
  worldX: number
  zone: number
  title: string
  company: string
  dates: string
  bullets: string[]
}

const PROXIMITY = 100 // px — how close the player must be to trigger prompt

export class MilestoneMarker extends Phaser.GameObjects.Container {
  private data: MilestoneData
  private markerGfx: Phaser.GameObjects.Graphics
  private promptText: Phaser.GameObjects.Text
  private dismissed = false
  private promptVisible = false

  constructor(scene: Phaser.Scene, data: MilestoneData) {
    const groundY = 688
    super(scene, data.worldX, groundY - 32)

    this.data = data

    // Marker pole
    this.markerGfx = scene.add.graphics()
    this.drawMarker()

    // "Press E" prompt — hidden until player is close
    this.promptText = scene.add
      .text(data.worldX, groundY - 130, '[ E ]', {
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 8, y: 4 },
      })
      .setOrigin(0.5, 1)
      .setAlpha(0)

    scene.add.existing(this)
  }

  // Called every frame from MainGame with current player x position
  update(playerX: number, eKeyJustDown: boolean) {
    if (this.dismissed) return

    const dist = Math.abs(playerX - this.data.worldX)
    const inRange = dist < PROXIMITY

    if (inRange !== this.promptVisible) {
      this.promptVisible = inRange
      this.scene.tweens.add({
        targets: this.promptText,
        alpha: inRange ? 1 : 0,
        duration: 150,
      })
    }

    if (inRange && eKeyJustDown) {
      this.openCard()
    }
  }

  private openCard() {
    this.dismissed = true
    this.promptText.setAlpha(0)
    this.markerGfx.setAlpha(0.3)
    EventBus.emit(Events.MILESTONE_OPEN, this.data)
  }

  private drawMarker() {
    const x = this.data.worldX
    const groundY = 688

    // Glowing orb
    this.markerGfx.fillStyle(0xffd700, 1)
    this.markerGfx.fillCircle(x, groundY - 80, 12)

    // Pole
    this.markerGfx.fillStyle(0xaaaaaa, 0.8)
    this.markerGfx.fillRect(x - 2, groundY - 68, 4, 36)
  }
}
