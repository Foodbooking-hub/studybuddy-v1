import Groq from 'groq-sdk'

// Initialize Groq client
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Voor client-side gebruik
})

export interface StudyAnalysis {
  feedback: string
  tips: string[]
  strengths: string[]
  improvements: string[]
  studyPlan: string[]
  difficulty: 'makkelijk' | 'gemiddeld' | 'moeilijk'
  estimatedTime: number
}

export interface StudyQuestions {
  questions: string[]
  difficulty: 'makkelijk' | 'gemiddeld' | 'moeilijk'
}

export class GroqService {
  private static instance: GroqService
  
  public static getInstance(): GroqService {
    if (!GroqService.instance) {
      GroqService.instance = new GroqService()
    }
    return GroqService.instance
  }

  // Analyseer geüploade studiemateriaal
  async analyzeStudyMaterial(
    subject: string, 
    studyType: 'huiswerk' | 'toets' | 'examen' | 'herhaling',
    imageDescription: string,
    userLevel: number
  ): Promise<StudyAnalysis> {
    try {
      const prompt = `
Je bent een AI studiecoach voor Nederlandse/Belgische tieners (12-18 jaar). 
Analyseer dit studiemateriaal en geef feedback in een vriendelijke, motiverende toon.

CONTEXT:
- Vak: ${subject}
- Type: ${studyType}
- Student level: ${userLevel}
- Beschrijving materiaal: ${imageDescription}

Geef een analyse in JSON format met:
{
  "feedback": "Positieve, motiverende feedback (max 150 woorden)",
  "tips": ["3-5 concrete studietips"],
  "strengths": ["2-3 sterke punten van het materiaal"],
  "improvements": ["2-3 verbeterpunten"],
  "studyPlan": ["3-4 stappen voor vervolgstudies"],
  "difficulty": "makkelijk/gemiddeld/moeilijk",
  "estimatedTime": "geschatte studietijd in minuten"
}

Gebruik Nederlandse taal, emoji's, en spreek de student direct aan. Wees positief maar eerlijk.
`

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Je bent een enthousiaste AI studiecoach die Nederlandse/Belgische tieners helpt beter te studeren. Gebruik een vriendelijke, motiverende toon met emoji's."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 1000,
      })

      const response = completion.choices[0]?.message?.content
      if (!response) throw new Error('Geen response van Groq AI')

      // Parse JSON response
      const analysis = JSON.parse(response) as StudyAnalysis
      return analysis

    } catch (error) {
      console.error('Groq AI Error:', error)
      
      // Fallback response
      return {
        feedback: `Goed bezig met ${subject}! 🔥 Je bent op de goede weg. Keep grinding!`,
        tips: [
          "Maak duidelijke samenvattingen met kopjes",
          "Gebruik kleuren om belangrijke info te markeren", 
          "Test jezelf regelmatig met vragen"
        ],
        strengths: ["Goede structuur", "Duidelijke notities"],
        improvements: ["Meer voorbeelden toevoegen", "Verbanden tussen concepten tekenen"],
        studyPlan: [
          "Herhaal de hoofdpunten",
          "Maak oefenvragen",
          "Leg het uit aan iemand anders"
        ],
        difficulty: 'gemiddeld',
        estimatedTime: 30
      }
    }
  }

  // Genereer AI studievragen
  async generateStudyQuestions(
    subject: string,
    topic: string,
    difficulty: 'makkelijk' | 'gemiddeld' | 'moeilijk' = 'gemiddeld',
    count: number = 5
  ): Promise<StudyQuestions> {
    try {
      const prompt = `
Genereer ${count} studievragen voor Nederlandse/Belgische tieners over:
- Vak: ${subject}
- Onderwerp: ${topic}
- Niveau: ${difficulty}

Maak vragen die:
- Aansluiten bij het Nederlandse/Belgische curriculum
- Geschikt zijn voor tieners (12-18 jaar)
- Variëren in type (multiple choice, open vragen, etc.)
- Motiverend en uitdagend zijn

Geef response in JSON format:
{
  "questions": ["vraag 1", "vraag 2", ...],
  "difficulty": "${difficulty}"
}

Gebruik Nederlandse taal en emoji's waar passend.
`

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system", 
            content: "Je bent een AI leraar die boeiende studievragen maakt voor Nederlandse/Belgische tieners."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.8,
        max_tokens: 800,
      })

      const response = completion.choices[0]?.message?.content
      if (!response) throw new Error('Geen response van Groq AI')

      const questions = JSON.parse(response) as StudyQuestions
      return questions

    } catch (error) {
      console.error('Groq AI Error:', error)
      
      // Fallback questions
      return {
        questions: [
          `Wat is het belangrijkste concept in ${subject}? 🤔`,
          `Hoe kun je ${subject} toepassen in het echte leven? 💡`,
          `Wat vind je het moeilijkste aan ${subject}? 🤯`,
          `Welke strategie werkt het beste voor jou bij ${subject}? 🎯`,
          `Hoe zou je ${subject} uitleggen aan een vriend? 👥`
        ],
        difficulty
      }
    }
  }

  // Genereer gepersonaliseerde studietips
  async generatePersonalizedTips(
    subjects: string[],
    studyHabits: string[],
    weaknesses: string[],
    userLevel: number
  ): Promise<string[]> {
    try {
      const prompt = `
Genereer 5 gepersonaliseerde studietips voor een Nederlandse/Belgische tiener:

PROFIEL:
- Vakken: ${subjects.join(', ')}
- Studiegewoonten: ${studyHabits.join(', ')}
- Uitdagingen: ${weaknesses.join(', ')}
- Level: ${userLevel}

Geef praktische, uitvoerbare tips die:
- Specifiek zijn voor deze student
- Motiverend en positief zijn
- Gebruik maken van moderne studie-technieken
- Geschikt zijn voor tieners

Geef response als JSON array: ["tip 1", "tip 2", ...]

Gebruik Nederlandse taal, emoji's en spreek de student direct aan.
`

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Je bent een persoonlijke AI studiecoach die op maat gemaakte tips geeft aan Nederlandse/Belgische tieners."
          },
          {
            role: "user", 
            content: prompt
          }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 600,
      })

      const response = completion.choices[0]?.message?.content
      if (!response) throw new Error('Geen response van Groq AI')

      const tips = JSON.parse(response) as string[]
      return tips

    } catch (error) {
      console.error('Groq AI Error:', error)
      
      // Fallback tips
      return [
        "Plan je studiesessies van tevoren in je agenda 📅",
        "Gebruik de Pomodoro techniek: 25 min studeren, 5 min pauze 🍅",
        "Maak samenvattingen in je eigen woorden 📝",
        "Test jezelf regelmatig met flashcards 🃏",
        "Zoek een rustige studieplek zonder afleiding 🤫"
      ]
    }
  }

  // Genereer motiverende berichten
  async generateMotivationalMessage(
    context: 'session_start' | 'session_end' | 'level_up' | 'streak' | 'struggle',
    userStats: {
      level: number
      streak: number
      subject?: string
      sessionTime?: number
    }
  ): Promise<string> {
    try {
      const prompt = `
Genereer een kort, motiverend bericht voor een Nederlandse/Belgische tiener:

CONTEXT: ${context}
STATS: ${JSON.stringify(userStats)}

Het bericht moet:
- Kort zijn (max 50 woorden)
- Motiverend en positief zijn
- Gebruik maken van emoji's
- Aansluiten bij de gaming/social media cultuur van tieners
- In het Nederlands zijn

Geef alleen het bericht terug, geen extra tekst.
`

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Je bent een motiverende AI buddy die korte, krachtige berichten stuurt naar Nederlandse/Belgische tieners."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "llama3-8b-8192", // Sneller model voor korte berichten
        temperature: 0.9,
        max_tokens: 100,
      })

      const response = completion.choices[0]?.message?.content?.trim()
      return response || "Je bent een legend! Keep grinding! 🔥💪"

    } catch (error) {
      console.error('Groq AI Error:', error)
      
      // Fallback messages
      const fallbacks = {
        session_start: "Time to grind! Laten we dit doen! 🔥💪",
        session_end: "Sessie voltooid! Je bent een absolute unit! 🏆✨",
        level_up: "LEVEL UP! Je bent echt next level bezig! 🚀⭐",
        streak: `${userStats.streak} dagen streak! Je bent on fire! 🔥🔥`,
        struggle: "Even een dipje? Dat hoort erbij! Je komt er wel! 💪❤️"
      }
      
      return fallbacks[context] || "Keep going, je doet het geweldig! 🌟"
    }
  }
}

export const groqService = GroqService.getInstance()