'use client'

import { useState } from 'react'
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

  const handleAuthenticated = (agentName: string) => {
    setAuthenticatedAgent(agentName)
    setStage('briefing')
  }

  const handleBriefingComplete = () => {
    setStage('countdown')
  }

  const handleBriefingSkip = () => {
    setStage('selector')
  }

  const handleCountdownComplete = () => {
    setStage('selector')
  }

  const handleProceedToIntel = () => {
    setStage('intel')
  }

  const handleReplayBriefing = () => {
    setStage('briefing')
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

      {stage === 'briefing' && <MissionBriefing onComplete={handleBriefingComplete} onSkip={handleBriefingSkip} />}

      {stage === 'countdown' && <Countdown onComplete={handleCountdownComplete} />}

      {stage === 'selector' && (
        <OperativeSelector
          operativeName={authenticatedAgent}
          onProceedToIntel={handleProceedToIntel}
        />
      )}

      {stage === 'intel' && (
        <MissionIntel
          operativeName={authenticatedAgent}
          onReplayBriefing={handleReplayBriefing}
        />
      )}
    </main>
  )
}
