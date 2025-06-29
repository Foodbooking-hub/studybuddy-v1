import React from 'react'
import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow'
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
  className = ''
}) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-400 to-blue-600',
      text: 'text-blue-600',
      bgLight: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    green: {
      bg: 'from-green-400 to-green-600',
      text: 'text-green-600',
      bgLight: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    purple: {
      bg: 'from-purple-400 to-purple-600',
      text: 'text-purple-600',
      bgLight: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    orange: {
      bg: 'from-orange-400 to-orange-600',
      text: 'text-orange-600',
      bgLight: 'bg-orange-50',
      iconBg: 'bg-orange-100'
    },
    red: {
      bg: 'from-red-400 to-red-600',
      text: 'text-red-600',
      bgLight: 'bg-red-50',
      iconBg: 'bg-red-100'
    },
    yellow: {
      bg: 'from-yellow-400 to-yellow-600',
      text: 'text-yellow-600',
      bgLight: 'bg-yellow-50',
      iconBg: 'bg-yellow-100'
    }
  }

  const colors = colorClasses[color]

  return (
    <motion.div
      className={`
        bg-white rounded-2xl shadow-lg p-6 card-hover cursor-pointer
        border border-gray-100 relative overflow-hidden ${className}
      `}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.bg} opacity-5 rounded-full transform translate-x-16 -translate-y-16`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{trend.isPositive ? '↗' : '↘'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <div className={`text-3xl font-bold ${colors.text}`}>
            {value}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard