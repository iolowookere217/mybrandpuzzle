'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PuzzleQuestion } from '@/types'

interface QuizQuestionsProps {
  questions: PuzzleQuestion[]
  onComplete: (correctCount: number) => void
}

export function QuizQuestions({ questions, onComplete }: QuizQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [failed, setFailed] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Calculate score and check if all correct
      const correctCount = questions.reduce((count, q, index) => {
        return count + (selectedAnswers[index] === q.correctAnswer ? 1 : 0)
      }, 0)
      setShowResult(true)

      if (correctCount === questions.length) {
        // All answers correct - complete the campaign
        onComplete(correctCount)
      } else {
        // Some answers wrong - must retry
        setFailed(true)
      }
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResult(false)
    setFailed(false)
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  if (showResult) {
    const correctCount = questions.reduce((count, q, index) => {
      return count + (selectedAnswers[index] === q.correctAnswer ? 1 : 0)
    }, 0)

    if (failed) {
      return (
        <div className="text-center p-6 gaming-card rounded-xl">
          <h3 className="text-xl font-bold text-red-500 mb-4 font-[family-name:var(--font-orbitron)]">
            Not Quite Right
          </h3>
          <p className="text-3xl font-bold text-dark-100 mb-2">
            {correctCount} / {questions.length}
          </p>
          <p className="text-dark-400 mb-4">
            You need to answer all 3 questions correctly to complete this campaign.
          </p>
          <Button onClick={handleRetry} className="w-full">
            Try Again
          </Button>
        </div>
      )
    }

    return (
      <div className="text-center p-6 gaming-card rounded-xl">
        <h3 className="text-xl font-bold text-success mb-4 font-[family-name:var(--font-orbitron)]">
          Perfect Score!
        </h3>
        <p className="text-3xl font-bold text-dark-100 mb-2">
          {correctCount} / {questions.length}
        </p>
        <p className="text-dark-400">
          All answers correct! Campaign completed.
        </p>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="gaming-card rounded-xl p-6 max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-dark-500">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, index) => (
            <div
              key={index}
              className={'w-2 h-2 rounded-full ' + 
                (index === currentQuestion 
                  ? 'bg-primary-500' 
                  : index < currentQuestion 
                    ? 'bg-secondary-500' 
                    : 'bg-dark-700')}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold text-dark-100 mb-4">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={'w-full p-3 rounded-lg text-left transition-all duration-200 border ' +
              (selectedAnswers[currentQuestion] === index
                ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                : 'border-dark-700 bg-dark-800 text-dark-300 hover:border-dark-600')}
          >
            <span className="font-bold mr-2">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          variant="ghost"
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
