'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// Helper to get today's solved campaigns
const getTodayKey = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

const getSolvedCampaignsCount = (): number => {
  if (typeof window === 'undefined') return 0
  const key = 'solvedCampaigns_' + getTodayKey()
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved).length : 0
}



export default function UserDashboard() {
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [solvedToday, setSolvedToday] = useState(0)

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const endOfDay = new Date(now)
      endOfDay.setHours(23, 59, 59, 999)
      const diff = endOfDay.getTime() - now.getTime()
      
      setTimeRemaining({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setSolvedToday(getSolvedCampaignsCount())
  }, [])

  const formatNumber = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-100 font-[family-name:var(--font-orbitron)] mb-2">
          Player Dashboard
        </h1>
        <p className="text-dark-400">Track your progress and compete for daily prizes</p>
      </div>

      {/* Daily Countdown */}
      <Card className="gaming-card mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-dark-100 mb-1">Daily Reset Countdown</h3>
              <p className="text-sm text-dark-400">Leaderboard resets and prizes distributed at midnight</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-dark-800 rounded-lg p-3 text-center min-w-[60px]">
                <p className="text-2xl font-bold text-primary-500 font-mono">{formatNumber(timeRemaining.hours)}</p>
                <p className="text-xs text-dark-500">HRS</p>
              </div>
              <div className="bg-dark-800 rounded-lg p-3 text-center min-w-[60px]">
                <p className="text-2xl font-bold text-primary-500 font-mono">{formatNumber(timeRemaining.minutes)}</p>
                <p className="text-xs text-dark-500">MIN</p>
              </div>
              <div className="bg-dark-800 rounded-lg p-3 text-center min-w-[60px]">
                <p className="text-2xl font-bold text-primary-500 font-mono">{formatNumber(timeRemaining.seconds)}</p>
                <p className="text-xs text-dark-500">SEC</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary-500">{solvedToday}</p>
            <p className="text-sm text-dark-400">Solved Today</p>
          </CardContent>
        </Card>
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-secondary-500">127</p>
            <p className="text-sm text-dark-400">Total Solved</p>
          </CardContent>
        </Card>
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-success">#2</p>
            <p className="text-sm text-dark-400">Current Rank</p>
          </CardContent>
        </Card>
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-warning">N30K</p>
            <p className="text-sm text-dark-400">Potential Prize</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle className="text-lg">Play Puzzles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dark-400 mb-4">
              Solve more puzzles to increase your rank and win bigger prizes!
            </p>
            <Link href="/campaigns">
              <Button className="w-full">Browse Campaigns</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle className="text-lg">Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dark-400 mb-4">
              Check your ranking and see who is leading today!
            </p>
            <Link href="/leaderboard">
              <Button variant="outline" className="w-full">View Rankings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
