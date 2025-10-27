'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CountdownProps {
  onComplete: () => void
}

// TV Screen component
function TVScreen({
  number,
  isCountdown = false,
  index
}: {
  number: number | string
  isCountdown?: boolean
  index: number
}) {
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    // Random flashing effect
    if (!isCountdown) {
      const interval = setInterval(() => {
        setFlash(Math.random() > 0.7)
      }, 100 + Math.random() * 200)
      return () => clearInterval(interval)
    }
  }, [isCountdown])

  return (
    <div className="relative">
      {/* TV Frame */}
      <div
        className="relative bg-black border-8 border-gray-800 rounded-lg overflow-hidden shadow-2xl"
        style={{
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Screen Content */}
        <div
          className={`aspect-[4/3] flex items-center justify-center relative ${
            flash || isCountdown ? 'bg-gray-900' : 'bg-black'
          }`}
          style={{
            background: flash || isCountdown
              ? 'radial-gradient(circle, rgba(30,30,30,1) 0%, rgba(0,0,0,1) 100%)'
              : 'black'
          }}
        >
          {/* Static/Noise effect */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              animation: 'noise 0.2s steps(10) infinite'
            }}
          />

          {/* Number Display */}
          <motion.div
            key={number}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-6xl md:text-7xl font-mono font-black z-10 ${
              isCountdown ? 'text-spy-red' : 'text-red-600'
            }`}
            style={{
              textShadow: isCountdown
                ? '0 0 30px rgba(220, 20, 60, 1), 0 0 60px rgba(220, 20, 60, 0.5)'
                : '0 0 20px rgba(220, 20, 60, 0.8)',
              filter: flash ? 'brightness(1.5)' : 'brightness(1)'
            }}
          >
            {number}
          </motion.div>

          {/* CRT Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
              opacity: 0.3
            }}
          />

          {/* Screen glare */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"
          />
        </div>
      </div>

      {/* TV Stand/Base */}
      <div className="w-1/3 h-4 bg-gray-800 mx-auto rounded-b-lg shadow-lg" />
    </div>
  )
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [count, setCount] = useState(10)
  const [randomNumbers, setRandomNumbers] = useState<number[]>([])

  useEffect(() => {
    if (count === 0) {
      setTimeout(() => onComplete(), 500)
      return
    }

    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, onComplete])

  // Update random numbers frequently
  useEffect(() => {
    const updateNumbers = () => {
      setRandomNumbers(Array.from({ length: 8 }, () =>
        Math.floor(Math.random() * 999999)
      ))
    }

    updateNumbers()
    const interval = setInterval(updateNumbers, 150)
    return () => clearInterval(interval)
  }, [count])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-spy-dark z-50 p-4 md:p-8">
      {/* Dark room effect */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Grid of TV Screens */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl w-full">
        {[...Array(8)].map((_, index) => {
          // Make 2-3 screens show the countdown number
          const showCountdown = index === 2 || index === 5 || (count <= 5 && index === 7)
          const displayNumber = showCountdown ? count : randomNumbers[index]

          return (
            <TVScreen
              key={index}
              number={displayNumber}
              isCountdown={showCountdown}
              index={index}
            />
          )
        })}
      </div>

      {/* Overall scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="h-full w-full"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)'
          }}
        />
      </div>
    </div>
  )
}
