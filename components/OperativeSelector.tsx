'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface OperativeSelectorProps {
  operativeName: string
  onProceedToIntel: () => void
}

export default function OperativeSelector({
  operativeName,
  onProceedToIntel,
}: OperativeSelectorProps) {
  // Play audio when component mounts
  useEffect(() => {
    const audioUrl = '/mission-audio.mp3'
    const audio = new Audio(audioUrl)
    audio.volume = 0.7

    audio.play()
      .then(() => console.log('Audio playing successfully'))
      .catch(err => console.error('Audio autoplay blocked or failed:', err))

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  // Auto-advance to intel after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onProceedToIntel()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onProceedToIntel])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-spy-dark z-40 overflow-y-auto overflow-x-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
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

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="text-spy-red text-2xl sm:text-3xl md:text-4xl font-bold mb-6 tracking-wider">
              [ MISSION BRIEFING COMPLETE ]
            </div>
            <div className="text-white text-xl sm:text-2xl md:text-3xl font-tech font-bold mb-2">
              AGENT {operativeName.toUpperCase()}
            </div>
            <div className="text-gray-400 text-sm sm:text-base font-mono">
              IDENTITY VERIFIED
            </div>
          </div>

          {/* Main message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="border-4 border-spy-red bg-black/80 p-6 sm:p-8 shadow-2xl"
          >
            <div className="text-spy-red text-lg sm:text-xl font-mono mb-6 tracking-wider">
              [ MISSION RESPONSE REQUIRED ]
            </div>

            <div className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-4 mb-8">
              <p>
                To confirm your attendance and provide critical mission information
                (travel details, dietary restrictions, etc.), please report to the
                <span className="text-white font-bold"> SCIF Communications Channel</span>.
              </p>
              <p className="text-spy-red font-bold">
                All mission RSVPs and logistics must be coordinated through the secure channel.
              </p>
            </div>

            {/* WhatsApp Button */}
            <motion.a
              href="https://chat.whatsapp.com/Ck373wwKOyJ08QNo5eXzHp?mode=wwt"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 font-mono font-bold text-lg sm:text-xl md:text-2xl transition-all border-2 rounded bg-green-700 text-white border-white hover:bg-green-600 hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              <span className="text-2xl sm:text-3xl">💬</span>
              <span>JOIN SCIF CHANNEL</span>
            </motion.a>

            <div className="text-gray-500 text-xs sm:text-sm font-mono mt-4">
              Encrypted WhatsApp Communications
            </div>
          </motion.div>

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onProceedToIntel}
            className="text-gray-500 hover:text-spy-red text-sm font-mono transition-colors underline"
          >
            Skip to Mission Intel →
          </motion.button>

          {/* Decorative elements */}
          <div className="mt-8 text-gray-600 text-xs sm:text-sm font-mono">
            SECURE CONNECTION: ENCRYPTED
            <br />
            CLEARANCE LEVEL: TOP SECRET
          </div>
        </motion.div>
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
