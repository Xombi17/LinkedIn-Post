# API Setup Guide

## Option 1: Google Gemini (FREE - Recommended)

Google's Gemini 1.5 Flash is completely free with generous limits.

### Steps:
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the key that starts with `AIzaSy...`
5. Open `.env.local` and replace `your_google_api_key_here` with your actual key:
   ```
   GOOGLE_API_KEY=AIzaSy...your_actual_key
   ```
6. Restart your dev server

### Free Tier Limits:
- 1,500 requests per day
- 1 million tokens per minute
- More than enough for personal use!

## Option 2: OpenRouter (Paid)

OpenRouter requires you to add credits to your account.

### Steps:
1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up/Login
3. Go to [Keys](https://openrouter.ai/keys) to get your API key
4. Go to [Credits](https://openrouter.ai/credits) and add $5-10
5. Add key to `.env.local`:
   ```
   OPENROUTER_API_KEY=sk-or-v1-...
   ```

## Which Should You Use?

**Use Google Gemini** if:
- ✅ You want completely free
- ✅ You're okay with good (not best) quality
- ✅ Personal/hobby projects

**Use OpenRouter** if:
- You need the best quality (Claude 3.5 Sonnet)
- You're building a commercial product
- You don't mind paying $0.003 per request

## Current Status

Your app is currently configured to use **Google Gemini (free)** by default.
