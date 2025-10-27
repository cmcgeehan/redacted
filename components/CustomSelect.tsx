'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
  disabled?: boolean
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: string) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Select button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className="w-full bg-black border-2 border-spy-red text-white text-base sm:text-lg px-3 sm:px-4 py-3 sm:py-4 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-spy-red focus:border-transparent transition-all disabled:opacity-50 cursor-pointer text-left"
        style={{ minHeight: '48px' }}
      >
        {value || placeholder}
      </button>

      {/* Custom dropdown modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-0 left-0 right-0 bg-spy-dark border-t-4 border-spy-red z-50 max-h-[70vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-spy-dark border-b-2 border-spy-red p-4 flex justify-between items-center">
                <span className="text-spy-red text-xl font-bold tracking-wider">
                  SELECT OPERATIVE
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white text-2xl font-bold hover:text-spy-red transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Options */}
              <div className="p-2">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-6 py-5 text-2xl font-mono transition-all border-2 mb-2 rounded-lg ${
                      value === option
                        ? 'bg-spy-red text-white border-white'
                        : 'bg-black text-white border-spy-red hover:bg-spy-red/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
