'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BrandDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-100 font-[family-name:var(--font-orbitron)] mb-2">
          Brand Dashboard
        </h1>
        <p className="text-dark-400">Manage your puzzle campaigns and track engagement</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary-500">3</p>
            <p className="text-sm text-dark-400">Active Campaigns</p>
          </CardContent>
        </Card>
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-secondary-500">1,247</p>
            <p className="text-sm text-dark-400">Total Plays</p>
          </CardContent>
        </Card>
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-success">89%</p>
            <p className="text-sm text-dark-400">Completion Rate</p>
          </CardContent>
        </Card>
        <Card className="gaming-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-warning">N225K</p>
            <p className="text-sm text-dark-400">Total Prize Pool</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dark-400 mb-4">
              Upload your brand image and create 3 questions for players to solve and answer.
            </p>
            <Link href="/brand/campaigns/create">
              <Button className="w-full">Create Campaign</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="gaming-card">
          <CardHeader>
            <CardTitle>View Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dark-400 mb-4">
              Track player engagement, completion rates, and campaign performance.
            </p>
            <Button variant="outline" className="w-full">View Analytics</Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle>Your Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-dark-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-500">1</span>
                </div>
                <div>
                  <p className="font-semibold text-dark-100">Summer Brand Challenge</p>
                  <p className="text-sm text-dark-400">523 plays - 92% completion</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-success/20 text-success">Active</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-dark-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-secondary-500">2</span>
                </div>
                <div>
                  <p className="font-semibold text-dark-100">Product Launch Puzzle</p>
                  <p className="text-sm text-dark-400">384 plays - 87% completion</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-success/20 text-success">Active</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-dark-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-warning">3</span>
                </div>
                <div>
                  <p className="font-semibold text-dark-100">Logo Recognition Game</p>
                  <p className="text-sm text-dark-400">340 plays - 85% completion</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-success/20 text-success">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
