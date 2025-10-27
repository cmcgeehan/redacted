'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MISSION_DETAILS } from '@/lib/constants'

interface MissionBriefingProps {
  onComplete: () => void
}

export default function MissionBriefing({ onComplete }: MissionBriefingProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [voicesLoaded, setVoicesLoaded] = useState(false)

  // Text-to-speech function that returns a promise
  const speak = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        console.log('Speech synthesis not supported')
        resolve()
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9 // Slightly slower for dramatic effect
      utterance.pitch = 0.8 // Lower pitch for authority
      utterance.volume = 1.0

      // Get voices
      const voices = window.speechSynthesis.getVoices()

      // Try to use a male voice if available
      const preferredVoice = voices.find(voice =>
        voice.name.includes('Male') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('Alex') ||
        voice.name.includes('Google')
      )

      if (preferredVoice) {
        utterance.voice = preferredVoice
      } else if (voices.length > 0) {
        utterance.voice = voices[0]
      }

      // Resolve promise when speech finishes
      utterance.onend = () => {
        resolve()
      }

      utterance.onerror = (event) => {
        // Don't log "canceled" errors as they're expected
        if (event.error !== 'canceled') {
          console.error('Speech error:', event.error)
        }
        resolve()
      }

      window.speechSynthesis.speak(utterance)
    })
  }

  const sections = [
    {
      text: '"This light to Conor."',
      className: 'text-4xl md:text-6xl italic text-spy-red font-bold mb-12',
      displayDelay: 0,
    },
    {
      text: 'Good morning, Agent.',
      className: 'text-2xl md:text-3xl text-white mb-8',
      displayDelay: 3000,
    },
    {
      text: `Your mission, should you choose to accept it, is to rendezvous in ${MISSION_DETAILS.location}, from ${MISSION_DETAILS.startDate} to ${MISSION_DETAILS.endDate}, ${MISSION_DETAILS.year}, for a covert operation of the highest importance.`,
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      displayDelay: 5000,
    },
    {
      text: `The mission site is a safehouse deep in the woods, where conditions will be harsh, secrecy paramount, and the bonds of brotherhood tested. Forecasts predict temperatures near ${MISSION_DETAILS.temperature} — agents are advised to pack for cold, potential exposure, and unregulated levels of adrenaline.`,
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      displayDelay: 16000,
    },
    {
      text: 'You are to arrive ready for three days of unpredictable field activity. Operatives will be briefed in person. Bring only your essentials — and your loyalty to the mission.',
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      displayDelay: 27000,
    },
    {
      text: 'As always, should you or any member of your team be caught, incapacitated, or found sleeping past noon, the Secretary will disavow all knowledge of your actions.',
      className: 'text-lg md:text-xl text-gray-400 italic mb-8 leading-relaxed',
      displayDelay: 36000,
    },
  ]

  // Display text sections on schedule
  useEffect(() => {
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
  }, [currentSection, onComplete])

  // Play voiceover independently (non-blocking)
  useEffect(() => {
    if (currentSection >= 0 && currentSection < sections.length) {
      const cleanText = sections[currentSection].text.replace(/["""]/g, '')
      // Fire and forget - don't block on this
      speak(cleanText).catch(err => console.error('Speech error:', err))
    }
  }, [currentSection])

  // Load voices when component mounts and cleanup on unmount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Load voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices()
        if (voices.length > 0) {
          setVoicesLoaded(true)
        }
      }

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }

      // Try loading immediately too
      loadVoices()

      // Cleanup: cancel all speech when component unmounts
      return () => {
        window.speechSynthesis.cancel()
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

      {/* Mission text container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <AnimatePresence>
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
