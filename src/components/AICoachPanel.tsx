import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Lightbulb, Zap, Loader2, RefreshCw } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { groqService } from '../services/groqService'
import toast from 'react-hot-toast'

const AICoachPanel: React.FC = () => {
  const { level, streak, totalStudyTime } = useGameStore()
  const [motivationalMessage, setMotivationalMessage] = useState('')
  const [personalizedTips, setPersonalizedTips] = useState<string[]>([])
  const [isLoadingMessage, setIsLoadingMessage] = useState(false)
  const [isLoadingTips, setIsLoadingTips] = useState(false)

  useEffect(() => {
    generateMotivationalMessage()
    generatePersonalizedTips()
  }, [level, streak])

  const generateMotivationalMessage = async () => {
    setIsLoadingMessage(true)
    try {
      const message = await groqService.generateMotivationalMessage('session_start', {
        level,
        streak,
        sessionTime: totalStudyTime
      })
      setMotivationalMessage(message)
    } catch (error) {
      console.error('Error generating motivational message:', error)
      setMotivationalMessage('Je bent een absolute legend! Keep grinding! 🔥💪')
    } finally {
      setIsLoadingMessage(false)
    }
  }

  const generatePersonalizedTips = async () => {
    setIsLoadingTips(true)
    try {
      const tips = await groqService.generatePersonalizedTips(
        ['Wiskunde', 'Nederlands', 'Engels'], // Deze zouden uit user profile moeten komen
        ['Pomodoro techniek', 'Flashcards'], // User study habits
        ['Concentratie', 'Tijdmanagement'], // User weaknesses
        level
      )
      setPersonalizedTips(tips)
    } catch (error) {
      console.error('Error generating tips:', error)
      setPersonalizedTips([
        "Plan je studiesessies van tevoren in je agenda 📅",
        "Gebruik de Pomodoro techniek: 25 min studeren, 5 min pauze 🍅",
        "Maak samenvattingen in je eigen woorden 📝"
      ])
    } finally {
      setIsLoadingTips(false)
    }
  }

  const handleRefreshMessage = () => {
    generateMotivationalMessage()
    toast.success('Nieuwe motivatie geladen! 🚀')
  }

  const handleRefreshTips = () => {
    generatePersonalizedTips()
    toast.success('Nieuwe tips geladen! 💡')
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">AI Coach 🤖</h3>
          <p className="text-gray-600">Powered by Groq AI</p>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            Motivatie Boost
          </h4>
          <button
            onClick={handleRefreshMessage}
            disabled={isLoadingMessage}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingMessage ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <motion.div
          className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isLoadingMessage ? (
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI genereert motivatie...</span>
            </div>
          ) : (
            <p className="text-gray-800 font-medium">{motivationalMessage}</p>
          )}
        </motion.div>
      </div>

      {/* Personalized Tips */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-blue-500" />
            Persoonlijke Tips
          </h4>
          <button
            onClick={handleRefreshTips}
            disabled={isLoadingTips}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingTips ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {isLoadingTips ? (
              <motion.div
                className="flex items-center gap-2 text-gray-600 p-4 bg-gray-50 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI genereert tips...</span>
              </motion.div>
            ) : (
              personalizedTips.map((tip, index) => (
                <motion.div
                  key={index}
                  className="p-3 bg-blue-50 rounded-xl border border-blue-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-blue-800 text-sm font-medium">{tip}</p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* AI Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Powered by Groq AI</span>
          <span>Response time: ~2s</span>
        </div>
      </div>
    </div>
  )
}

export default AICoachPanel