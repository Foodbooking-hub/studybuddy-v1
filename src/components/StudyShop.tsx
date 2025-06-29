import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Coins, Star, Zap, Palette, Crown, Heart } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import BuddyAvatar from './BuddyAvatar'

const StudyShop: React.FC = () => {
  const { studyCoins, inventory, buyItem } = useGameStore()
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'accessory' | 'theme' | 'powerup' | 'pet' | 'emote'>('all')

  const shopItems = [
    // Gaming Accessories
    { 
      id: 'gaming-headset', 
      name: 'RGB Gaming Headset', 
      emoji: '🎧', 
      price: 75, 
      category: 'accessory', 
      description: 'Voor de echte pro gamers', 
      rarity: 'rare' 
    },
    { 
      id: 'vr-goggles', 
      name: 'VR Bril', 
      emoji: '🥽', 
      price: 150, 
      category: 'accessory', 
      description: 'Study in virtual reality', 
      rarity: 'epic' 
    },
    { 
      id: 'snapback', 
      name: 'Fresh Snapback', 
      emoji: '🧢', 
      price: 50, 
      category: 'accessory', 
      description: 'Drip level: maximum', 
      rarity: 'common' 
    },
    { 
      id: 'airpods', 
      name: 'Wireless Earbuds', 
      emoji: '🎵', 
      price: 120, 
      category: 'accessory', 
      description: 'Lo-fi beats to study to', 
      rarity: 'rare' 
    },
    { 
      id: 'chain', 
      name: 'Gold Chain', 
      emoji: '⛓️', 
      price: 200, 
      category: 'accessory', 
      description: 'Flex op je klasgenoten', 
      rarity: 'epic' 
    },
    { 
      id: 'crown', 
      name: 'Diamond Crown', 
      emoji: '👑', 
      price: 500, 
      category: 'accessory', 
      description: 'Voor de absolute legends', 
      rarity: 'legendary' 
    },

    // Pets
    { 
      id: 'cat', 
      name: 'Study Cat', 
      emoji: '🐱', 
      price: 100, 
      category: 'pet', 
      description: 'Cute study companion', 
      rarity: 'common' 
    },
    { 
      id: 'dragon', 
      name: 'Mini Dragon', 
      emoji: '🐉', 
      price: 300, 
      category: 'pet', 
      description: 'Legendary study guardian', 
      rarity: 'legendary' 
    },
    { 
      id: 'unicorn', 
      name: 'Rainbow Unicorn', 
      emoji: '🦄', 
      price: 250, 
      category: 'pet', 
      description: 'Magical study vibes', 
      rarity: 'epic' 
    },

    // Themes
    { 
      id: 'dark-mode', 
      name: 'Dark Mode Pro', 
      emoji: '🌙', 
      price: 80, 
      category: 'theme', 
      description: 'Voor de night owls', 
      rarity: 'common' 
    },
    { 
      id: 'neon-cyber', 
      name: 'Neon Cyberpunk', 
      emoji: '🌈', 
      price: 180, 
      category: 'theme', 
      description: 'Futuristic RGB vibes', 
      rarity: 'epic' 
    },
    { 
      id: 'aesthetic-pink', 
      name: 'Aesthetic Pink', 
      emoji: '💖', 
      price: 120, 
      category: 'theme', 
      description: 'Soft girl/boy aesthetic', 
      rarity: 'rare' 
    },

    // Power-ups
    { 
      id: 'double-xp', 
      name: 'XP Boost', 
      emoji: '⚡', 
      price: 30, 
      category: 'powerup', 
      description: '2x XP voor 1 uur', 
      rarity: 'common' 
    },
    { 
      id: 'focus-potion', 
      name: 'Focus Potion', 
      emoji: '🧪', 
      price: 50, 
      category: 'powerup', 
      description: 'Ultra focus voor 2 uur', 
      rarity: 'rare' 
    },

    // Emotes
    { 
      id: 'fire-emote', 
      name: 'Fire Reaction', 
      emoji: '🔥', 
      price: 25, 
      category: 'emote', 
      description: 'React met fire op je prestaties', 
      rarity: 'common' 
    },
    { 
      id: 'skull-emote', 
      name: 'Skull Emoji', 
      emoji: '💀', 
      price: 35, 
      category: 'emote', 
      description: 'Voor als de toets je doodt', 
      rarity: 'common' 
    }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory)

  const isOwned = (itemId: string) => inventory.some(item => item.id === itemId)
  const canAfford = (price: number) => studyCoins >= price

  const handleBuyItem = (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId)
    if (item && canAfford(item.price) && !isOwned(itemId)) {
      buyItem(itemId)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-orange-500'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300'
      case 'rare': return 'border-blue-300'
      case 'epic': return 'border-purple-300'
      case 'legendary': return 'border-yellow-300'
      default: return 'border-gray-300'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ShoppingBag className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Study Shop 🛒</h1>
        <p className="text-xl text-gray-600 mb-4">Flex je StudyCoins en upgrade je vibe!</p>
        
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-3 rounded-full shadow-lg">
          <Coins className="w-6 h-6 text-white" />
          <span className="text-2xl font-bold text-white">{studyCoins}</span>
          <span className="text-white font-medium">StudyCoins</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-8 overflow-x-auto">
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 flex gap-2">
          {[
            { id: 'all', name: 'Alles', icon: ShoppingBag },
            { id: 'accessory', name: 'Drip 💎', icon: Crown },
            { id: 'pet', name: 'Pets 🐾', icon: Heart },
            { id: 'theme', name: 'Vibes ✨', icon: Palette },
            { id: 'powerup', name: 'Boosts ⚡', icon: Zap },
            { id: 'emote', name: 'Emotes 😎', icon: Star }
          ].map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Shop Items Grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        layout
      >
        <AnimatePresence>
          {filteredItems.map((item) => {
            const owned = isOwned(item.id)
            const affordable = canAfford(item.price)
            
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 ${
                  owned 
                    ? 'border-green-300 bg-green-50' 
                    : affordable 
                      ? `${getRarityBorder(item.rarity)} hover:border-purple-300 hover:shadow-xl transform hover:scale-105` 
                      : 'border-gray-200 opacity-60'
                }`}
              >
                <div className="text-center">
                  {/* Rarity indicator */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 bg-gradient-to-r ${getRarityColor(item.rarity)}`}>
                    {item.rarity.toUpperCase()}
                  </div>
                  
                  {/* Item Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${getRarityColor(item.rarity)} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-3xl">{item.emoji}</span>
                  </div>
                  
                  {/* Item Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  
                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Coins className="w-5 h-5 text-yellow-500" />
                      <span className="text-lg font-bold text-gray-900">{item.price}</span>
                    </div>
                    
                    {owned ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Star className="w-5 h-5" />
                        <span className="font-semibold">Owned</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBuyItem(item.id)}
                        disabled={!affordable}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          affordable
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {affordable ? 'Cop This! 🔥' : 'Too Broke 💸'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Preview Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Buddy Flex 💎</h2>
        <div className="flex justify-center mb-6">
          <BuddyAvatar size="xl" animated={true} />
        </div>
        <p className="text-center text-gray-600">
          Dit is hoe je Buddy eruitziet met al je gear! Keep grinding voor meer drip! 🔥
        </p>
      </div>
    </div>
  )
}

export default StudyShop