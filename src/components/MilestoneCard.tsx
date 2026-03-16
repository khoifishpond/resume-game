import { useEffect, useRef } from 'react'
import type { MilestoneData } from '../game/entities/MilestoneMarker'
import './MilestoneCard.css'

interface Props {
  milestone: MilestoneData
  onDismiss: () => void
}

export default function MilestoneCard({ milestone, onDismiss }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Dismiss on E or Spacebar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyE' || e.code === 'Space') {
        e.preventDefault()
        onDismiss()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onDismiss])

  // Slide-in on mount
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    card.classList.add('milestone-card--enter')
    const id = requestAnimationFrame(() => card.classList.add('milestone-card--visible'))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="milestone-overlay">
      <div className="milestone-card" ref={cardRef}>
        <div className="milestone-card__header">
          <h2 className="milestone-card__title">{milestone.title}</h2>
          <p className="milestone-card__company">{milestone.company}</p>
          {milestone.dates && (
            <p className="milestone-card__dates">{milestone.dates}</p>
          )}
        </div>
        <ul className="milestone-card__bullets">
          {milestone.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <p className="milestone-card__dismiss">Press E or Space to continue</p>
      </div>
    </div>
  )
}
