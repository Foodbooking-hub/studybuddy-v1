import React from 'react'
import { motion } from 'framer-motion'

interface AvatarProps {
  level: number
  xp: number
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ 
  level, 
  xp, 
  className = '', 
  size = 'md',
  animated = true 
}) => {
  const avatarStages = [
    { emoji: '🌱', name: 'Seed', color: 'from-green-400 to-emerald-500' },
    { emoji: '🌿', name: 'Sprout', color: 'from-green-500 to-teal-500' },
    { emoji: '🦊', name: 'Focus Fox', color: 'from-orange-400 to-red-500' },
    { emoji: '🦉', name: 'Wisdom Owl', color: 'from-purple-400 to-indigo-500' },
    { emoji: '🚀', name: 'Astro Nerd', color: 'from-blue-400 to-cyan-500' }
  ]

  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-20 h-20 text-4xl',
    lg: 'w-32 h-32 text-6xl',
    xl: 'w-40 h-40 text-8xl'
  }

  const currentStage = avatarStages[Math.min(Math.floor(level / 5), avatarStages.length - 1)]
  const progressToNextLevel = ((xp % 500) / 500) * 100

  const avatarVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    },
    bounce: {
      y: [-5, 0, -5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br ${currentStage.color} 
          rounded-full flex items-center justify-center 
          shadow-lg border-4 border-white
          ${animated ? 'animate-pulse-glow' : ''}
        `}
        variants={avatarVariants}
        animate={animated ? "bounce" : "idle"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="filter drop-shadow-sm">
          {currentStage.emoji}
        </span>
      </motion.div>
      
      {/* Level indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="bg-white rounded-full px-2 py-1 shadow-md border">
          <span className="text-xs font-bold text-gray-700">
            Lvl {level}
          </span>
        </div>
      </div>

      {/* Progress ring */}
      <div className="absolute inset-0 -m-1">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${progressToNextLevel * 2.83} 283`}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default Avatar