import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, BookOpen, Calendar, 
  Flame, Star, Gift, Settings, Bell,
  TrendingUp, Clock, Award, ShoppingBag,
  Play, Brain
} from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import BuddyAvatar from '../components/BuddyAvatar'
import StudyShop from '../components/StudyShop'
import QuestPanel from '../components/QuestPanel'
import FocusMode from '../components/FocusMode'
import StudyAgenda from '../components/StudyAgenda'
import StatsCard from '../components/StatsCard'
import AICoachPanel from '../components/AICoachPanel'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'shop' | 'agenda'>('dashboard')
  const { 
    level, 
    xp, 
    studyCoins, 
    streak, 
    totalStudyTime, 
    buddy,
    focusMode,
    startSession,
    currentSession
  } = useGameStore()

  // Force reset focus mode on component mount to ensure clean state
  useEffect(() => {
    const store = useGameStore.getState()
    if (store.focusMode && !store.currentSession) {
      // If focus mode is on but no session exists, turn it off
      store.toggleFocusMode()
    }
  }, [])

  const subjects = [
    { id: 1, name: 'Wiskunde', icon: '📐', progress: 75, color: 'blue' },
    { id: 2, name: 'Nederlands', icon: '📚', progress: 60, color: 'green' },
    { id: 3, name: 'Engels', icon: '🇬🇧', progress: 85, color: 'purple' },
    { id: 4, name: 'Geschiedenis', icon: '🏛️', progress: 45, color: 'orange' }
  ]

  const achievements = [
    { id: 1, title: `${buddy.evolution.name} bereikt!`, description: 'Je buddy is geëvolueerd', icon: '🏆', new: true },
    { id: 2, title: `${streak}-dagen streak`, description: 'Geweldig volgehouden!', icon: '🔥', new: false },
    { id: 3, title: 'Eerste 100 XP', description: 'Goed begin!', icon: '⭐', new: false }
  ]

  const handleStartSession = (subject: string) => {
    startSession(subject)
  }

  const tabContent = {
    dashboard: (
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full transform translate-x-32 -translate-y-32"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Hallo! 🎉
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Je {buddy.evolution.name} is klaar om te studeren!
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-6 h-6 text-orange-500" />
                    <span className="text-3xl font-bold text-orange-500">{streak}</span>
                  </div>
                  <p className="text-sm text-gray-600">dagen streak</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="group">
                  <BuddyAvatar 
                    size="lg" 
                    animated={true}
                    className="flex-shrink-0"
                  />
                </div>
                
                <div className="flex-1 grid grid-cols-2 gap-6">
                  <StatsCard
                    title="Totaal XP"
                    value={xp.toLocaleString()}
                    icon={Trophy}
                    color="blue"
                    trend={{ value: 12, isPositive: true }}
                  />
                  <StatsCard
                    title="StudyCoins"
                    value={studyCoins}
                    icon={Star}
                    color="yellow"
                    trend={{ value: 8, isPositive: true }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Play className="w-6 h-6 text-blue-500" />
              Start een Studiesessie
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <motion.button
                  key={subject.id}
                  onClick={() => handleStartSession(subject.name)}
                  className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 text-left group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                        {subject.name}
                      </h4>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${
                            subject.color === 'blue' ? 'from-blue-500 to-blue-600' :
                            subject.color === 'green' ? 'from-green-500 to-green-600' :
                            subject.color === 'purple' ? 'from-purple-500 to-purple-600' :
                            'from-orange-500 to-orange-600'
                          }`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{subject.progress}% voltooid</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StatsCard
              title="Vandaag Gestudeerd"
              value={`${Math.floor(totalStudyTime / 60)}m`}
              subtitle={`${totalStudyTime % 60}s`}
              icon={Clock}
              color="blue"
            />
            <StatsCard
              title="Level"
              value={level}
              subtitle={buddy.evolution.name}
              icon={Award}
              color="purple"
            />
            <StatsCard
              title="Gemiddelde Sessie"
              value="45m"
              subtitle="deze week"
              icon={TrendingUp}
              color="green"
            />
          </motion.div>
        </div>

        <div className="space-y-6">
          <QuestPanel />

          {/* AI Coach Panel */}
          <AICoachPanel />

          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Prestaties
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <motion.div 
                  key={achievement.id}
                  className={`p-4 rounded-xl relative ${
                    achievement.new ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {achievement.new && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Weekuitdaging
            </h3>
            <div className="space-y-3">
              <p className="text-purple-100">Studeer 5 uur deze week</p>
              <div className="w-full bg-purple-300/30 rounded-full h-3">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>3/5 uur</span>
                <span>🎁 50 StudyCoins</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    ),
    shop: <StudyShop />,
    agenda: <StudyAgenda />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AnimatePresence>
        {focusMode && currentSession && <FocusMode />}
      </AnimatePresence>

      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🦊</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">StudyBuddy AI</h1>
                <p className="text-sm text-gray-600">Level {level} • {buddy.evolution.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full shadow-lg">
                <span className="text-white font-bold">{studyCoins}</span>
                <span className="text-xs text-white font-medium">StudyCoins</span>
              </div>
              
              <button className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BookOpen },
              { id: 'shop', name: 'Study Shop', icon: ShoppingBag },
              { id: 'agenda', name: 'Mijn Agenda', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Dashboard