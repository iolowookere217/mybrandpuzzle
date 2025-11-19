'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { SlidePuzzle } from '@/components/game/slide-puzzle'
import { QuizQuestions } from '@/components/game/quiz-questions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

// Helper functions for tracking solved campaigns
const getTodayKey = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

const getSolvedCampaigns = (): string[] => {
  if (typeof window === 'undefined') return []
  const key = 'solvedCampaigns_' + getTodayKey()
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : []
}

const saveSolvedCampaign = (campaignId: string): boolean => {
  const solved = getSolvedCampaigns()
  if (solved.includes(campaignId)) {
    return false // Already solved today
  }
  solved.push(campaignId)
  const key = 'solvedCampaigns_' + getTodayKey()
  localStorage.setItem(key, JSON.stringify(solved))
  return true // Newly solved
}


const demoCampaigns = {
  '1': {
    id: '1',
    title: 'Nike Swoosh Challenge',
    brand: 'Nike',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    gridSize: 3 as const,
    questions: [
      { id: 'q1', question: 'What year was Nike founded?', options: ['1964', '1971', '1985', '1990'], correctAnswer: 0, campaignId: '1' },
      { id: 'q2', question: 'What is Nike famous slogan?', options: ['Just Do It', 'Impossible Is Nothing', 'Think Different', 'Have It Your Way'], correctAnswer: 0, campaignId: '1' },
      { id: 'q3', question: 'Who co-founded Nike?', options: ['Steve Jobs', 'Phil Knight', 'Mark Zuckerberg', 'Jeff Bezos'], correctAnswer: 1, campaignId: '1' },
    ],
    prizeAmount: 50000,
  },
  '2': {
    id: '2',
    title: 'Coca-Cola Classic',
    brand: 'Coca-Cola',
    imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop',
    gridSize: 3 as const,
    questions: [
      { id: 'q4', question: 'What year was Coca-Cola invented?', options: ['1876', '1886', '1896', '1906'], correctAnswer: 1, campaignId: '2' },
      { id: 'q5', question: 'Where was Coca-Cola first sold?', options: ['New York', 'Atlanta', 'Chicago', 'Los Angeles'], correctAnswer: 1, campaignId: '2' },
      { id: 'q6', question: 'What gives Coca-Cola its flavor?', options: ['Vanilla', 'Caramel', 'Cola nut and kola nut', 'Cinnamon'], correctAnswer: 2, campaignId: '2' },
    ],
    prizeAmount: 75000,
  },
  '3': {
    id: '3',
    title: 'MTN Network Challenge',
    brand: 'MTN',
    imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
    gridSize: 4 as const,
    questions: [
      { id: 'q7', question: 'What does MTN stand for?', options: ['Mobile Telephone Networks', 'Modern Telecom Network', 'Multi Tower Network', 'Main Telecom Nigeria'], correctAnswer: 0, campaignId: '3' },
      { id: 'q8', question: 'In which country was MTN founded?', options: ['Nigeria', 'Ghana', 'South Africa', 'Kenya'], correctAnswer: 2, campaignId: '3' },
      { id: 'q9', question: 'What is MTN signature color?', options: ['Blue', 'Red', 'Yellow', 'Green'], correctAnswer: 2, campaignId: '3' },
    ],
    prizeAmount: 100000,
  },
}

type GamePhase = 'puzzle' | 'questions' | 'complete'

export default function PlayPage() {
  const params = useParams()
  const campaignId = params.id as string
  
  const [phase, setPhase] = useState<GamePhase>('puzzle')
  
  const [questionsCorrect, setQuestionsCorrect] = useState(0)
  const [alreadySolved, setAlreadySolved] = useState(false)
  const [isNewCompletion, setIsNewCompletion] = useState(false)

  useEffect(() => {
    const solved = getSolvedCampaigns()
    setAlreadySolved(solved.includes(campaignId))
  }, [campaignId])

  const campaign = demoCampaigns[campaignId as keyof typeof demoCampaigns]

  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-dark-100 mb-4">Campaign not found</h1>
        <Link href="/campaigns"><Button>Back to Campaigns</Button></Link>
      </div>
    )
  }

  const handlePuzzleSolved = () => {
    setTimeout(() => setPhase('questions'), 1500)
  }

  const handleQuestionsComplete = (correctCount: number) => {
    setQuestionsCorrect(correctCount)
    const newlySolved = saveSolvedCampaign(campaignId)
    setIsNewCompletion(newlySolved)
    setPhase('complete')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-100 font-[family-name:var(--font-orbitron)] mb-2">{campaign.title}</h1>
        <p className="text-dark-400">by {campaign.brand}</p>
        {alreadySolved && (
          <div className="mt-4 p-3 rounded-lg bg-warning/20 border border-warning/50 text-sm">
            <p className="text-warning font-semibold">You have already solved this campaign today</p>
            <p className="text-dark-400">Replaying will not increase your count</p>
          </div>
        )}
      </div>

      {phase === 'puzzle' && (
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm text-primary-500 font-semibold mb-2">STEP 1 OF 2</p>
            <h2 className="text-xl font-bold text-dark-100">Solve the Puzzle</h2>
            <p className="text-dark-400 text-sm mt-1">Rearrange the pieces to match the reference image</p>
          </div>
          <SlidePuzzle imageUrl={campaign.imageUrl} onSolve={handlePuzzleSolved} />
        </div>
      )}

      {phase === 'questions' && (
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <p className="text-sm text-primary-500 font-semibold mb-2">STEP 2 OF 2</p>
            <h2 className="text-xl font-bold text-dark-100">Answer Questions</h2>
            <p className="text-dark-400 text-sm mt-1">Test your knowledge about {campaign.brand}</p>
          </div>
          <QuizQuestions questions={campaign.questions} onComplete={handleQuestionsComplete} />
        </div>
      )}

      {phase === 'complete' && (
        <div className="max-w-md mx-auto text-center">
          <Card className="gaming-card">
            <CardHeader>
              <CardTitle className="text-2xl text-gradient font-[family-name:var(--font-orbitron)]">Challenge Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isNewCompletion ? (
                <div className="p-6 rounded-xl bg-success/20 border border-success">
                  <p className="text-2xl font-bold text-success mb-2">+1 Campaign Solved!</p>
                  <p className="text-dark-300 text-sm">This counts towards your daily ranking</p>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-dark-800/50 border border-warning/50">
                  <p className="text-xl font-bold text-warning mb-2">Already Completed Today</p>
                  <p className="text-dark-400 text-sm">This replay does not add to your count</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-dark-800/30">
                  <p className="text-lg font-bold text-success">Done</p>
                  <p className="text-xs text-dark-400">Puzzle Solved</p>
                  <p className="text-xs text-dark-500">Done</p>
                </div>
                <div className="p-4 rounded-lg bg-dark-800/30">
                  <p className="text-lg font-bold text-secondary-500">{questionsCorrect}/3</p>
                  <p className="text-xs text-dark-400">Questions</p>
                  <p className="text-xs text-dark-500">Correct answers</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/leaderboard"><Button className="w-full">View Leaderboard</Button></Link>
                <Link href="/campaigns"><Button variant="outline" className="w-full">Play More</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
