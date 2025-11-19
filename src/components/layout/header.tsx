'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function Header() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <header className="bg-dark-950/95 backdrop-blur-md border-b border-primary-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 shadow-primary">
            <span className="text-dark-950 font-bold text-lg">P</span>
          </div>
          <span className="text-2xl font-bold text-gradient font-[family-name:var(--font-orbitron)]">
            PuzzleBrand
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-dark-300 hover:text-primary-500 font-medium transition-colors duration-200">
            Home
          </Link>
          <Link href="/campaigns" className="text-dark-300 hover:text-primary-500 font-medium transition-colors duration-200">
            Campaigns
          </Link>
          <Link href="/leaderboard" className="text-dark-300 hover:text-primary-500 font-medium transition-colors duration-200">
            Leaderboard
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Link href={user.role === 'BRAND' ? '/brand' : '/user'}>
                <Button variant="outline" className="border-primary-500/50 text-primary-500 hover:bg-primary-500/10 hover:border-primary-500">
                  Dashboard
                </Button>
              </Link>
              <Button 
                onClick={handleSignOut}
                className="bg-dark-800 hover:bg-dark-700 text-dark-100"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/brand" className="hidden sm:block">
                <Button variant="outline" className="border-secondary-500/50 text-secondary-500 hover:bg-secondary-500/10 hover:border-secondary-500">
                  For Brands
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button className="bg-gradient-primary hover:opacity-90 text-dark-950 font-semibold shadow-primary">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
