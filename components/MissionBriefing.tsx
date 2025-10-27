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
      text: 'Good morning Agent.',
      className: 'text-2xl md:text-3xl text-white mb-8',
      displayDelay: 0,
    },
    {
      text: (
        <span>
          Your mission, should you choose <span className="text-spy-red">to</span> accept it, is to rendezvous in Montréal, Québec, on <span className="text-spy-red">this</span> January 22nd for a covert operation expected to last three days that is of the highest importance.
        </span>
      ),
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      displayDelay: 3000,
    },
    {
      text: (
        <span>
          The mission site is a safehouse deep in the woods, where conditions will be harsh, secrecy paramount, and the bonds of brotherhood tested. Forecasts predict temperatures near 7°F — agents are advised to pack for cold, potential exposure, activities in <span className="text-spy-red">light</span> and darkness, and unregulated levels of adrenaline.
        </span>
      ),
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      displayDelay: 15000,
    },
    {
      text: (
        <span>
          You are to arrive ready for three days of unpredictable field activity. Operatives will be briefed in person. Bring only your essentials — and your <span className="text-spy-red">Honor</span>.
        </span>
      ),
      className: 'text-lg md:text-xl text-gray-300 mb-6 leading-relaxed',
      displayDelay: 29000,
    },
    {
      text: 'As always, should you or any member of your team be caught, incapacitated, or found sleeping past noon, the Secretary will disavow all knowledge of your actions.',
      className: 'text-lg md:text-xl text-gray-400 italic mb-8 leading-relaxed',
      displayDelay: 40000,
    },
    {
      text: 'This message will self destruct in ten seconds.',
      className: 'text-lg md:text-xl text-gray-500 italic mb-8 leading-relaxed',
      displayDelay: 49000,
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
      const timer = setTimeout(() => onComplete(), 7000)
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
      }, 7000) // Time for last section (self-destruct message)
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
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <button
              onClick={handleBegin}
              className="bg-spy-red hover:bg-red-600 text-white text-2xl md:text-3xl font-tech font-bold px-12 py-6 rounded-lg transition-all border-2 border-white shadow-2xl transform hover:scale-105"
              style={{
                textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              [ BEGIN AUDIO BRIEFING ]
            </button>
          </motion.div>
        </div>
      )}

      {/* Mission Intel Visuals */}
      {hasStarted && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:block">
          <AnimatePresence mode="wait">
            {/* Map and Flag - Section 1 */}
            {currentSection === 1 && (
              <motion.div
                key="map"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="w-80 space-y-4"
              >
                {/* Map */}
                <div className="border-4 border-spy-red bg-black p-4 shadow-2xl">
                  <div className="text-spy-red text-xs font-mono mb-2 tracking-wider">
                    [ MISSION LOCATION ]
                  </div>
                  <div className="relative bg-gray-900 aspect-[4/3] flex items-center justify-center">
                    {/* Simple map representation */}
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      {/* North America outline (simplified) */}
                      <path
                        d="M 50,50 L 100,30 L 200,40 L 280,60 L 320,100 L 300,180 L 250,200 L 200,220 L 150,240 L 100,200 L 60,150 Z"
                        fill="none"
                        stroke="rgba(220, 20, 60, 0.5)"
                        strokeWidth="2"
                      />
                      {/* Montreal marker */}
                      <circle cx="220" cy="100" r="8" fill="#DC143C" className="animate-pulse" />
                      <circle cx="220" cy="100" r="15" fill="none" stroke="#DC143C" strokeWidth="2" opacity="0.6" />
                      <text x="240" y="105" fill="#DC143C" fontSize="14" fontWeight="bold">MONTRÉAL</text>
                    </svg>
                  </div>
                </div>

                {/* Canadian Flag */}
                <div className="border-4 border-spy-red bg-black p-4 shadow-2xl">
                  <div className="text-spy-red text-xs font-mono mb-2 tracking-wider">
                    [ TARGET NATION ]
                  </div>
                  <div className="flex h-24 overflow-hidden">
                    <div className="w-1/3 bg-red-600" />
                    <div className="w-1/3 bg-white flex items-center justify-center">
                      <div className="text-red-600 text-5xl">🍁</div>
                    </div>
                    <div className="w-1/3 bg-red-600" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Safehouse Image - Section 2 */}
            {currentSection === 2 && (
              <motion.div
                key="safehouse"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="w-96"
              >
                <div className="border-4 border-spy-red bg-black p-4 shadow-2xl">
                  <div className="text-spy-red text-xs font-mono mb-2 tracking-wider">
                    [ SAFEHOUSE LOCATION ]
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src="/safehouse.avif"
                      alt="Safehouse"
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'sepia(100%) hue-rotate(-50deg) saturate(400%) brightness(0.6)'
                      }}
                    />
                    <div className="absolute inset-0 bg-spy-red/30 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-spy-red text-xs font-mono">
                      CLASSIFIED
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mission Stats - Section 3 */}
            {currentSection === 3 && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="w-80 space-y-4"
              >
                {/* Duration */}
                <div className="border-4 border-spy-red bg-black p-6 shadow-2xl">
                  <div className="text-spy-red text-xs font-mono mb-2 tracking-wider">
                    [ MISSION DURATION ]
                  </div>
                  <div className="text-spy-red text-6xl font-tech font-black text-center">
                    72
                  </div>
                  <div className="text-gray-400 text-2xl font-tech text-center">
                    HOURS
                  </div>
                </div>

                {/* Temperature Warning */}
                <div className="border-4 border-spy-red bg-black p-4 shadow-2xl">
                  <div className="text-spy-red text-xs font-mono mb-2 tracking-wider">
                    [ WEATHER ALERT ]
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl">❄️</div>
                    <div className="text-right">
                      <div className="text-spy-red text-4xl font-tech font-black">7°F</div>
                      <div className="text-gray-400 text-sm font-mono">(-14°C)</div>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-xs font-mono mt-2 animate-pulse">
                    ⚠ EXTREME COLD WARNING
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Mission text container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 xl:mr-[28rem]">
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
