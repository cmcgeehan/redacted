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
  const [response, setResponse] = useState<'accepted' | 'declined' | null>(null)

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

  const handleRespondToMission = async (operativeName: string, status: 'accepted' | 'declined') => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operativeName,
          status
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResponse(status)
      } else {
        console.error('RSVP failed:', data.error)
        console.error('RSVP error details:', data.details)
        console.error('Full error response:', data)
        alert(`Failed to submit response: ${data.details || data.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error submitting response:', error)
      alert('Failed to submit response. Please try again.')
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

      {/* Video embed - pre-load during briefing, show during countdown */}
      {(stage === 'briefing' || stage === 'countdown') && (
        <div className={stage === 'briefing' ? 'hidden' : ''}>
          <VideoEmbed isPlaying={isVideoPlaying} />
        </div>
      )}

      {/* Stage components */}
      {stage === 'login' && <LoginScreen onAuthenticated={handleAuthenticated} />}

      {stage === 'briefing' && <MissionBriefing onComplete={handleBriefingComplete} />}

      {stage === 'countdown' && <Countdown onComplete={handleCountdownComplete} />}

      {stage === 'selector' && (
        <OperativeSelector
          operativeName={authenticatedAgent}
          onRespondToMission={handleRespondToMission}
          isSubmitting={isSubmitting}
          response={response}
        />
      )}
    </main>
  )
}
