export interface User {
  id: string
  email: string
  name: string
  image?: string
  role: 'USER' | 'BRAND' | 'ADMIN'
  googleId?: string
  solvedToday: number
  totalSolved: number
  createdAt: Date
  updatedAt: Date
}

// Puzzle Campaign specific types
export interface PuzzleCampaign {
  id: string
  title: string
  description: string
  imageUrl: string
  thumbnailUrl?: string
  questions: PuzzleQuestion[]
  prizeAmount: number
  brandId: string
  brand?: Brand
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED'
  gridSize: 3 | 4 | 5
  startTime: Date
  endTime: Date
  participations?: PuzzleParticipation[]
  createdAt: Date
  updatedAt: Date
}

export interface PuzzleQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  campaignId: string
}

export interface PuzzleParticipation {
  id: string
  userId: string
  campaignId: string
  puzzleSolved: boolean
  puzzleSolveTime?: number
  questionsCorrect: number
  totalScore: number
  completedAt?: Date
  createdAt: Date
}

export interface DailyLeaderboard {
  id: string
  date: string
  entries: DailyLeaderboardEntry[]
  prizeDistributed: boolean
  totalPrize: number
  createdAt: Date
}

export interface DailyLeaderboardEntry {
  oderId: string
  userName: string
  userImage?: string
  solvedCount: number
  rank: number
  prize?: number
}

export interface PuzzlePiece {
  id: number
  currentPosition: number
  correctPosition: number
  imageX: number
  imageY: number
}

export interface Brand {
  id: string
  name: string
  description?: string
  logo?: string
  industry?: string
  size: 'STARTUP' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE'
  userId: string
  user?: User
  campaigns?: PuzzleCampaign[]
  createdAt: Date
  updatedAt: Date
}

// Legacy types kept for compatibility
export interface Campaign {
  id: string
  title: string
  description: string
  content: CampaignContent[]
  questions: Question[]
  prizeAmount: number
  prizeDescription: string
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'PAUSED'
  startDate: Date
  endDate: Date
  brandId: string
  brand: Brand
  participations: Participation[]
  leaderboard: LeaderboardEntry[]
  createdAt: Date
  updatedAt: Date
}

export interface CampaignContent {
  id: string
  type: 'VIDEO' | 'IMAGE' | 'TEXT'
  url?: string
  text?: string
  order: number
  campaignId: string
  campaign?: Campaign
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  order: number
  campaignId: string
  campaign?: Campaign
  aiGenerated: boolean
  approved: boolean
}

export interface Participation {
  id: string
  userId: string
  user?: User
  campaignId: string
  campaign?: Campaign
  answers: Answer[]
  score: number
  completedAt?: Date
  reportCardShared: boolean
  socialEngagement: SocialEngagement[]
  createdAt: Date
  updatedAt: Date
}

export interface Answer {
  id: string
  questionId: string
  question?: Question
  selectedAnswer: number
  isCorrect: boolean
  participationId: string
  participation?: Participation
}

export interface SocialEngagement {
  id: string
  platform: 'FACEBOOK' | 'INSTAGRAM' | 'TWITTER' | 'LINKEDIN' | 'TIKTOK'
  type: 'LIKE' | 'SHARE' | 'COMMENT' | 'REPOST'
  count: number
  participationId: string
  participation?: Participation
  createdAt: Date
}

export interface LeaderboardEntry {
  id: string
  userId: string
  user?: User
  campaignId: string
  campaign?: Campaign
  participationId: string
  participation?: Participation
  score: number
  engagementScore: number
  totalScore: number
  rank: number
  prize?: number
  createdAt: Date
  updatedAt: Date
}

export interface ReportCard {
  id: string
  participationId: string
  participation?: Participation
  content: string
  shareableLink: string
  socialPlatforms: string[]
  shared: boolean
  createdAt: Date
}

export type CampaignFilters = {
  industry?: string
  brandSize?: Brand['size']
  prizeRange?: {
    min: number
    max: number
  }
  status?: Campaign['status']
  search?: string
}

export type LeaderboardFilters = {
  campaignId?: string
  period?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME'
  limit?: number
}

export type DashboardStats = {
  totalCampaigns: number
  activeCampaigns: number
  totalParticipations: number
  totalPrizePool: number
  avgEngagementRate: number
}

export type UserStats = {
  totalParticipations: number
  completedCampaigns: number
  totalPrizesWon: number
  currentRank?: number
  totalShares: number
  solvedToday: number
}
