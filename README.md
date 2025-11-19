# BrandAware - Interactive Marketing Platform

BrandAware is a gamified marketing and advertisement platform that enables companies and brands to promote their products, services, or campaigns in an interactive way.

## Features

### For Brands/Companies
- **Campaign Management**: Create and manage interactive marketing campaigns
- **Content Upload**: Upload videos, images, text, or combinations
- **AI-Powered Q&A**: Auto-generate interactive Q&A from uploaded content
- **Content Approval**: Edit and approve generated Q&A before campaigns go live
- **Analytics Dashboard**: Track engagement and performance metrics

### For Users
- **Campaign Discovery**: Browse and search campaigns by brand size, industry, popularity, or prize type
- **Interactive Engagement**: View campaign content and answer generated Q&A
- **Rewards System**: Compete for cash prizes through leaderboards
- **Social Sharing**: Generate and share achievement report cards
- **Gamification**: Earn points and climb leaderboards

### Core Systems
- **Leaderboard System**: Rankings based on quiz performance + social media engagement
- **Prize Distribution**: Top 10 users receive cash rewards at campaign end
- **Report Card Generation**: Shareable achievement summaries with CTAs
- **Social Integration**: Track likes, shares, and engagement across platforms

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **UI Components**: Custom component library (Shadcn UI style)
- **State Management**: React hooks and local storage (demo)
- **Database**: JSON-based demo data (production would use PostgreSQL/MongoDB)
- **Authentication**: Simple demo auth system

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Open your browser** to `http://localhost:3000`

### Demo Accounts

The application includes demo authentication:

- **User Account**: user@demo.com / demo123
- **Brand Account**: brand@demo.com / demo123

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── brand/             # Brand dashboard and management
│   ├── campaigns/         # Campaign browsing and interaction
│   ├── leaderboard/       # Leaderboard display
│   ├── user/              # User dashboard
│   └── layout.tsx         # Root layout with header/footer
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── brand/             # Brand-specific components
│   └── user/              # User-specific components
├── lib/
│   ├── db.ts              # Database operations (demo)
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript type definitions
```

## Key Features Implemented

### 1. Homepage
- Hero section with value proposition
- Feature overview for users and brands
- Statistics and call-to-action sections

### 2. Authentication System
- Login/signup forms with role selection
- Demo account credentials
- Route protection and role-based access

### 3. Campaign System
- **Campaign Browsing**: Filter by industry, prize range, search
- **Campaign Details**: Content review before quiz
- **Interactive Quiz**: Step-by-step question answering
- **Progress Tracking**: Visual progress indicators
- **Score Calculation**: Performance-based scoring

### 4. Brand Dashboard
- **Campaign Management**: Create, edit, and monitor campaigns
- **Content Upload**: Support for text, images, and videos
- **AI Q&A Generation**: Simulated AI question generation
- **Analytics Overview**: Campaign performance metrics

### 5. User Dashboard
- **Personal Statistics**: Completed campaigns, points, rankings
- **Activity History**: Recent completions and achievements
- **Recommended Campaigns**: Personalized suggestions
- **Progress Tracking**: Achievement goals and milestones

### 6. Leaderboard System
- **Campaign-Specific Rankings**: Individual campaign leaderboards
- **Scoring Algorithm**: Quiz performance + social engagement
- **Prize Structure**: Clear reward distribution (1st: ₦50k, 2nd: ₦30k, etc.)
- **Real-time Updates**: Dynamic ranking updates

### 7. Report Card System
- **Achievement Sharing**: Generate shareable content
- **Social Media Integration**: Pre-formatted share text
- **Call-to-Action**: Referral links for viral growth
- **Platform Optimization**: Formatted for multiple social platforms

## Demo Data

The application includes comprehensive demo data:
- **2 Demo Brands**: Tata Africa (Agriculture) and TechCorp Nigeria (Technology)
- **2 Active Campaigns**: Tractor knowledge quiz and innovation challenge
- **Sample Questions**: AI-generated questions with explanations
- **Leaderboard Data**: Sample rankings with prize allocations

## Navigation

- **Homepage**: `/` - Landing page with features overview
- **Browse Campaigns**: `/campaigns` - Filter and discover campaigns
- **Campaign Details**: `/campaigns/[id]` - Take quizzes and view content
- **Leaderboard**: `/leaderboard` - View rankings and prizes
- **User Dashboard**: `/user` - Personal stats and progress
- **Brand Dashboard**: `/brand` - Create and manage campaigns
- **Authentication**: `/auth/login` and `/auth/signup`

---

**BrandAware** - Connecting brands with engaged audiences through interactive, gamified marketing campaigns.
