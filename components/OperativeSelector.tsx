'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OPERATIVES } from '@/lib/constants'

interface OperativeSelectorProps {
  onAcceptMission: (operativeName: string) => void
  isSubmitting: boolean
  isAccepted: boolean
}

export default function OperativeSelector({
  onAcceptMission,
  isSubmitting,
  isAccepted,
}: OperativeSelectorProps) {
  const [selectedOperative, setSelectedOperative] = useState('')

  const handleSubmit = () => {
    if (selectedOperative) {
      onAcceptMission(selectedOperative)
    }
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
          {!isAccepted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              {/* Header */}
              <div className="mb-12">
                <div className="text-spy-red text-2xl md:text-3xl font-bold mb-4 tracking-wider">
                  [ CLASSIFIED ACCESS REQUIRED ]
                </div>
                <div className="text-white text-lg md:text-xl">
                  Select your operative name to confirm mission acceptance
                </div>
              </div>

              {/* Dropdown */}
              <div className="mb-8">
                <select
                  value={selectedOperative}
                  onChange={(e) => setSelectedOperative(e.target.value)}
                  className="w-full max-w-md mx-auto bg-black border-2 border-spy-red text-white text-xl px-6 py-4 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-spy-red focus:border-transparent transition-all cursor-pointer"
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    -- SELECT OPERATIVE --
                  </option>
                  {OPERATIVES.map((operative) => (
                    <option key={operative} value={operative}>
                      AGENT {operative.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Accept Button */}
              {selectedOperative && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-spy-red text-white text-xl md:text-2xl font-bold px-12 py-5 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white shadow-lg hover:shadow-2xl transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <span className="animate-spin">⟳</span>
                      ENCRYPTING...
                    </span>
                  ) : (
                    '[ ACCEPT MISSION ]'
                  )}
                </motion.button>
              )}

              {/* Decorative elements */}
              <div className="mt-12 text-gray-600 text-sm font-mono">
                SECURE CONNECTION: ENCRYPTED
                <br />
                CLEARANCE LEVEL: TOP SECRET
              </div>
            </motion.div>
          ) : (
            // Success state
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

              <div className="text-green-500 text-3xl md:text-4xl font-bold mb-6 glitch">
                MISSION ACCEPTED
              </div>

              <div className="text-white text-xl md:text-2xl mb-8">
                Welcome to the team, Agent {selectedOperative}.
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
