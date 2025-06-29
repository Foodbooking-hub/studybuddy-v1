import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BuddyEvolution {
  id: string
  name: string
  emoji: string
  description: string
  minLevel: number
  maxLevel: number
  color: string
  vibe: string
}

export interface ShopItem {
  id: string
  name: string
  emoji: string
  price: number
  category: 'accessory' | 'theme' | 'powerup' | 'pet' | 'emote'
  description: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  owned?: boolean
  equipped?: boolean
}

export interface Quest {
  id: string
  title: string
  description: string
  progress: number
  target: number
  reward: {
    xp: number
    coins: number
    item?: string
  }
  completed: boolean
  type: 'daily' | 'weekly'
}

export interface StudySession {
  id: string
  subject: string
  duration: number
  xpGained: number
  coinsGained: number
  questions: string[]
  completed: boolean
  startTime: Date
}

export interface AgendaItem {
  id: string
  title: string
  subject: string
  type: 'study' | 'review' | 'test'
  date: Date
  duration: number
  completed: boolean
}

interface GameState {
  // Player Stats
  level: number
  xp: number
  studyCoins: number
  totalStudyTime: number
  streak: number
  
  // Buddy System
  buddy: {
    evolution: BuddyEvolution
    accessories: string[]
    pets: string[]
    name: string
    mood: 'happy' | 'excited' | 'focused' | 'sleepy' | 'fire'
  }
  
  // Shop & Inventory
  inventory: ShopItem[]
  equippedItems: string[]
  
  // Quests
  dailyQuests: Quest[]
  weeklyQuests: Quest[]
  
  // Sessions & Agenda
  currentSession: StudySession | null
  agenda: AgendaItem[]
  
  // Settings
  focusMode: boolean
  selectedTheme: string
  
  // Actions
  gainXP: (amount: number) => void
  gainCoins: (amount: number) => void
  buyItem: (itemId: string) => void
  equipItem: (itemId: string) => void
  startSession: (subject: string) => void
  stopSession: () => void
  completeQuest: (questId: string) => void
  updateQuestProgress: (questId: string, progress: number) => void
  toggleFocusMode: () => void
  generateDailyQuests: () => void
  scheduleForgettingCurve: (subject: string) => void
}

const BUDDY_EVOLUTIONS: BuddyEvolution[] = [
  {
    id: 'noob',
    name: 'Study Noob',
    emoji: '😅',
    description: 'Net begonnen met studeren, maar vol motivatie!',
    minLevel: 1,
    maxLevel: 5,
    color: 'from-gray-400 to-gray-600',
    vibe: 'Beginner energy'
  },
  {
    id: 'gamer',
    name: 'Brain Gamer',
    emoji: '🎮',
    description: 'Studeren is nu jouw favoriete game!',
    minLevel: 6,
    maxLevel: 10,
    color: 'from-blue-500 to-purple-600',
    vibe: 'Gaming vibes'
  },
  {
    id: 'ninja',
    name: 'Study Ninja',
    emoji: '🥷',
    description: 'Sluipt door de stof met ninja-skills',
    minLevel: 11,
    maxLevel: 20,
    color: 'from-purple-600 to-pink-600',
    vibe: 'Stealth mode'
  },
  {
    id: 'wizard',
    name: 'Knowledge Wizard',
    emoji: '🧙‍♂️',
    description: 'Tovert kennis uit het niets tevoorschijn',
    minLevel: 21,
    maxLevel: 35,
    color: 'from-indigo-500 to-purple-700',
    vibe: 'Magical powers'
  },
  {
    id: 'legend',
    name: 'Study Legend',
    emoji: '👑',
    description: 'De absolute koning/koningin van studeren',
    minLevel: 36,
    maxLevel: 50,
    color: 'from-yellow-400 to-orange-500',
    vibe: 'Legendary status'
  },
  {
    id: 'god',
    name: 'Brain God',
    emoji: '⚡',
    description: 'Transcended beyond mortal studying',
    minLevel: 51,
    maxLevel: 999,
    color: 'from-cyan-400 to-blue-600',
    vibe: 'Divine intellect'
  }
]

const getCurrentEvolution = (level: number): BuddyEvolution => {
  return BUDDY_EVOLUTIONS.find(evo => level >= evo.minLevel && level <= evo.maxLevel) || BUDDY_EVOLUTIONS[0]
}

const generateDailyQuestsList = (): Quest[] => [
  {
    id: 'daily-grind-30',
    title: 'Daily Grind 💪',
    description: 'Studeer 30 minuten non-stop',
    progress: 0,
    target: 30,
    reward: { xp: 50, coins: 25 },
    completed: false,
    type: 'daily'
  },
  {
    id: 'daily-screenshot',
    title: 'Screenshot je Progress 📸',
    description: 'Upload een foto van je studiemateriaal',
    progress: 0,
    target: 1,
    reward: { xp: 30, coins: 15 },
    completed: false,
    type: 'daily'
  },
  {
    id: 'daily-quiz-master',
    title: 'Quiz Master 🧠',
    description: 'Beantwoord 5 AI-vragen correct',
    progress: 0,
    target: 5,
    reward: { xp: 40, coins: 20 },
    completed: false,
    type: 'daily'
  },
  {
    id: 'daily-streak',
    title: 'Keep the Streak Alive 🔥',
    description: 'Houd je dagelijkse streak gaande',
    progress: 0,
    target: 1,
    reward: { xp: 25, coins: 10 },
    completed: false,
    type: 'daily'
  }
]

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial State - FOCUS MODE DISABLED BY DEFAULT
      level: 1,
      xp: 0,
      studyCoins: 200,
      totalStudyTime: 0,
      streak: 0,
      
      buddy: {
        evolution: BUDDY_EVOLUTIONS[0],
        accessories: [],
        pets: [],
        name: 'Buddy',
        mood: 'happy'
      },
      
      inventory: [],
      equippedItems: [],
      dailyQuests: generateDailyQuestsList(),
      weeklyQuests: [],
      currentSession: null,
      agenda: [],
      focusMode: false, // CRITICAL: Always start with false
      selectedTheme: 'default',
      
      // Actions
      gainXP: (amount: number) => {
        set((state) => {
          const newXP = state.xp + amount
          const newLevel = Math.floor(newXP / 100) + 1
          
          const newEvolution = getCurrentEvolution(newLevel)
          
          return {
            xp: newXP,
            level: newLevel,
            buddy: {
              ...state.buddy,
              evolution: newEvolution,
              mood: newLevel > state.level ? 'excited' : state.buddy.mood
            }
          }
        })
      },
      
      gainCoins: (amount: number) => {
        set((state) => ({
          studyCoins: state.studyCoins + amount
        }))
      },
      
      buyItem: (itemId: string) => {
        set((state) => {
          const shopItems = [
            { id: 'gaming-headset', name: 'RGB Gaming Headset', emoji: '🎧', price: 75, category: 'accessory', description: 'Voor de echte pro gamers', rarity: 'rare' },
            { id: 'vr-goggles', name: 'VR Bril', emoji: '🥽', price: 150, category: 'accessory', description: 'Study in virtual reality', rarity: 'epic' },
            { id: 'snapback', name: 'Fresh Snapback', emoji: '🧢', price: 50, category: 'accessory', description: 'Drip level: maximum', rarity: 'common' },
            { id: 'airpods', name: 'Wireless Earbuds', emoji: '🎵', price: 120, category: 'accessory', description: 'Lo-fi beats to study to', rarity: 'rare' },
            { id: 'chain', name: 'Gold Chain', emoji: '⛓️', price: 200, category: 'accessory', description: 'Flex op je klasgenoten', rarity: 'epic' },
            { id: 'crown', name: 'Diamond Crown', emoji: '👑', price: 500, category: 'accessory', description: 'Voor de absolute legends', rarity: 'legendary' },
            { id: 'cat', name: 'Study Cat', emoji: '🐱', price: 100, category: 'pet', description: 'Cute study companion', rarity: 'common' },
            { id: 'dragon', name: 'Mini Dragon', emoji: '🐉', price: 300, category: 'pet', description: 'Legendary study guardian', rarity: 'legendary' },
            { id: 'unicorn', name: 'Rainbow Unicorn', emoji: '🦄', price: 250, category: 'pet', description: 'Magical study vibes', rarity: 'epic' },
            { id: 'dark-mode', name: 'Dark Mode Pro', emoji: '🌙', price: 80, category: 'theme', description: 'Voor de night owls', rarity: 'common' },
            { id: 'neon-cyber', name: 'Neon Cyberpunk', emoji: '🌈', price: 180, category: 'theme', description: 'Futuristic RGB vibes', rarity: 'epic' },
            { id: 'aesthetic-pink', name: 'Aesthetic Pink', emoji: '💖', price: 120, category: 'theme', description: 'Soft girl/boy aesthetic', rarity: 'rare' },
            { id: 'double-xp', name: 'XP Boost', emoji: '⚡', price: 30, category: 'powerup', description: '2x XP voor 1 uur', rarity: 'common' },
            { id: 'focus-potion', name: 'Focus Potion', emoji: '🧪', price: 50, category: 'powerup', description: 'Ultra focus voor 2 uur', rarity: 'rare' },
            { id: 'fire-emote', name: 'Fire Reaction', emoji: '🔥', price: 25, category: 'emote', description: 'React met fire op je prestaties', rarity: 'common' },
            { id: 'skull-emote', name: 'Skull Emoji', emoji: '💀', price: 35, category: 'emote', description: 'Voor als de toets je doodt', rarity: 'common' }
          ]
          
          const item = shopItems.find(i => i.id === itemId)
          if (!item || state.studyCoins < item.price) return state
          
          return {
            studyCoins: state.studyCoins - item.price,
            inventory: [...state.inventory, { ...item, owned: true }]
          }
        })
      },
      
      equipItem: (itemId: string) => {
        set((state) => {
          const item = state.inventory.find(i => i.id === itemId)
          if (!item) return state
          
          if (item.category === 'accessory') {
            return {
              buddy: {
                ...state.buddy,
                accessories: [...state.buddy.accessories, itemId]
              }
            }
          } else if (item.category === 'pet') {
            return {
              buddy: {
                ...state.buddy,
                pets: [...state.buddy.pets, itemId]
              }
            }
          } else if (item.category === 'theme') {
            return {
              selectedTheme: itemId
            }
          }
          
          return state
        })
      },
      
      startSession: (subject: string) => {
        const questions = [
          `Yo, wat is het belangrijkste concept in ${subject}? 🤔`,
          `Hoe kun je ${subject} gebruiken in real life? 💯`,
          `Wat is het moeilijkste aan ${subject}? Be honest! 😅`,
          `Welke study hack werkt het beste voor ${subject}? 🎯`,
          `Hoe zou je ${subject} uitleggen aan je bestie? 👥`
        ]
        
        set({
          currentSession: {
            id: Date.now().toString(),
            subject,
            duration: 0,
            xpGained: 0,
            coinsGained: 0,
            questions: questions.slice(0, 3),
            completed: false,
            startTime: new Date()
          },
          focusMode: true, // Only enable when starting a session
          buddy: {
            ...get().buddy,
            mood: 'focused'
          }
        })
      },
      
      stopSession: () => {
        set((state) => {
          if (!state.currentSession) return state
          
          const duration = Math.floor((Date.now() - state.currentSession.startTime.getTime()) / 1000 / 60)
          const xpGained = duration * 3
          const coinsGained = Math.floor(duration / 3)
          
          const updatedDailyQuests = state.dailyQuests.map(quest => {
            if (quest.id === 'daily-grind-30' && duration >= 30) {
              return { ...quest, progress: 30, completed: true }
            }
            return quest
          })
          
          const forgettingCurveItems: AgendaItem[] = [1, 3, 7, 14].map(days => ({
            id: `review-${state.currentSession!.subject}-${Date.now()}-${days}`,
            title: `Quick Review: ${state.currentSession!.subject} 🔄`,
            subject: state.currentSession!.subject,
            type: 'review' as const,
            date: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
            duration: 5,
            completed: false
          }))
          
          return {
            currentSession: null,
            focusMode: false, // CRITICAL: Always turn off when stopping session
            xp: state.xp + xpGained,
            studyCoins: state.studyCoins + coinsGained,
            totalStudyTime: state.totalStudyTime + duration,
            dailyQuests: updatedDailyQuests,
            agenda: [...state.agenda, ...forgettingCurveItems],
            buddy: {
              ...state.buddy,
              mood: duration >= 30 ? 'fire' : 'happy'
            }
          }
        })
      },
      
      completeQuest: (questId: string) => {
        set((state) => {
          const quest = state.dailyQuests.find(q => q.id === questId)
          if (!quest || quest.completed) return state
          
          return {
            xp: state.xp + quest.reward.xp,
            studyCoins: state.studyCoins + quest.reward.coins,
            dailyQuests: state.dailyQuests.map(q => 
              q.id === questId ? { ...q, completed: true } : q
            ),
            buddy: {
              ...state.buddy,
              mood: 'excited'
            }
          }
        })
      },
      
      updateQuestProgress: (questId: string, progress: number) => {
        set((state) => ({
          dailyQuests: state.dailyQuests.map(quest => 
            quest.id === questId 
              ? { ...quest, progress: Math.min(progress, quest.target) }
              : quest
          )
        }))
      },
      
      toggleFocusMode: () => {
        set((state) => ({ focusMode: !state.focusMode }))
      },
      
      generateDailyQuests: () => {
        set({ dailyQuests: generateDailyQuestsList() })
      },
      
      scheduleForgettingCurve: (subject: string) => {
        // This is called automatically in stopSession
      }
    }),
    {
      name: 'studybuddy-game-store'
    }
  )
)