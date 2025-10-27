'use client'

import { useState, useEffect, FormEvent } from 'react'
import { motion } from 'framer-motion'

interface LoginScreenProps {
  onAuthenticated: (agentName: string) => void
}

export default function LoginScreen({ onAuthenticated }: LoginScreenProps) {
  const [agentName, setAgentName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [operatives, setOperatives] = useState<string[]>([])
  const [isLoadingOperatives, setIsLoadingOperatives] = useState(true)

  // Fetch operatives on mount
  useEffect(() => {
    const fetchOperatives = async () => {
      try {
        const response = await fetch('/api/operatives')
        const data = await response.json()

        if (response.ok && data.operatives) {
          setOperatives(data.operatives)
        } else {
          console.error('Failed to fetch operatives:', data.error)
          setError('Failed to load operative list')
        }
      } catch (error) {
        console.error('Error fetching operatives:', error)
        setError('Failed to load operative list')
      } finally {
        setIsLoadingOperatives(false)
      }
    }

    fetchOperatives()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsAuthenticating(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operativeName: agentName.trim(),
          password: password,
        }),
      })

      const data = await response.json()

      if (response.ok && data.authenticated) {
        // Success - brief pause for dramatic effect
        setTimeout(() => {
          onAuthenticated(data.operativeName)
        }, 1000)
      } else {
        setError(data.error || 'AUTHENTICATION FAILED')
        setIsAuthenticating(false)
      }
    } catch (error) {
      console.error('Authentication error:', error)
      setError('SYSTEM ERROR - TRY AGAIN')
      setIsAuthenticating(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-spy-dark z-50 overflow-hidden">
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

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-spy-red text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-tech mb-4 sm:mb-6 tracking-[0.2em] sm:tracking-[0.3em] font-black"
            style={{
              textShadow: '0 0 20px rgba(220, 20, 60, 0.8), 0 0 40px rgba(220, 20, 60, 0.5)',
              letterSpacing: '0.2em',
              paddingLeft: '0.2em',
            }}
          >
            CLASSIFIED
          </motion.div>
          <div className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-tech mb-2 tracking-[0.1em] sm:tracking-[0.2em] font-bold text-center px-2">
            AUTHORIZED PERSONNEL ONLY
          </div>
          <div className="text-gray-500 text-xs font-mono tracking-widest">
            [ SECURITY LEVEL: MAXIMUM ]
          </div>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Agent Name Dropdown */}
          <div>
            <label className="block text-spy-red text-sm sm:text-base font-bold mb-2 tracking-wider">
              AGENT NAME
            </label>
            <select
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              disabled={isAuthenticating || isLoadingOperatives}
              className="w-full bg-black border-2 border-spy-red text-white text-base sm:text-lg px-3 sm:px-4 py-3 sm:py-4 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-spy-red focus:border-transparent transition-all disabled:opacity-50 cursor-pointer appearance-none"
              style={{ minHeight: '48px' }}
              required
            >
              <option value="" disabled>
                {isLoadingOperatives ? '-- LOADING OPERATIVES --' : '-- SELECT OPERATIVE --'}
              </option>
              {operatives.map((operative) => (
                <option key={operative} value={operative}>
                  {operative}
                </option>
              ))}
            </select>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-spy-red text-sm sm:text-base font-bold mb-2 tracking-wider">
              ACCESS CODE
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter mission password"
              disabled={isAuthenticating}
              className="w-full bg-black border-2 border-spy-red text-white text-base sm:text-lg px-3 sm:px-4 py-3 sm:py-4 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-spy-red focus:border-transparent transition-all disabled:opacity-50"
              style={{ minHeight: '48px' }}
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/50 border-2 border-red-500 text-red-200 px-4 py-3 rounded-lg text-center font-mono text-sm"
            >
              ⚠ {error}
            </motion.div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full bg-spy-red text-white text-lg sm:text-xl font-bold px-4 sm:px-6 py-4 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:transform-none"
            style={{ minHeight: '56px' }}
          >
            {isAuthenticating ? (
              <span className="flex items-center justify-center gap-3">
                <span className="animate-spin">⟳</span>
                AUTHENTICATING...
              </span>
            ) : (
              '[ ACCESS MISSION ]'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-xs font-mono">
          <div className="mb-2">SECURE CONNECTION: ENCRYPTED</div>
          <div className="text-gray-700">
            UNAUTHORIZED ACCESS WILL BE PROSECUTED
          </div>
        </div>
      </motion.div>
    </div>
  )
}
