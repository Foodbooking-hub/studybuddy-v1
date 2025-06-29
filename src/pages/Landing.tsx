import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, BookOpen, Trophy, Users, Shield, Star, 
  Camera, Calendar, Brain, Zap, Target, Award,
  ArrowRight, CheckCircle, Sparkles
} from 'lucide-react'

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🦊</span>
              </div>
              <span className="text-xl font-bold text-gray-900">StudyBuddy AI</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Prijzen</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</a>
              <Link to="/auth" className="btn-primary">
                Probeer Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-700/10"></div>
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center">
            {/* Hero Avatar */}
            <motion.div 
              className="mb-8 flex justify-center"
              variants={itemVariants}
            >
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-float">
                  <span className="text-6xl filter drop-shadow-lg">🦊</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-7xl font-black text-gray-900 mb-6 leading-tight"
              variants={itemVariants}
            >
              Maak van huiswerk een{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                game
              </span>
              <br />
              met AI-coach Buddy!
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              StudyBuddy AI helpt Belgische en Nederlandse scholieren van 12-18 jaar 
              <strong className="text-gray-900"> 22% betere cijfers</strong> behalen met 
              gepersonaliseerde AI-coaching, gamification en slimme planning.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <Link 
                to="/auth" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3"
              >
                Probeer Gratis
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Bekijk Demo
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">COPPA Veilig</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">EdTech Award 2024</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Problem → Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Van stress naar <span className="text-gradient">succes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <strong>73% van tieners</strong> ervaart stress voor toetsen. StudyBuddy AI zorgt voor 
              <strong className="text-green-600"> 22% betere cijfers</strong> na slechts 4 weken gebruik.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-2xl border-l-4 border-red-400 shadow-lg">
                <h3 className="font-bold text-red-800 mb-4 text-xl flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Het probleem
                </h3>
                <ul className="text-red-700 space-y-3 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Uitstelgedrag en slechte planning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Overweldigende hoeveelheid leerstof</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Geen overzicht van voortgang</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Gebrek aan motivatie en focus</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-l-4 border-green-400 shadow-lg">
                <h3 className="font-bold text-green-800 mb-4 text-xl flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  De oplossing
                </h3>
                <ul className="text-green-700 space-y-3 text-lg">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>AI-gestuurde slimme planning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Foto-upload voor instant analyse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Gamification met XP en levels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Persoonlijke AI-buddy coach</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Gallery */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Krachtige functies voor <span className="text-gradient">betere resultaten</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek hoe StudyBuddy AI jouw studeerervaring transformeert
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Camera,
                title: 'Foto-analyse',
                description: 'Upload foto\'s van je cursussen en krijg instant samenvattingen en keywords.',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-50'
              },
              {
                icon: Trophy,
                title: 'Gamification',
                description: 'Verdien XP, level up je avatar en unlock cosmetische items.',
                color: 'from-purple-500 to-pink-500',
                bgColor: 'bg-purple-50'
              },
              {
                icon: Brain,
                title: 'AI-Coach',
                description: 'Persoonlijke feedback en tips gebaseerd op je leerpatronen.',
                color: 'from-green-500 to-emerald-500',
                bgColor: 'bg-green-50'
              },
              {
                icon: Users,
                title: 'Ouder Portal',
                description: 'Ouders krijgen voortgangsrapporten en tips voor betere ondersteuning.',
                color: 'from-orange-500 to-red-500',
                bgColor: 'bg-orange-50'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`${feature.bgColor} p-8 rounded-2xl shadow-lg card-hover border border-white/50`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kies jouw <span className="text-gradient">plan</span>
            </h2>
            <p className="text-xl text-gray-600">
              Start gratis en upgrade wanneer je klaar bent voor meer functies
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="bg-gray-50 p-8 rounded-2xl border-2 border-gray-200 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Gratis</h3>
              <p className="text-5xl font-bold text-gray-900 mb-6">
                €0<span className="text-xl font-normal text-gray-600">/maand</span>
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  '2 vakken',
                  'Basis gamification',
                  'Session timer',
                  'Basis voortgangsrapport'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/auth" 
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 block text-center transform hover:scale-105"
              >
                Start Gratis
              </Link>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white relative shadow-2xl border-2 border-blue-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute top-6 right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                🔥 Populair
              </div>
              <h3 className="text-3xl font-bold mb-4">Pro</h3>
              <p className="text-5xl font-bold mb-6">
                €5<span className="text-xl font-normal opacity-80">/maand</span>
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Onbeperkt vakken',
                  'AI foto-analyse',
                  'Ouder rapportage',
                  'AR flashcards',
                  'Prioriteitsondersteuning'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/auth" 
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 block text-center transform hover:scale-105 shadow-lg"
              >
                Upgrade naar Pro
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🦊</span>
              </div>
              <span className="text-2xl font-bold">StudyBuddy AI</span>
            </div>
            <p className="text-gray-400 mb-8 text-lg">
              Jouw AI-studiecoach voor betere resultaten
            </p>
            <div className="flex justify-center gap-8 text-gray-400 mb-8">
              <a href="#" className="hover:text-white transition-colors font-medium">Privacy</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Voorwaarden</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Contact</a>
              <a href="#" className="hover:text-white transition-colors font-medium">Support</a>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500">
                © 2024 StudyBuddy AI. Alle rechten voorbehouden. 
                Gemaakt met ❤️ voor Belgische en Nederlandse studenten.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing