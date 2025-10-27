'use client'

import { useState } from 'react'
import LoginScreen from '@/components/LoginScreen'
import Countdown from '@/components/Countdown'
import VideoEmbed from '@/components/VideoEmbed'
import MissionBriefing from '@/components/MissionBriefing'
import OperativeSelector from '@/components/OperativeSelector'

type Stage = 'login' | 'countdown' | 'briefing' | 'selector'

export default function Home() {
  const [stage, setStage] = useState<Stage>('login')
  const [authenticatedAgent, setAuthenticatedAgent] = useState<string>('')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)

  const handleAuthenticated = (agentName: string) => {
    setAuthenticatedAgent(agentName)
    setStage('briefing')
  }

  const handleBriefingComplete = () => {
    setStage('countdown')
  }

  const handleCountdownComplete = () => {
    setStage('selector')
  }

  const handleAcceptMission = async (operativeName: string) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operativeName }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAccepted(true)
      } else {
        console.error('RSVP failed:', data.error)
        alert('Failed to accept mission. Please try again.')
      }
    } catch (error) {
      console.error('Error accepting mission:', error)
      alert('Failed to accept mission. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Start video when countdown begins
  if (stage === 'countdown' && !isVideoPlaying) {
    setIsVideoPlaying(true)
  }

  return (
    <main className="relative min-h-screen">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-spy-dark via-black to-red-950 -z-10" />

      {/* Video embed - shown during countdown */}
      {stage === 'countdown' && <VideoEmbed isPlaying={isVideoPlaying} />}

      {/* Stage components */}
      {stage === 'login' && <LoginScreen onAuthenticated={handleAuthenticated} />}

      {stage === 'briefing' && <MissionBriefing onComplete={handleBriefingComplete} />}

      {stage === 'countdown' && <Countdown onComplete={handleCountdownComplete} />}

      {stage === 'selector' && (
        <OperativeSelector
          onAcceptMission={handleAcceptMission}
          isSubmitting={isSubmitting}
          isAccepted={isAccepted}
        />
      )}
    </main>
  )
}
