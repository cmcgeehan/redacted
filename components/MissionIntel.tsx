'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MISSION_DETAILS } from '@/lib/constants'

interface MissionIntelProps {
  operativeName: string
  onReplayBriefing: () => void
}

type Section = 'overview' | 'checklist' | 'schedule' | 'gear' | 'funding' | 'operatives'

interface Operative {
  operative_name: string
}

interface MissionEvent {
  time: string
  title: string
  description?: string
  classification?: 'top-secret' | 'classified' | 'confidential'
}

interface DaySchedule {
  date: string
  day: string
  events: MissionEvent[]
}

export default function MissionIntel({ operativeName, onReplayBriefing }: MissionIntelProps) {
  const [currentSection, setCurrentSection] = useState<Section>('overview')

  // Note: Operative roster is now managed in the WhatsApp group
  // This section has been simplified to remove database dependency
  const operatives: Operative[] = []
  const isLoadingOperatives = false

  const sections = [
    { id: 'overview' as Section, label: 'MISSION OVERVIEW', icon: '📋' },
    { id: 'checklist' as Section, label: 'PRE-MISSION CHECKLIST', icon: '✓' },
    { id: 'schedule' as Section, label: 'MISSION SCHEDULE', icon: '📅' },
    { id: 'gear' as Section, label: 'MISSION GEAR', icon: '🎒' },
    { id: 'funding' as Section, label: 'MISSION FUNDING', icon: '💰' },
    { id: 'operatives' as Section, label: 'OPERATIVES', icon: '👥' },
  ]

  // Mission schedule - You can edit these events as needed
  const missionSchedule: DaySchedule[] = [
    {
      date: 'January 22',
      day: 'Wednesday',
      events: [
        { time: '~12:00', title: 'OPERATION ARRIVAL', description: 'Operatives rendezvous at designated coordinates', classification: 'classified' },
        { time: '~13:00', title: 'SAFEHOUSE INFILTRATION', description: 'Ground transport to safehouse location (1 hour drive)', classification: 'top-secret' },
        { time: '~14:00', title: 'RATION ACQUISITION', description: 'Secure provisions and supplies for mission duration', classification: 'confidential' },
      ]
    },
    {
      date: 'January 23',
      day: 'Thursday',
      events: []
    },
    {
      date: 'January 24',
      day: 'Friday',
      events: []
    },
    {
      date: 'January 25',
      day: 'Saturday',
      events: [
        { time: '~12:00', title: 'MONTREAL EXFILTRATION', description: 'Team rendezvous in Montréal for coordinated departure', classification: 'classified' },
      ]
    },
  ]

  // TBD Events - timing to be determined
  const tbdEvents: MissionEvent[] = [
    { time: 'TBD', title: 'SIMULATION EXERCISE', description: '2.5-hour training operation + 1 hour transport', classification: 'top-secret' },
    { time: 'TBD', title: 'OPERATION WHIP_ROUTE', description: 'Secret mission coordinated by Agent Whip_Route (2 hours, evening)', classification: 'classified' },
  ]

  return (
    <div className="fixed inset-0 flex flex-col bg-spy-dark z-40 overflow-hidden">
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

      {/* Header */}
      <div className="relative z-10 border-b-2 border-spy-red bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-tech font-bold text-spy-red">
                [ CLASSIFIED INTEL ]
              </h1>
              <p className="text-sm text-gray-400 font-mono">
                AGENT: {operativeName.toUpperCase()}
              </p>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-mono">
              CLEARANCE: TOP SECRET
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 border-b border-spy-red/50 bg-black/60 backdrop-blur-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 sm:gap-4 py-3 min-w-max sm:min-w-0">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 font-mono text-xs sm:text-sm font-bold transition-all border-2 rounded whitespace-nowrap ${
                  currentSection === section.id
                    ? 'bg-spy-red text-white border-white shadow-lg'
                    : 'bg-black/50 text-gray-400 border-spy-red/50 hover:border-spy-red hover:text-spy-red'
                }`}
              >
                <span className="text-base sm:text-lg">{section.icon}</span>
                <span className="hidden sm:inline">{section.label}</span>
                <span className="sm:hidden">{section.label.split(' ')[1] || section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <AnimatePresence mode="wait">
            {/* Overview Section */}
            {currentSection === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                    <h2 className="text-spy-red text-xl sm:text-2xl font-tech font-bold mb-6 tracking-wider">
                      [ MISSION OVERVIEW ]
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-gray-400 text-sm font-mono mb-2">LOCATION</div>
                        <div className="text-white text-lg font-tech">{MISSION_DETAILS.location}</div>
                      </div>

                      <div>
                        <div className="text-gray-400 text-sm font-mono mb-2">DURATION</div>
                        <div className="text-white text-lg font-tech">3 Days</div>
                      </div>

                      <div>
                        <div className="text-gray-400 text-sm font-mono mb-2">ARRIVAL</div>
                        <div className="text-white text-lg font-tech">
                          {MISSION_DETAILS.startDate}, {MISSION_DETAILS.year}
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-400 text-sm font-mono mb-2">DEPARTURE</div>
                        <div className="text-white text-lg font-tech">
                          {MISSION_DETAILS.endDate}, {MISSION_DETAILS.year}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="text-gray-400 text-sm font-mono mb-2">WEATHER CONDITIONS</div>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">❄️</span>
                          <div>
                            <div className="text-white text-lg font-tech">{MISSION_DETAILS.temperature}</div>
                            <div className="text-yellow-500 text-xs font-mono">⚠ EXTREME COLD WARNING</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mission Site Details */}
                  <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                    <h3 className="text-spy-red text-lg font-mono mb-4 tracking-wider">
                      [ MISSION SITE ]
                    </h3>
                    <div className="text-gray-300 space-y-3 leading-relaxed">
                      <p>The operation will take place at a remote safehouse deep in the woods outside Montréal.</p>
                      <p>Conditions will be harsh, secrecy is paramount, and the bonds of brotherhood will be tested.</p>
                      <p className="text-spy-red font-bold">Prepare for three days of unpredictable field activity.</p>
                    </div>
                  </div>

                  {/* Audio Briefing */}
                  <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                    <h3 className="text-spy-red text-lg font-mono mb-4 tracking-wider">
                      [ AUDIO BRIEFING ]
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <button
                        onClick={onReplayBriefing}
                        className="flex items-center gap-3 px-6 py-4 font-mono font-bold text-lg transition-all border-2 rounded w-full sm:w-auto justify-center bg-black/50 text-spy-red border-spy-red hover:bg-spy-red hover:text-white hover:border-white"
                      >
                        <span className="text-2xl">▶</span>
                        <span>REPLAY FULL BRIEFING</span>
                      </button>
                      <div className="text-gray-400 text-sm font-mono text-center sm:text-left">
                        Replay the original mission briefing (audio & video)
                      </div>
                    </div>
                  </div>

                  {/* SCIF Channel */}
                  <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                    <h3 className="text-spy-red text-lg font-mono mb-4 tracking-wider">
                      [ SECURE COMMUNICATIONS ]
                    </h3>
                    <div className="space-y-4">
                      <div className="text-gray-300 text-sm leading-relaxed">
                        All operatives must join the SCIF (Sensitive Compartmented Information Facility) channel for mission-critical communications and real-time intelligence updates.
                      </div>
                      <a
                        href="https://chat.whatsapp.com/Ck373wwKOyJ08QNo5eXzHp?mode=wwt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-4 font-mono font-bold text-lg transition-all border-2 rounded w-full sm:w-auto justify-center bg-green-700 text-white border-white hover:bg-green-600 hover:scale-105 shadow-lg"
                      >
                        <span className="text-2xl">💬</span>
                        <span>JOIN SCIF CHANNEL</span>
                      </a>
                      <div className="text-gray-500 text-xs font-mono text-center sm:text-left">
                        Encrypted communications via WhatsApp
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Pre-Mission Checklist Section */}
            {currentSection === 'checklist' && (
              <motion.div
                key="checklist"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  {/* Team Objectives */}
                  <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                    <h2 className="text-spy-red text-xl sm:text-2xl font-tech font-bold mb-6 tracking-wider">
                      [ TEAM OBJECTIVES ]
                    </h2>
                    <div className="space-y-3">
                      {/* Objective 1 - Complete */}
                      <div className="flex items-start gap-4 p-4 bg-green-900/20 border-l-4 border-green-500 rounded">
                        <div className="text-green-500 text-2xl mt-1 flex-shrink-0">✓</div>
                        <div className="flex-1">
                          <div className="text-white font-tech text-base mb-1">Secure Safehouse</div>
                          <div className="text-green-400 text-xs font-mono">COMPLETED</div>
                        </div>
                      </div>

                      {/* Objective 2 - Complete */}
                      <div className="flex items-start gap-4 p-4 bg-green-900/20 border-l-4 border-green-500 rounded">
                        <div className="text-green-500 text-2xl mt-1 flex-shrink-0">✓</div>
                        <div className="flex-1">
                          <div className="text-white font-tech text-base mb-1">Secure Transportation from Airstrip to Safehouse</div>
                          <div className="text-green-400 text-xs font-mono">COMPLETED</div>
                        </div>
                      </div>

                      {/* Objective 3 - Pending */}
                      <div className="flex items-start gap-4 p-4 bg-black/40 border-l-4 border-spy-red rounded">
                        <div className="text-gray-500 text-2xl mt-1 flex-shrink-0">○</div>
                        <div className="flex-1">
                          <div className="text-white font-tech text-base mb-1">Schedule Simulation Training</div>
                          <div className="text-yellow-500 text-xs font-mono">PENDING</div>
                        </div>
                      </div>

                      {/* Objective 4 - Pending */}
                      <div className="flex items-start gap-4 p-4 bg-black/40 border-l-4 border-spy-red rounded">
                        <div className="text-gray-500 text-2xl mt-1 flex-shrink-0">○</div>
                        <div className="flex-1">
                          <div className="text-white font-tech text-base mb-1">Secure Additional Gear</div>
                          <div className="text-yellow-500 text-xs font-mono">PENDING</div>
                        </div>
                      </div>

                      {/* Objective 5 - Pending */}
                      <div className="flex items-start gap-4 p-4 bg-black/40 border-l-4 border-spy-red rounded">
                        <div className="text-gray-500 text-2xl mt-1 flex-shrink-0">○</div>
                        <div className="flex-1">
                          <div className="text-white font-tech text-base mb-1">Secure Drinking Apparatus (Steins)</div>
                          <div className="text-yellow-500 text-xs font-mono">PENDING</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-spy-red/50">
                      <div className="flex items-center justify-between text-sm font-mono">
                        <span className="text-gray-400">PROGRESS:</span>
                        <span className="text-spy-red font-bold">2 / 5 COMPLETED</span>
                      </div>
                    </div>
                  </div>

                  {/* Agent Objectives */}
                  <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                    <h2 className="text-spy-red text-xl sm:text-2xl font-tech font-bold mb-6 tracking-wider">
                      [ AGENT OBJECTIVES ]
                    </h2>
                    <div className="space-y-3">
                      {/* Objective 1 */}
                      <div className="flex items-start gap-4 p-4 bg-black/40 border-l-4 border-spy-red rounded">
                        <div className="text-spy-red text-2xl mt-1 flex-shrink-0">▸</div>
                        <div className="flex-1">
                          <div className="text-white font-tech text-base mb-1">RSVP to Mission via SCIF Channel</div>
                          <div className="text-gray-400 text-sm">Confirm attendance and provide mission details in the WhatsApp group</div>
                        </div>
                      </div>

                      {/* Objective 2 */}
                      <div className="flex items-start gap-4 p-4 bg-black/40 border-l-4 border-spy-red rounded">
                        <div className="text-spy-red text-2xl mt-1 flex-shrink-0">▸</div>
                        <div className="flex-1">
                          <div className="text-white font-tech text-base mb-1">Secure Travel to Airstrip or Safehouse</div>
                          <div className="text-gray-400 text-sm">Book flights or arrange ground transportation</div>
                        </div>
                      </div>

                      {/* Objective 3 */}
                      <div className="flex items-start gap-4 p-4 bg-black/40 border-l-4 border-spy-red rounded">
                        <div className="text-spy-red text-2xl mt-1 flex-shrink-0">▸</div>
                        <div className="flex-1">
                          <div className="text-white font-tech text-base mb-1">Report Flight Numbers in SCIF Channel</div>
                          <div className="text-gray-400 text-sm">Drop your flight details in the WhatsApp group for coordination</div>
                        </div>
                      </div>

                      {/* Objective 4 */}
                      <div className="flex items-start gap-4 p-4 bg-black/40 border-l-4 border-spy-red rounded">
                        <div className="text-spy-red text-2xl mt-1 flex-shrink-0">▸</div>
                        <div className="flex-1">
                          <div className="text-white font-tech text-base mb-1">Secure Passport for Travel</div>
                          <div className="text-gray-400 text-sm">Ensure valid passport for cross-border operations</div>
                        </div>
                      </div>

                      {/* Objective 5 */}
                      <div className="flex items-start gap-4 p-4 bg-black/40 border-l-4 border-spy-red rounded">
                        <div className="text-spy-red text-2xl mt-1 flex-shrink-0">▸</div>
                        <div className="flex-1">
                          <div className="text-white font-tech text-base mb-1">Join Secure Communication Channel (SCIF)</div>
                          <div className="text-gray-400 text-sm">Connect to the encrypted WhatsApp channel for mission updates</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-yellow-500 text-xs font-mono bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
                      ℹ️ Complete all agent objectives prior to mission start date
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mission Gear Section */}
            {currentSection === 'gear' && (
              <motion.div
                key="gear"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                  <h2 className="text-spy-red text-xl sm:text-2xl font-tech font-bold mb-6 tracking-wider">
                    [ MISSION GEAR ]
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white text-lg font-mono mb-3 border-b border-spy-red/50 pb-2">
                        ESSENTIAL EQUIPMENT
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span><strong>Cold Weather Gear:</strong> Heavy winter jacket, thermal layers, insulated boots</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span><strong>Winter Accessories:</strong> Gloves, hat, scarf, hand warmers</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span><strong>Field Clothing:</strong> Multiple changes of warm clothes for indoor and outdoor activities</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span><strong>Personal Items:</strong> Toiletries, medications, personal electronics</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span><strong>Aquatic Thermal Gear:</strong> Swimwear for heated water training exercises (hot tub ops)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-white text-lg font-mono mb-3 border-b border-spy-red/50 pb-2">
                        RECOMMENDED GEAR
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span>Flashlight or headlamp for nighttime operations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span>Water bottle or hydration system</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span>Snacks for extended field operations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span>Camera (GoPros or anything else to obtain surveillance)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-white text-lg font-mono mb-3 border-b border-spy-red/50 pb-2">
                        MORALE & PSYCHOLOGICAL WARFARE EQUIPMENT
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span><strong>Card Games & Strategy Tools:</strong> Playing cards, board games, party games for team bonding and competitive intelligence gathering</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span><strong>Props & Disguises:</strong> Costumes, funny hats, sunglasses, or any items that could facilitate undercover shenanigans</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-spy-red mt-1">▸</span>
                          <span><strong>Sports Equipment:</strong> Frisbees, footballs, or winter sports gear for outdoor tactical exercises</span>
                        </li>
                      </ul>
                      <div className="mt-3 text-yellow-500 text-sm font-mono bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
                        ⚡ MISSION DIRECTIVE: Maximum shenanigans encouraged. Bring anything that will create memorable moments and legendary stories.
                      </div>
                    </div>

                    <div className="bg-spy-red/10 border border-spy-red p-4 rounded">
                      <div className="text-yellow-500 font-mono text-sm mb-2">⚠ CRITICAL NOTICE</div>
                      <div className="text-gray-300 text-sm">
                        Temperatures near 7°F (-14°C) are forecasted. Pack accordingly. The mission cannot be compromised due to inadequate cold weather preparation.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mission Funding Section */}
            {currentSection === 'funding' && (
              <motion.div
                key="funding"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                  <h2 className="text-spy-red text-xl sm:text-2xl font-tech font-bold mb-6 tracking-wider">
                    [ MISSION FUNDING ]
                  </h2>

                  <div className="space-y-6">
                    {/* Total Cost */}
                    <div className="bg-black/60 border-2 border-spy-red p-6 rounded">
                      <div className="text-gray-400 text-sm font-mono mb-2">TOTAL HARD COST PER OPERATIVE</div>
                      <div className="text-spy-red text-5xl font-tech font-bold mb-2">$410</div>
                      <div className="text-gray-400 text-sm">Breakdown of mission expenses detailed below</div>
                    </div>

                    {/* Cost Breakdown */}
                    <div>
                      <h3 className="text-white text-lg font-mono mb-4 border-b border-spy-red/50 pb-2">
                        COST BREAKDOWN
                      </h3>
                      <div className="space-y-4">
                        {/* Safehouse */}
                        <div className="bg-black/40 border-l-4 border-spy-red pl-4 py-3">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1">
                              <div className="text-white font-tech text-base mb-1">Safehouse Accommodations</div>
                              <div className="text-gray-400 text-sm">
                                $2,037 total for 3 nights (7 beds, capacity up to 9 operatives)
                              </div>
                            </div>
                            <div className="text-spy-red font-mono font-bold text-xl whitespace-nowrap">
                              $227
                            </div>
                          </div>
                        </div>

                        {/* Primary Activity */}
                        <div className="bg-black/40 border-l-4 border-spy-red pl-4 py-3">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1">
                              <div className="text-white font-tech text-base mb-1">Primary Operation Activity</div>
                              <div className="text-gray-400 text-sm">
                                2.5-hour classified activity
                              </div>
                            </div>
                            <div className="text-spy-red font-mono font-bold text-xl whitespace-nowrap">
                              $100
                            </div>
                          </div>
                        </div>

                        {/* Vehicle Transport */}
                        <div className="bg-black/40 border-l-4 border-spy-red pl-4 py-3">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1">
                              <div className="text-white font-tech text-base mb-1">Ground Transportation</div>
                              <div className="text-gray-400 text-sm">
                                Two 4WD SUVs for winter operations ($400 total)
                              </div>
                            </div>
                            <div className="text-spy-red font-mono font-bold text-xl whitespace-nowrap">
                              $45
                            </div>
                          </div>
                        </div>

                        {/* Shared Activities & Items */}
                        <div className="bg-black/40 border-l-4 border-spy-red pl-4 py-3">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1">
                              <div className="text-white font-tech text-base mb-1">Shared Activities & Supplies</div>
                              <div className="text-gray-400 text-sm">
                                Various mission items and activities (~$300 total)
                              </div>
                            </div>
                            <div className="text-spy-red font-mono font-bold text-xl whitespace-nowrap">
                              ~$33
                            </div>
                          </div>
                        </div>

                        {/* Food & Provisions */}
                        <div className="bg-black/40 border-l-4 border-spy-red pl-4 py-3">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1">
                              <div className="text-white font-tech text-base mb-1">Food, Drinks & Fuel</div>
                              <div className="text-gray-400 text-sm">
                                Primarily cooking at safehouse, one meal out in Montréal
                              </div>
                            </div>
                            <div className="text-spy-red font-mono font-bold text-xl whitespace-nowrap">
                              TBD
                            </div>
                          </div>
                        </div>

                        {/* Travel - TBD */}
                        <div className="bg-black/40 border-l-4 border-yellow-500 pl-4 py-3">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1">
                              <div className="text-white font-tech text-base mb-1">Personal Travel to Montréal</div>
                              <div className="text-gray-400 text-sm">
                                This mission cannot be tied back to the department. Agents will need to secure their own travel.
                              </div>
                            </div>
                            <div className="text-yellow-500 font-mono font-bold text-xl whitespace-nowrap">
                              TBD
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-3">
                      <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded">
                        <div className="text-yellow-500 text-xs font-mono mb-2">⚡ OPTIONAL ACTIVITIES</div>
                        <div className="text-gray-300 text-sm">
                          Additional winter outdoor activities and time in Montréal available. Operatives may choose to participate in optional activities at additional cost.
                        </div>
                      </div>

                      <div className="bg-spy-red/10 border border-spy-red p-4 rounded">
                        <div className="text-gray-300 text-sm">
                          <strong className="text-spy-red">NOTE:</strong> Coordinate with fellow agents for potential cost-sharing opportunities on travel and ground transportation.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Schedule Section */}
            {currentSection === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                    <h2 className="text-spy-red text-xl sm:text-2xl font-tech font-bold mb-6 tracking-wider">
                      [ MISSION SCHEDULE ]
                    </h2>
                    <div className="text-yellow-500 text-xs font-mono mb-6 bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
                      ⚠ CLASSIFIED OPERATIONS - EVENT DETAILS ENCRYPTED
                    </div>
                  </div>

                  {/* Day-by-day schedule */}
                  {missionSchedule.map((day, dayIndex) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: dayIndex * 0.1 }}
                      className="border-4 border-spy-red bg-black/80 shadow-2xl overflow-hidden"
                    >
                      {/* Day Header */}
                      <div className="bg-spy-red p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white text-xl font-tech font-bold">
                              {day.date}, 2026
                            </div>
                            <div className="text-white/80 text-sm font-mono">
                              {day.day.toUpperCase()}
                            </div>
                          </div>
                          <div className="text-white text-2xl">
                            📅
                          </div>
                        </div>
                      </div>

                      {/* Events List */}
                      <div className="p-6">
                        {day.events.length === 0 ? (
                          <div className="text-gray-500 text-center py-8 font-mono text-sm">
                            NO SCHEDULED OPERATIONS
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {day.events.map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className="border-l-4 border-spy-red pl-4 py-2 bg-black/40 hover:bg-black/60 transition-all"
                              >
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                      <div className="text-spy-red font-mono font-bold text-lg">
                                        {event.time}
                                      </div>
                                      {event.classification && (
                                        <span className={`text-xs font-mono px-2 py-1 rounded border ${
                                          event.classification === 'top-secret'
                                            ? 'bg-red-900/30 border-red-500 text-red-400'
                                            : event.classification === 'classified'
                                            ? 'bg-orange-900/30 border-orange-500 text-orange-400'
                                            : 'bg-yellow-900/30 border-yellow-500 text-yellow-400'
                                        }`}>
                                          {event.classification.toUpperCase()}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-white font-tech text-base mb-1 break-words">
                                      {event.title}
                                    </div>
                                    {event.description && (
                                      <div className="text-gray-400 text-sm break-words">
                                        {event.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* TBD Events Section */}
                  <div className="border-4 border-yellow-500 bg-black/80 shadow-2xl overflow-hidden">
                    {/* TBD Header */}
                    <div className="bg-yellow-500 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-black text-xl font-tech font-bold">
                            OPERATIONS - TIME TBD
                          </div>
                          <div className="text-black/80 text-sm font-mono">
                            TIMING TO BE DETERMINED
                          </div>
                        </div>
                        <div className="text-black text-2xl">
                          ⏰
                        </div>
                      </div>
                    </div>

                    {/* TBD Events List */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {tbdEvents.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className="border-l-4 border-yellow-500 pl-4 py-2 bg-black/40 hover:bg-black/60 transition-all"
                          >
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                  <div className="text-yellow-500 font-mono font-bold text-lg">
                                    {event.time}
                                  </div>
                                  {event.classification && (
                                    <span className={`text-xs font-mono px-2 py-1 rounded border ${
                                      event.classification === 'top-secret'
                                        ? 'bg-red-900/30 border-red-500 text-red-400'
                                        : event.classification === 'classified'
                                        ? 'bg-orange-900/30 border-orange-500 text-orange-400'
                                        : 'bg-yellow-900/30 border-yellow-500 text-yellow-400'
                                    }`}>
                                      {event.classification.toUpperCase()}
                                    </span>
                                  )}
                                </div>
                                <div className="text-white font-tech text-base mb-1 break-words">
                                  {event.title}
                                </div>
                                {event.description && (
                                  <div className="text-gray-400 text-sm break-words">
                                    {event.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-yellow-500 text-xs font-mono bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
                        ℹ️ These operations will be scheduled based on team availability and weather conditions. Stand by for further intel.
                      </div>
                    </div>
                  </div>

                  {/* Quartermaster Note */}
                  <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                    <h3 className="text-spy-red text-lg font-mono mb-4 tracking-wider">
                      [ QUARTERMASTER NOTICE ]
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <p className="leading-relaxed">
                        Agents who have additional mission objectives to add should report them to the <strong className="text-white">Quartermaster, C</strong>.
                      </p>
                      <p className="leading-relaxed">
                        Please share at least timing information for planning purposes. If you are not at liberty to discuss further operational details, timing alone will suffice for coordination.
                      </p>
                      <div className="text-spy-red text-sm font-mono bg-spy-red/10 border border-spy-red/30 p-3 rounded">
                        📋 Submit mission objectives via SCIF channel or direct communication with Quartermaster C
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="border-2 border-spy-red/50 bg-black/60 p-4">
                    <div className="text-gray-400 text-xs font-mono mb-3">CLASSIFICATION LEVELS:</div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-1 rounded border bg-red-900/30 border-red-500 text-red-400">
                          TOP-SECRET
                        </span>
                        <span className="text-gray-500 text-xs">Critical operations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-1 rounded border bg-orange-900/30 border-orange-500 text-orange-400">
                          CLASSIFIED
                        </span>
                        <span className="text-gray-500 text-xs">Restricted access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-1 rounded border bg-yellow-900/30 border-yellow-500 text-yellow-400">
                          CONFIDENTIAL
                        </span>
                        <span className="text-gray-500 text-xs">Limited distribution</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Operatives Section */}
            {currentSection === 'operatives' && (
              <motion.div
                key="operatives"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-4 border-spy-red bg-black/80 p-6 shadow-2xl">
                  <h2 className="text-spy-red text-xl sm:text-2xl font-tech font-bold mb-6 tracking-wider">
                    [ CONFIRMED OPERATIVES ]
                  </h2>

                  <div className="text-center py-8">
                    <div className="text-gray-300 mb-6 leading-relaxed">
                      <p className="mb-4">
                        The operative roster and mission coordination are now managed through the secure communications channel.
                      </p>
                      <p className="text-spy-red font-bold">
                        Join the SCIF channel to see confirmed operatives and coordinate with the team.
                      </p>
                    </div>

                    <a
                      href="https://chat.whatsapp.com/Ck373wwKOyJ08QNo5eXzHp?mode=wwt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 font-mono font-bold text-lg transition-all border-2 rounded bg-green-700 text-white border-white hover:bg-green-600 hover:scale-105 shadow-lg"
                    >
                      <span className="text-2xl">💬</span>
                      <span>JOIN SCIF CHANNEL</span>
                    </a>

                    <div className="text-gray-500 text-xs font-mono mt-4">
                      View roster and coordinate via WhatsApp
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
