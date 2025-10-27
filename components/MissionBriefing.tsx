'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MISSION_DETAILS } from '@/lib/constants'

interface MissionBriefingProps {
  onComplete: () => void
}

export default function MissionBriefing({ onComplete }: MissionBriefingProps) {
  const [currentSection, setCurrentSection] = useState(-1) // Start at -1 to wait for user
  const [hasStarted, setHasStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const sections = [
    {
      text: (
        <span>
          "<span className="text-spy-red">This</span> <span className="text-spy-red">light</span> <span className="text-spy-red">to</span> <span className="text-spy-red">honor</span>"
        </span>
      ),
      className: 'text-4xl md:text-6xl italic font-bold mb-12 text-white',
      displayDelay: 0,
    },
    {
      text: 'Good morning Agent.',
      className: 'text-2xl md:text-3xl text-white mb-8',
      displayDelay: 3000,
    },
    {
      text: 'Your mission, should you choose to accept it, is to rendezvous in Montréal, Québec, on this January 22nd for a covert operation expected to last three days that is of the highest importance.',
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      displayDelay: 8000,
    },
    {
      text: 'The mission site is a safehouse deep in the woods, where conditions will be harsh, secrecy paramount, and the bonds of brotherhood tested. Forecasts predict temperatures near 7°F — agents are advised to pack for cold, potential exposure, activities in light and darkness, and unregulated levels of adrenaline.',
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      displayDelay: 20000,
    },
    {
      text: 'You are to arrive ready for three days of unpredictable field activity. Operatives will be briefed in person. Bring only your essentials — and your Conor.',
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      displayDelay: 34000,
    },
    {
      text: 'As always, should you or any member of your team be caught, incapacitated, or found sleeping past noon, the Secretary will disavow all knowledge of your actions.',
      className: 'text-lg md:text-xl text-gray-400 italic mb-8 leading-relaxed',
      displayDelay: 45000,
    },
    {
      text: 'This message will self destruct in ten seconds.',
      className: 'text-lg md:text-xl text-gray-500 italic mb-8 leading-relaxed',
      displayDelay: 54000,
    },
  ]

  // Handle beginning the briefing with user interaction
  const handleBegin = () => {
    setHasStarted(true)
    setCurrentSection(0)

    // Play voiceover audio
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => console.log('Voiceover audio playing'))
        .catch(err => console.error('Audio playback error:', err))
    }
  }

  // Display text sections on schedule
  useEffect(() => {
    if (!hasStarted || currentSection < 0) return

    if (currentSection >= sections.length) {
      const timer = setTimeout(() => onComplete(), 2000)
      return () => clearTimeout(timer)
    }

    const nextSection = currentSection + 1
    if (nextSection < sections.length) {
      const delay = sections[nextSection].displayDelay - (currentSection >= 0 ? sections[currentSection].displayDelay : 0)
      const timer = setTimeout(() => {
        setCurrentSection(nextSection)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      // All sections shown, wait a bit then complete
      const timer = setTimeout(() => {
        setCurrentSection(nextSection)
      }, 8000) // Time for last section
      return () => clearTimeout(timer)
    }
  }, [currentSection, hasStarted, onComplete])

  // Set up audio element
  useEffect(() => {
    audioRef.current = new Audio('/ttsMP3.com_VoiceText_2025-10-27_11-50-3.mp3')
    audioRef.current.volume = 0.9

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-spy-dark z-40 overflow-hidden">
      {/* Background smoke effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="smoke"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Begin button - shown before briefing starts */}
      {!hasStarted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-20 text-center"
        >
          <button
            onClick={handleBegin}
            className="bg-spy-red hover:bg-red-600 text-white text-2xl md:text-3xl font-tech font-bold px-12 py-6 rounded-lg transition-all border-2 border-white shadow-2xl transform hover:scale-105"
            style={{
              textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            [ BEGIN MISSION BRIEFING ]
          </button>
          <div className="text-gray-500 text-sm font-mono mt-4">
            Click to start audio briefing
          </div>
        </motion.div>
      )}

      {/* Mission text container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <AnimatePresence>
          {hasStarted && sections.slice(0, currentSection + 1).map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={section.className}
            >
              {section.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="h-full w-full"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
          }}
        />
      </div>
    </div>
  )
}
