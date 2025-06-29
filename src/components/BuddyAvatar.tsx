import React from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

interface BuddyAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  showLevel?: boolean
  className?: string
}

const BuddyAvatar: React.FC<BuddyAvatarProps> = ({ 
  size = 'md', 
  animated = true, 
  showLevel = true,
  className = '' 
}) => {
  const { level, xp, buddy } = useGameStore()
  
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-20 h-20 text-4xl',
    lg: 'w-32 h-32 text-6xl',
    xl: 'w-40 h-40 text-8xl'
  }

  const progressToNextLevel = ((xp % 100) / 100) * 100

  const avatarVariants = {
    idle: {
      scale: [1, 1.05, 1],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    bounce: {
      y: [0, -8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    excited: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
        repeat: 3
      }
    }
  }

  const getMoodEffect = () => {
    switch (buddy.mood) {
      case 'excited':
        return 'animate-pulse shadow-lg shadow-yellow-400/50'
      case 'fire':
        return 'animate-pulse shadow-lg shadow-red-400/50'
      case 'focused':
        return 'shadow-lg shadow-blue-400/50'
      default:
        return ''
    }
  }

  const getAccessoryEmoji = (accessoryId: string) => {
    const accessories: Record<string, string> = {
      'gaming-headset': '🎧',
      'vr-goggles': '🥽',
      'snapback': '🧢',
      'airpods': '🎵',
      'chain': '⛓️',
      'crown': '👑'
    }
    return accessories[accessoryId] || ''
  }

  const getPetEmoji = (petId: string) => {
    const pets: Record<string, string> = {
      'cat': '🐱',
      'dragon': '🐉',
      'unicorn': '🦄'
    }
    return pets[petId] || ''
  }

  return (
    <div className={`relative group ${className}`}>
      <motion.div
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br ${buddy.evolution.color} 
          rounded-full flex items-center justify-center 
          shadow-lg border-4 border-white relative overflow-hidden
          ${getMoodEffect()}
        `}
        variants={avatarVariants}
        animate={animated ? (buddy.mood === 'excited' ? 'excited' : 'bounce') : 'idle'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Main Avatar */}
        <span className="filter drop-shadow-sm relative z-10">
          {buddy.evolution.emoji}
        </span>
        
        {/* Accessories */}
        {buddy.accessories.map((accessoryId, index) => (
          <div 
            key={accessoryId}
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              transform: `translate(${index * 3}px, ${index * -3}px)`,
              zIndex: 20 + index 
            }}
          >
            <span className="text-lg filter drop-shadow-sm">
              {getAccessoryEmoji(accessoryId)}
            </span>
          </div>
        ))}

        {/* Mood indicator */}
        {buddy.mood === 'fire' && (
          <div className="absolute -top-2 -right-2 animate-bounce">
            <span className="text-lg">🔥</span>
          </div>
        )}
        
        {buddy.mood === 'excited' && (
          <div className="absolute -top-2 -right-2 animate-spin">
            <span className="text-lg">⭐</span>
          </div>
        )}
      </motion.div>
      
      {/* Pets floating around */}
      {buddy.pets.map((petId, index) => (
        <motion.div
          key={petId}
          className="absolute -top-4 -right-4"
          animate={{
            x: [0, 10, 0, -10, 0],
            y: [0, -5, -10, -5, 0],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5
          }}
        >
          <span className="text-2xl filter drop-shadow-sm">
            {getPetEmoji(petId)}
          </span>
        </motion.div>
      ))}
      
      {/* Level indicator */}
      {showLevel && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-3 py-1 shadow-md border-2 border-white">
            <span className="text-xs font-bold text-white">
              Lvl {level}
            </span>
          </div>
        </div>
      )}

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
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Evolution name tooltip */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
        <div className="font-bold">{buddy.evolution.name}</div>
        <div className="text-gray-300">{buddy.evolution.vibe}</div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  )
}

export default BuddyAvatar