import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.1),transparent_70%)]"></div>
        <div className="relative container mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight font-[family-name:var(--font-orbitron)]">
              Solve Puzzles,<br />
              <span className="text-gradient">Win Daily Prizes</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Rearrange brand puzzles, answer questions, and compete for cash prizes. Top 10 players win every 24 hours!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/campaigns" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  Start Playing
                </Button>
              </Link>
              <Link href="/leaderboard" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary-500/10 animate-float hidden lg:block"></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-secondary-500/10 animate-pulse-glow hidden lg:block"></div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 font-[family-name:var(--font-orbitron)] mb-4">
              How It Works
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Three simple steps to win daily prizes
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="gaming-card text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center text-3xl">
                  1
                </div>
                <h3 className="text-lg font-bold text-dark-100 mb-2">Solve Puzzle</h3>
                <p className="text-sm text-dark-400">
                  Rearrange the scrambled image pieces to match the original brand image
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary-500/20 flex items-center justify-center text-3xl">
                  2
                </div>
                <h3 className="text-lg font-bold text-dark-100 mb-2">Answer Questions</h3>
                <p className="text-sm text-dark-400">
                  Test your knowledge by answering 3 questions about the brand
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center text-3xl">
                  3
                </div>
                <h3 className="text-lg font-bold text-dark-100 mb-2">Win Prizes</h3>
                <p className="text-sm text-dark-400">
                  Top 10 daily solvers share the prize pool - resets every 24 hours!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20 bg-dark-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-primary-500 mb-2">N225K</p>
              <p className="text-dark-400">Daily Prize Pool</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-secondary-500 mb-2">10</p>
              <p className="text-dark-400">Daily Winners</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-success mb-2">24h</p>
              <p className="text-dark-400">Reset Cycle</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-warning mb-2">100+</p>
              <p className="text-dark-400">Active Puzzles</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 font-[family-name:var(--font-orbitron)] mb-4">
            Ready to Play?
          </h2>
          <p className="text-dark-400 mb-8 max-w-2xl mx-auto">
            Sign in with Google and start solving puzzles to win daily prizes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/brand">
              <Button variant="outline" size="lg" className="px-8">
                For Brands
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
