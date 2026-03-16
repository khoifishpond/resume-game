import { useState, useEffect } from 'react'
import GameCanvas from './components/GameCanvas'
import MilestoneCard from './components/MilestoneCard'
import { EventBus, Events } from './game/EventBus'
import type { MilestoneData } from './game/entities/MilestoneMarker'
import './App.css'

export default function App() {
  const [activeMilestone, setActiveMilestone] = useState<MilestoneData | null>(null)

  useEffect(() => {
    EventBus.on(Events.MILESTONE_OPEN, (data: MilestoneData) => {
      setActiveMilestone(data)
    })
    return () => {
      EventBus.off(Events.MILESTONE_OPEN)
    }
  }, [])

  const handleDismiss = () => {
    setActiveMilestone(null)
    EventBus.emit(Events.MILESTONE_CLOSE)
  }

  return (
    <main>
      <GameCanvas />
      {activeMilestone && (
        <MilestoneCard milestone={activeMilestone} onDismiss={handleDismiss} />
      )}
    </main>
  )
}
