'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'USER' as 'USER' | 'BRAND'
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Demo signup logic
    setTimeout(() => {
      if (formData.password === formData.confirmPassword) {
        // Store demo user session
        localStorage.setItem('user', JSON.stringify({
          id: Date.now().toString(),
          email: formData.email,
          name: formData.name,
          role: formData.accountType
        }))
        
        // Redirect based on role
        if (formData.accountType === 'BRAND') {
          router.push('/brand/setup')
        } else {
          router.push('/user')
        }
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join BrandAware and start your journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold mb-1" style={{color: '#08090c'}}>
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-1" style={{color: '#08090c'}}>
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-1" style={{color: '#08090c'}}>
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold mb-1" style={{color: '#08090c'}}>
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{color: '#08090c'}}>
                Account Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="accountType"
                    value="USER"
                    checked={formData.accountType === 'USER'}
                    onChange={(e) => setFormData({...formData, accountType: e.target.value as 'USER' | 'BRAND'})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium" style={{color: '#08090c'}}>User - Browse and participate in campaigns</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="accountType"
                    value="BRAND"
                    checked={formData.accountType === 'BRAND'}
                    onChange={(e) => setFormData({...formData, accountType: e.target.value as 'USER' | 'BRAND'})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium" style={{color: '#08090c'}}>Brand - Create and manage campaigns</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium" style={{color: '#08090c'}}>
              Already have an account?{' '}
              <Link href="/auth/login" className="hover:underline font-bold" style={{color: '#4d8b31'}}>
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}