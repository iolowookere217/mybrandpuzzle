'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/user' })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to PuzzleBrand</CardTitle>
          <CardDescription>
            Sign in to solve puzzles and win daily prizes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button 
            onClick={handleGoogleSignIn} 
            className="w-full bg-dark-800 hover:bg-dark-700 text-dark-100 border border-dark-600"
            size="lg"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-dark-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-dark-900 px-2 text-dark-500">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-dark-400">
              Are you a brand?{' '}
              <Link href="/brand/auth" className="text-secondary-500 hover:text-secondary-400 font-semibold">
                Brand Portal
              </Link>
            </p>
          </div>

          <div className="p-4 rounded-lg bg-dark-800/50 border border-primary-500/20">
            <h4 className="text-sm font-bold text-primary-500 mb-2">How it works:</h4>
            <ul className="text-xs text-dark-300 space-y-1">
              <li>1. Sign in with your Google account</li>
              <li>2. Solve brand puzzles by rearranging pieces</li>
              <li>3. Answer 3 questions about each brand</li>
              <li>4. Top 10 daily solvers win prizes!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
