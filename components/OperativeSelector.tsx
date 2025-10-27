'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OperativeSelectorProps {
  operativeName: string
  onRespondToMission: (operativeName: string, status: 'accepted' | 'declined') => void
  isSubmitting: boolean
  response: 'accepted' | 'declined' | null
}

export default function OperativeSelector({
  operativeName,
  onRespondToMission,
  isSubmitting,
  response,
}: OperativeSelectorProps) {
  // Play audio when component mounts
  useEffect(() => {
    const audioUrl = '/mission-audio.mp3'

    const audio = new Audio(audioUrl)
    audio.volume = 0.7

    console.log('Attempting to play audio from:', audioUrl)

    audio.addEventListener('canplaythrough', () => {
      console.log('Audio can play through')
    })

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e)
      console.error('Audio error details:', audio.error)
    })

    audio.addEventListener('loadeddata', () => {
      console.log('Audio loaded')
    })

    audio.play()
      .then(() => {
        console.log('Audio playing successfully')
      })
      .catch(err => {
        console.error('Audio autoplay blocked or failed:', err)
      })

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  const handleAccept = () => {
    onRespondToMission(operativeName, 'accepted')
  }

  const handleDecline = () => {
    onRespondToMission(operativeName, 'declined')
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-spy-dark z-40 overflow-hidden">
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
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {!response ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              {/* Header */}
              <div className="mb-12">
                <div className="text-spy-red text-2xl md:text-3xl font-bold mb-4 tracking-wider whitespace-nowrap">
                  [ CLASSIFIED ACCESS REQUIRED ]
                </div>
                <div className="text-white text-lg md:text-xl mb-8">
                  Confirm your mission response
                </div>
                {/* Agent Name Display */}
                <div className="text-white text-3xl md:text-4xl font-tech font-bold mb-2">
                  AGENT {operativeName.toUpperCase()}
                </div>
                <div className="text-gray-500 text-sm font-mono">
                  IDENTITY VERIFIED
                </div>
              </div>

              {/* Accept and Decline Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleAccept}
                  disabled={isSubmitting}
                  className="bg-green-700 hover:bg-green-600 text-white text-xl md:text-2xl font-bold px-12 py-5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white shadow-lg hover:shadow-2xl transform hover:scale-105 w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="animate-spin">⟳</span>
                      PROCESSING...
                    </span>
                  ) : (
                    '[ ACCEPT ]'
                  )}
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleDecline}
                  disabled={isSubmitting}
                  className="bg-spy-red hover:bg-red-600 text-white text-xl md:text-2xl font-bold px-12 py-5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white shadow-lg hover:shadow-2xl transform hover:scale-105 w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="animate-spin">⟳</span>
                      PROCESSING...
                    </span>
                  ) : (
                    '[ DECLINE ]'
                  )}
                </motion.button>
              </div>

              {/* Decorative elements */}
              <div className="mt-12 text-gray-600 text-sm font-mono">
                SECURE CONNECTION: ENCRYPTED
                <br />
                CLEARANCE LEVEL: TOP SECRET
              </div>
            </motion.div>
          ) : response === 'accepted' ? (
            // Accepted state
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Success animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
                className="mb-8"
              >
                <div className="text-9xl mb-4">✓</div>
              </motion.div>

              <div className="text-green-500 text-3xl md:text-4xl font-tech font-bold mb-6">
                MISSION ACCEPTED
              </div>

              <div className="text-white text-xl md:text-2xl mb-8">
                Welcome to the team, Agent {operativeName}.
              </div>

              <div className="text-gray-400 text-lg mb-4">
                Stand by for further instructions.
              </div>

              <div className="text-spy-red text-sm font-mono mt-12 animate-pulse">
                [ TRANSMISSION COMPLETE ]
              </div>

              {/* Encrypted code effect */}
              <div className="mt-8 text-xs text-gray-700 font-mono opacity-50">
                SHA-256: {Array.from({ length: 64 }, () =>
                  Math.floor(Math.random() * 16).toString(16)
                ).join('')}
              </div>
            </motion.div>
          ) : (
            // Declined state
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <div className="text-9xl mb-4">✗</div>
              </motion.div>

              <div className="text-spy-red text-3xl md:text-4xl font-tech font-bold mb-6">
                MISSION DECLINED
              </div>

              <div className="text-white text-xl md:text-2xl mb-8">
                Agent {operativeName}, your response has been recorded.
              </div>

              <div className="text-gray-400 text-lg mb-4">
                We regret you cannot attend.
              </div>

              <div className="text-gray-600 text-sm font-mono mt-12 animate-pulse">
                [ TRANSMISSION COMPLETE ]
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
