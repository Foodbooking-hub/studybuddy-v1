import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface StudyTimerProps {
  onTimeUpdate: (seconds: number) => void
  onXPGain: (xp: number) => void
}

const StudyTimer: React.FC<StudyTimerProps> = ({ onTimeUpdate, onXPGain }) => {
  const [isStudying, setIsStudying] = useState(false)
  const [timeStudied, setTimeStudied] = useState(0)
  const [isBreak, setIsBreak] = useState(false)
  const [breakTime, setBreakTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isStudying && !isBreak) {
      interval = setInterval(() => {
        setTimeStudied(prev => {
          const newTime = prev + 1
          onTimeUpdate(newTime)
          
          // Award XP every minute (60 seconds)
          if (newTime % 60 === 0) {
            onXPGain(10)
          }
          
          // Suggest break every 25 minutes (Pomodoro technique)
          if (newTime % 1500 === 0 && newTime > 0) {
            setIsBreak(true)
            setIsStudying(false)
          }
          
          return newTime
        })
      }, 1000)
    } else if (isBreak) {
      interval = setInterval(() => {
        setBreakTime(prev => {
          const newBreakTime = prev + 1
          // Auto-end break after 5 minutes
          if (newBreakTime >= 300) {
            setIsBreak(false)
            setBreakTime(0)
          }
          return newBreakTime
        })
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isStudying, isBreak, onTimeUpdate, onXPGain])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartStop = () => {
    if (isBreak) {
      setIsBreak(false)
      setBreakTime(0)
    }
    setIsStudying(!isStudying)
  }

  const handleReset = () => {
    setIsStudying(false)
    setTimeStudied(0)
    setIsBreak(false)
    setBreakTime(0)
  }

  const getTimerColor = () => {
    if (isBreak) return 'text-orange-500'
    if (isStudying) return 'text-green-500'
    return 'text-gray-700'
  }

  const getBackgroundGradient = () => {
    if (isBreak) return 'from-orange-400 to-yellow-400'
    if (isStudying) return 'from-green-400 to-emerald-400'
    return 'from-gray-400 to-gray-500'
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()} opacity-5`}></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {isBreak ? 'Pauze Tijd! ☕' : 'Studiesessie'}
          </h3>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={isBreak ? 'break' : 'study'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-7xl font-mono font-bold mb-4 ${getTimerColor()}`}
            >
              {formatTime(isBreak ? breakTime : timeStudied)}
            </motion.div>
          </AnimatePresence>
          
          <p className="text-gray-600 text-lg">
            {isBreak 
              ? 'Ontspan even, je hebt het verdiend!' 
              : isStudying 
                ? 'Je bent aan het studeren! 📚 Goed bezig!' 
                : 'Klaar om te beginnen?'
            }
          </p>
        </div>
        
        {/* Progress indicators */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Voortgang naar volgende pauze</span>
            <span>{Math.floor((timeStudied % 1500) / 60)}/25 min</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((timeStudied % 1500) / 1500) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={handleStartStop}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg
              transition-all duration-300 transform hover:scale-105 focus-ring
              ${isBreak 
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white'
                : isStudying 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isBreak ? (
              <>
                <Play className="w-6 h-6" />
                Verder Studeren
              </>
            ) : isStudying ? (
              <>
                <Pause className="w-6 h-6" />
                Pauzeren
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                Starten
              </>
            )}
          </motion.button>
          
          {isBreak && (
            <motion.button
              onClick={() => {
                setIsBreak(false)
                setBreakTime(0)
              }}
              className="flex items-center gap-2 px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus-ring"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Coffee className="w-5 h-5" />
              Pauze Overslaan
            </motion.button>
          )}
          
          <motion.button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus-ring"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </motion.button>
        </div>
        
        {/* Study stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">
              {Math.floor(timeStudied / 60)}
            </div>
            <div className="text-sm text-blue-600">Minuten</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">
              {Math.floor(timeStudied / 60) * 10}
            </div>
            <div className="text-sm text-green-600">XP Verdiend</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">
              {Math.floor(timeStudied / 1500)}
            </div>
            <div className="text-sm text-purple-600">Pomodoro's</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyTimer