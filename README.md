# ServeAI

AI-powered restaurant analytics platform for small restaurants in Milwaukee.

## 🎯 Project Overview

ServeAI provides actionable menu recommendations to help restaurant owners make data-driven decisions instead of guessing. Built for restaurants that need straightforward guidance, not just raw data.

## 📁 Folder Structure

```
Website/
├── app/                 # Next.js app (pages & API routes)
│   ├── api/            # Backend API endpoints
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
│
├── components/         # React components
├── lib/                # Utilities & helpers
├── types/              # TypeScript types
├── public/             # Static assets
│
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel (recommended)

## 📝 Core Features to Build

1. **Authentication** - Restaurant owner login/signup
2. **Dashboard** - KPIs and metrics overview
3. **Menu Management** - CRUD operations for menu items
4. **Analytics** - Sales trends and performance
5. **AI Recommendations** - AI-generated insights

## 🗂️ Project Context

**Target Users**: Small restaurant owners in Milwaukee  
**Problem**: Guessing menu decisions due to lack of accessible analytics  
**Solution**: AI-driven recommendations with specific, actionable guidance

**Current Status**: Idea stage, 2 months of market research, 5 restaurant owners interviewed

## 📖 Next Steps

1. Build out pages in `app/`
2. Create components in `components/`
3. Add API routes in `app/api/`
4. Define types in `types/`
5. Add utilities in `lib/`

See `STRUCTURE.md` for more details.
