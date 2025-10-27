'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CountdownProps {
  onComplete: () => void
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [count, setCount] = useState(5)

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-spy-dark z-50">
      {/* Smoke effect background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="smoke"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Countdown number */}
      <AnimatePresence mode="wait">
        {count > 0 && (
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <div
              className="text-[22rem] md:text-[28rem] font-tech font-black text-spy-red tracking-wider"
              style={{
                textShadow: `
                  0 0 30px rgba(220, 20, 60, 0.9),
                  0 0 60px rgba(220, 20, 60, 0.6),
                  0 0 90px rgba(220, 20, 60, 0.4),
                  0 0 120px rgba(220, 20, 60, 0.2),
                  inset 0 0 30px rgba(0, 0, 0, 0.8)
                `,
                WebkitTextStroke: '2px rgba(0, 0, 0, 0.5)',
              }}
            >
              {count}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanline effect */}
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
