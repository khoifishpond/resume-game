import Phaser from 'phaser'

// Shared event emitter for Phaser ↔ React communication.
// Phaser emits 'milestone:open' with data; React emits 'milestone:close' to resume.
export const EventBus = new Phaser.Events.EventEmitter()

export const Events = {
  MILESTONE_OPEN: 'milestone:open',
  MILESTONE_CLOSE: 'milestone:close',
} as const
