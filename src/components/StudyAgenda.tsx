import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, BookOpen, RotateCcw, CheckCircle } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const StudyAgenda: React.FC = () => {
  const { agenda } = useGameStore()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return BookOpen
      case 'review': return RotateCcw
      case 'test': return Calendar
      default: return Clock
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'study': return 'from-blue-500 to-blue-600'
      case 'review': return 'from-orange-500 to-orange-600'
      case 'test': return 'from-red-500 to-red-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case 'study': return 'Studie'
      case 'review': return 'Herhaling'
      case 'test': return 'Toets'
      default: return 'Activiteit'
    }
  }

  const sortedAgenda = [...agenda].sort((a, b) => a.date.getTime() - b.date.getTime())
  const upcomingItems = sortedAgenda.filter(item => !item.completed && item.date > new Date())
  const todayItems = sortedAgenda.filter(item => {
    const today = new Date()
    const itemDate = new Date(item.date)
    return itemDate.toDateString() === today.toDateString()
  })

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Calendar className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Mijn Agenda</h1>
        <p className="text-xl text-gray-600">Jouw gepersonaliseerde studieplanning</p>
      </div>

      {/* Today's Items */}
      {todayItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            Vandaag
          </h2>
          <div className="space-y-4">
            {todayItems.map((item) => {
              const Icon = getTypeIcon(item.type)
              return (
                <motion.div
                  key={item.id}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    item.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(item.type)} rounded-xl flex items-center justify-center`}>
                      {item.completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                          {getTypeName(item.type)}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{item.subject}</span>
                      </div>
                      <h3 className={`text-lg font-semibold ${
                        item.completed ? 'text-green-800 line-through' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    
                    {!item.completed && (
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                        Start
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Upcoming Items */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-500" />
          Komende Activiteiten
        </h2>
        
        {upcomingItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Geen geplande activiteiten</h3>
            <p className="text-gray-500">Start een studiesessie om automatisch herhalingen in te plannen!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingItems.slice(0, 10).map((item) => {
              const Icon = getTypeIcon(item.type)
              const isToday = new Date(item.date).toDateString() === new Date().toDateString()
              const isTomorrow = new Date(item.date).toDateString() === new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()
              
              return (
                <motion.div
                  key={item.id}
                  className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(item.type)} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                          {getTypeName(item.type)}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{item.subject}</span>
                        {item.type === 'review' && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                            Vergeetcurve
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {isToday ? 'Vandaag' : 
                             isTomorrow ? 'Morgen' : 
                             item.date.toLocaleDateString('nl-NL', { 
                               weekday: 'short', 
                               month: 'short', 
                               day: 'numeric' 
                             })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {item.date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.date.toLocaleDateString('nl-NL', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudyAgenda