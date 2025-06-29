import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Square, Volume2, Target, Brain, Flame, Camera, Upload, CheckCircle, X, Loader2 } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { groqService } from '../services/groqService'
import toast from 'react-hot-toast'

const FocusMode: React.FC = () => {
  const { currentSession, stopSession, updateQuestProgress, level } = useGameStore()
  const [sessionTime, setSessionTime] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'forest' | 'lofi'>('none')
  const [sessionGoals, setSessionGoals] = useState<string[]>([])
  const [newGoal, setNewGoal] = useState('')
  const [completedGoals, setCompletedGoals] = useState<boolean[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [studyType, setStudyType] = useState<'huiswerk' | 'toets' | 'examen' | 'herhaling'>('huiswerk')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [imageDescription, setImageDescription] = useState('')

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && currentSession) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, currentSession])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setSessionGoals([...sessionGoals, newGoal.trim()])
      setCompletedGoals([...completedGoals, false])
      setNewGoal('')
    }
  }

  const toggleGoalCompletion = (index: number) => {
    const newCompleted = [...completedGoals]
    newCompleted[index] = !newCompleted[index]
    setCompletedGoals(newCompleted)
  }

  const handleEndSession = () => {
    setIsRunning(false)
    setShowUploadModal(true)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeWithGroqAI = async () => {
    if (!uploadedImage || !imageDescription.trim()) {
      toast.error('Voeg eerst een beschrijving toe van je studiemateriaal!')
      return
    }

    setIsAnalyzing(true)
    
    try {
      const analysis = await groqService.analyzeStudyMaterial(
        currentSession?.subject || 'Algemeen',
        studyType,
        imageDescription,
        level
      )
      
      setAiAnalysis(analysis)
      toast.success('AI analyse voltooid! 🤖✨')
      
    } catch (error) {
      console.error('AI Analysis Error:', error)
      toast.error('AI analyse mislukt. Probeer het opnieuw!')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFinishSession = () => {
    updateQuestProgress('daily-screenshot', 1)
    stopSession()
    setSessionTime(0)
    setSessionGoals([])
    setCompletedGoals([])
    setShowUploadModal(false)
    setUploadedImage(null)
    setAiAnalysis(null)
    setImageDescription('')
    
    toast.success('Sessie voltooid! Goed gedaan! 🎉')
  }

  const handleSkipUpload = () => {
    stopSession()
    setSessionTime(0)
    setSessionGoals([])
    setCompletedGoals([])
    setShowUploadModal(false)
    setUploadedImage(null)
    setAiAnalysis(null)
    setImageDescription('')
  }

  const ambientSounds = [
    { id: 'none', name: 'Stilte', emoji: '🔇' },
    { id: 'rain', name: 'Regen Vibes', emoji: '🌧️' },
    { id: 'forest', name: 'Bos Chill', emoji: '🌲' },
    { id: 'lofi', name: 'Lo-Fi Beats', emoji: '🎵' }
  ]

  if (!currentSession) return null

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)`
          }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-8 text-white">
          <div className="text-center mb-12">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold mb-2">Focus Modus 🧠</h1>
            <p className="text-xl text-purple-200">
              Grinden met {currentSession.subject} - Stay locked in! 🔒
            </p>
          </div>

          <div className="text-center mb-12">
            <motion.div
              className="text-8xl font-mono font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
              transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
            >
              {formatTime(sessionTime)}
            </motion.div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                {isRunning ? 'Pauzeren' : 'Hervatten'}
              </button>
              
              <button
                onClick={handleEndSession}
                className="flex items-center gap-3 px-8 py-4 bg-red-500/80 hover:bg-red-500 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                <Square className="w-6 h-6" />
                Sessie Beëindigen
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6" />
                Sessie Doelen 🎯
              </h3>
              
              <div className="space-y-3 mb-4">
                {sessionGoals.map((goal, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <button
                      onClick={() => toggleGoalCompletion(index)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        completedGoals[index] 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-white/50 hover:border-white'
                      }`}
                    >
                      {completedGoals[index] && <span className="text-white text-sm">✓</span>}
                    </button>
                    <span className={`flex-1 ${completedGoals[index] ? 'line-through opacity-60' : ''}`}>
                      {goal}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                  placeholder="Voeg een doel toe voor deze sessie..."
                  className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60"
                />
                <button
                  onClick={handleAddGoal}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Volume2 className="w-6 h-6" />
                  Studie Vibes 🎵
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {ambientSounds.map((sound) => (
                    <button
                      key={sound.id}
                      onClick={() => setAmbientSound(sound.id as any)}
                      className={`p-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                        ambientSound === sound.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      <span>{sound.emoji}</span>
                      {sound.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  AI Studie Vragen 🤖
                </h3>
                
                <div className="space-y-3">
                  {currentSession.questions.map((question, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-white/10 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="text-purple-200 font-medium">{question}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-purple-400">
                {Math.floor(sessionTime / 60)}
              </div>
              <div className="text-sm text-purple-200">Minuten Gegrindt</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-green-400">
                {completedGoals.filter(Boolean).length}
              </div>
              <div className="text-sm text-green-200">Doelen Voltooid</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-pink-400 flex items-center justify-center gap-1">
                {Math.floor(sessionTime / 60) * 3}
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-sm text-pink-200">XP Verdiend</div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sessie Voltooid! 🎉</h2>
                <p className="text-gray-600">Upload een foto voor AI-analyse door Groq</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Wat heb je gestudeerd?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'huiswerk', name: 'Huiswerk', emoji: '📝' },
                    { id: 'toets', name: 'Toets Prep', emoji: '📊' },
                    { id: 'examen', name: 'Examen Prep', emoji: '🎓' },
                    { id: 'herhaling', name: 'Herhaling', emoji: '🔄' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setStudyType(type.id as any)}
                      className={`p-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                        studyType === type.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{type.emoji}</span>
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload je studiemateriaal
                </label>
                
                {!uploadedImage ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Klik om te uploaden</span> of sleep hier
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG of JPEG (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded study material"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => {
                        setUploadedImage(null)
                        setAiAnalysis(null)
                        setImageDescription('')
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {uploadedImage && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Beschrijf wat er op de foto staat
                  </label>
                  <textarea
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.target.value)}
                    placeholder="Bijvoorbeeld: 'Samenvattingen van hoofdstuk 3 over de Franse Revolutie, met tijdlijn en belangrijke personen'"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  
                  {imageDescription.trim() && !aiAnalysis && (
                    <button
                      onClick={analyzeWithGroqAI}
                      disabled={isAnalyzing}
                      className="mt-3 w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          AI analyseert...
                        </>
                      ) : (
                        <>
                          <Brain className="w-5 h-5" />
                          Analyseer met Groq AI 🤖
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {aiAnalysis && (
                <motion.div
                  className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Groq AI Analyse 🤖</h4>
                      <p className="text-gray-700 mb-4">{aiAnalysis.feedback}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-green-700 mb-2">💪 Sterke Punten:</h5>
                      <ul className="text-sm text-green-600 space-y-1">
                        {aiAnalysis.strengths?.map((strength: string, index: number) => (
                          <li key={index}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-orange-700 mb-2">🎯 Verbeterpunten:</h5>
                      <ul className="text-sm text-orange-600 space-y-1">
                        {aiAnalysis.improvements?.map((improvement: string, index: number) => (
                          <li key={index}>• {improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-semibold text-purple-700 mb-2">📚 Vervolgstappen:</h5>
                    <ul className="text-sm text-purple-600 space-y-1">
                      {aiAnalysis.studyPlan?.map((step: string, index: number) => (
                        <li key={index}>• {step}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1 rounded-full font-semibold ${
                      aiAnalysis.difficulty === 'makkelijk' ? 'bg-green-100 text-green-700' :
                      aiAnalysis.difficulty === 'gemiddeld' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {aiAnalysis.difficulty}
                    </span>
                    <span className="text-gray-600">
                      ⏱️ Geschatte tijd: {aiAnalysis.estimatedTime} min
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleSkipUpload}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
                >
                  Later Uploaden
                </button>
                <button
                  onClick={handleFinishSession}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Sessie Voltooien
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FocusMode