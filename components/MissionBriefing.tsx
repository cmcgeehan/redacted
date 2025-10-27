'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MISSION_DETAILS } from '@/lib/constants'

interface MissionBriefingProps {
  onComplete: () => void
}

export default function MissionBriefing({ onComplete }: MissionBriefingProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [selfDestructCount, setSelfDestructCount] = useState(10)
  const [showSelfDestruct, setShowSelfDestruct] = useState(false)

  // Text-to-speech function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9 // Slightly slower for dramatic effect
      utterance.pitch = 0.8 // Lower pitch for authority
      utterance.volume = 0.8

      // Try to use a male voice if available
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(voice =>
        voice.name.includes('Male') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('Alex')
      )
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  const sections = [
    {
      text: '"This light to Conor."',
      className: 'text-4xl md:text-6xl italic text-spy-red font-bold mb-12',
      delay: 0,
    },
    {
      text: 'Good morning, Agent.',
      className: 'text-2xl md:text-3xl text-white mb-8',
      delay: 2000,
    },
    {
      text: `Your mission, should you choose to accept it, is to rendezvous in ${MISSION_DETAILS.location}, from ${MISSION_DETAILS.startDate} to ${MISSION_DETAILS.endDate}, ${MISSION_DETAILS.year}, for a covert operation of the highest importance.`,
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      delay: 3500,
    },
    {
      text: `The mission site is a safehouse deep in the woods, where conditions will be harsh, secrecy paramount, and the bonds of brotherhood tested. Forecasts predict temperatures near ${MISSION_DETAILS.temperature} — agents are advised to pack for cold, potential exposure, and unregulated levels of adrenaline.`,
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      delay: 9000,
    },
    {
      text: 'You are to arrive ready for three days of unpredictable field activity. Operatives will be briefed in person. Bring only your essentials — and your loyalty to the mission.',
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      delay: 14000,
    },
    {
      text: 'As always, should you or any member of your team be caught, incapacitated, or found sleeping past noon, the Secretary will disavow all knowledge of your actions.',
      className: 'text-lg md:text-xl text-gray-400 italic mb-8 leading-relaxed',
      delay: 18000,
    },
    {
      text: 'This message will self-destruct in ten seconds.',
      className: 'text-xl md:text-2xl text-spy-red font-bold mb-4',
      delay: 22000,
    },
  ]

  useEffect(() => {
    if (currentSection < sections.length) {
      // Speak the current section text
      const cleanText = sections[currentSection].text.replace(/["""]/g, '') // Remove quotes for better speech
      speak(cleanText)

      const timer = setTimeout(() => {
        setCurrentSection(currentSection + 1)
      }, sections[currentSection].delay + (currentSection === 0 ? 0 : 2000))

      return () => clearTimeout(timer)
    } else if (!showSelfDestruct) {
      // All sections shown, start self-destruct countdown
      setTimeout(() => setShowSelfDestruct(true), 2000)
    }
  }, [currentSection, showSelfDestruct])

  // Load voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Load voices
      window.speechSynthesis.getVoices()
    }
  }, [])

  useEffect(() => {
    if (showSelfDestruct && selfDestructCount > 0) {
      const timer = setTimeout(() => {
        setSelfDestructCount(selfDestructCount - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else if (showSelfDestruct && selfDestructCount === 0) {
      setTimeout(() => onComplete(), 500)
    }
  }, [showSelfDestruct, selfDestructCount, onComplete])

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

      {/* Mission text container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          {sections.slice(0, currentSection + 1).map((section, index) => (
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

          {/* Self-destruct countdown */}
          {showSelfDestruct && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-8"
            >
              <div className="text-8xl md:text-9xl font-bold text-spy-red glitch">
                {selfDestructCount}
              </div>
            </motion.div>
          )}
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
