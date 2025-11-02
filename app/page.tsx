'use client'

import { useState, useEffect } from 'react'
import LoginScreen from '@/components/LoginScreen'
import Countdown from '@/components/Countdown'
import VideoEmbed from '@/components/VideoEmbed'
import MissionBriefing from '@/components/MissionBriefing'
import OperativeSelector from '@/components/OperativeSelector'
import MissionIntel from '@/components/MissionIntel'

type Stage = 'login' | 'countdown' | 'briefing' | 'selector' | 'intel'

export default function Home() {
  const [stage, setStage] = useState<Stage>('login')
  const [authenticatedAgent, setAuthenticatedAgent] = useState<string>('')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState<'accepted' | 'declined' | null>(null)

  const handleAuthenticated = async (agentName: string) => {
    setAuthenticatedAgent(agentName)

    // Check if user has already RSVP'd
    try {
      const response = await fetch(`/api/rsvp?operative=${encodeURIComponent(agentName)}`)
      const data = await response.json()

      if (data.rsvp && data.rsvp.rsvp_status === 'accepted') {
        // If already accepted, go straight to intel
        setResponse('accepted')
        setStage('intel')
      } else {
        // Otherwise, show briefing
        setStage('briefing')
      }
    } catch (error) {
      console.error('Error checking RSVP status:', error)
      // On error, just show briefing
      setStage('briefing')
    }
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
        // If accepted, transition to intel page
        if (status === 'accepted') {
          setTimeout(() => {
            setStage('intel')
          }, 3000) // Wait 3 seconds to show the acceptance animation
        }
      } else {
        console.error('RSVP failed:', data.error)
        alert('Failed to submit response. Please try again.')
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

      {stage === 'intel' && (
        <MissionIntel operativeName={authenticatedAgent} />
      )}
    </main>
  )
}
