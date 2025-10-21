# PostPilot Lite

**Write. Rewrite. Shine on LinkedIn — in one click.**

A beautiful, modern AI-powered web app built with Next.js and TailwindCSS to help you generate, rewrite, enhance, and optimize LinkedIn posts using OpenRouter AI.

## 🎉 What's New!

### Modern Landing Page with Animations
- Stunning dark-themed hero section with gradient animations
- Interactive feature cards with hover effects
- Smooth scroll animations and transitions
- "Get Started" flow that transitions to the app
- Fully responsive design for all devices

### Enhanced Tool (NEW!)
- 9 different enhancement types for your posts
- Make posts longer/shorter, add storytelling, improve hooks
- Custom enhancement instructions
- Perfect for iterating on generated content

### 3 Optimized Post Versions!

The Optimizer doesn't just analyze your posts anymore — it creates **3 fully optimized versions** implementing the improvement suggestions! Each version has a unique approach, so you can choose your favorite and post immediately. 🚀

## Features

### ✍️ Post Generator
- Write professional, engaging LinkedIn posts with AI assistance
- Choose from 6 tone options: Professional, Storytelling, Technical, Personal, Inspirational, Educational
- Control post length: Short, Medium, or Long
- Add context, target audience, and call-to-action for personalized posts
- Beautiful, responsive UI with real-time word count
- Copy, regenerate, or save generated posts

### 🔄 Rewrite Mode
- Transform existing LinkedIn posts for new contexts
- Customize with name, event, and highlight details
- Choose from 5 different tones
- Maintain style while creating completely original content

### ✨ Enhance
- Take any existing post and improve it in specific ways
- Choose from 9 enhancement types:
  - Make it longer or shorter
  - Add more storytelling or professionalism
  - Make it more casual or add data/statistics
  - Improve the hook or add call-to-action
  - Custom enhancements with your own instructions
- Perfect for iterating on generated posts
- Maintains the original voice while improving impact

### 📊 Optimizer
- Analyze your posts for engagement and readability
- Get a visual engagement score from 0-100 with circular progress
- Receive 3 specific, actionable improvement tips
- **Get 3 optimized versions** of your post implementing the suggestions
- Each version has a unique approach and hook
- Copy or save any optimized version directly
- Beautiful gradient UI with animated results

### 📁 My Posts
- Save posts to browser localStorage
- Copy or delete saved posts
- Persistent storage across sessions

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

Get your API key from [OpenRouter](https://openrouter.ai/) and add it to `.env.local`:

```
OPENROUTER_API_KEY=your_actual_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** TailwindCSS with custom gradients and animations
- **AI:** OpenRouter API (Claude 3.5 Sonnet)
- **Language:** TypeScript
- **Storage:** Browser localStorage
- **UI/UX:** Modern dark theme with glassmorphism effects, responsive design with animated backgrounds, smooth transitions, and visual feedback
- **Design:** Consistent dark purple/blue gradient theme across landing page and main app

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Make sure to add your `OPENROUTER_API_KEY` as an environment variable in Vercel project settings.

## Project Structure

```
.
├── app/
│   ├── api/generate/route.ts    # API proxy to OpenRouter
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page with tabs
│   └── globals.css              # Global styles
├── components/
│   ├── PostGenerator.tsx        # Generate posts
│   ├── RewriteSection.tsx       # Rewrite posts
│   ├── Optimizer.tsx            # Analyze posts
│   └── SavedPosts.tsx           # View saved posts
└── package.json
```

## License

MIT
