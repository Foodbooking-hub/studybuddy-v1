import React from 'react'
import { motion } from 'framer-motion'
import { Target, Trophy, Clock, CheckCircle, Star, Flame, Zap } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const QuestPanel: React.FC = () => {
  const { dailyQuests, completeQuest } = useGameStore()

  const getQuestIcon = (questId: string) => {
    if (questId.includes('grind')) return Flame
    if (questId.includes('screenshot')) return Target
    if (questId.includes('quiz')) return Zap
    if (questId.includes('streak')) return Star
    return Trophy
  }

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100
    if (percentage >= 100) return 'from-green-500 to-emerald-500'
    if (percentage >= 50) return 'from-yellow-500 to-orange-500'
    return 'from-purple-500 to-pink-500'
  }

  const getQuestEmoji = (questId: string) => {
    if (questId.includes('grind')) return '💪'
    if (questId.includes('screenshot')) return '📸'
    if (questId.includes('quiz')) return '🧠'
    if (questId.includes('streak')) return '🔥'
    return '🎯'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Dagelijkse Quests 🎯</h3>
          <p className="text-gray-600">Grind die XP en coins!</p>
        </div>
      </div>

      <div className="space-y-4">
        {dailyQuests.map((quest) => {
          const Icon = getQuestIcon(quest.id)
          const progressPercentage = (quest.progress / quest.target) * 100
          const isCompleted = quest.completed || quest.progress >= quest.target

          return (
            <motion.div
              key={quest.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:border-purple-300'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isCompleted ? 'bg-green-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <Icon className="w-5 h-5 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getQuestEmoji(quest.id)}</span>
                    <h4 className={`font-semibold ${
                      isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
                    }`}>
                      {quest.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{quest.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Voortgang</span>
                      <span>{quest.progress}/{quest.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(quest.progress, quest.target)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  {/* Rewards */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">+{quest.reward.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">🪙</span>
                        <span className="font-medium">+{quest.reward.coins}</span>
                      </div>
                    </div>
                    
                    {isCompleted && !quest.completed && (
                      <button
                        onClick={() => completeQuest(quest.id)}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Claim! 🎉
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Daily Reset Timer */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Nieuwe quests over:</span>
          </div>
          <span className="text-lg font-bold text-purple-600">
            {new Date(Date.now() + 24 * 60 * 60 * 1000 - (Date.now() % (24 * 60 * 60 * 1000))).toLocaleTimeString('nl-NL', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default QuestPanel