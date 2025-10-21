# Groq API Setup (100% FREE!)

## Why Groq?
- ✅ **Completely FREE** - No credit card required
- ✅ **Very Fast** - One of the fastest inference speeds
- ✅ **Good Quality** - Llama 3.3 70B is very capable
- ✅ **Generous Limits** - 30 requests/minute free tier
- ✅ **No Payment** - Never asks for payment info

## Setup Steps (Takes 2 Minutes)

1. **Go to Groq Console**
   - Visit: https://console.groq.com/keys

2. **Sign Up/Login**
   - Sign up with Google, GitHub, or email
   - No credit card required!

3. **Create API Key**
   - Click "Create API Key"
   - Give it a name (e.g., "PostPilot")
   - Copy the key (starts with `gsk_...`)

4. **Add to .env.local**
   ```bash
   GROQ_API_KEY=gsk_your_actual_key_here
   ```

5. **Restart Dev Server**
   ```bash
   npm run dev
   ```

6. **Done!** 🎉
   - Go to http://localhost:3000
   - Generate amazing LinkedIn posts for FREE!

## Model Info
- **Model:** Llama 3.3 70B Versatile
- **Quality:** Very good, comparable to GPT-4
- **Speed:** Super fast (~100 tokens/second)
- **Free Tier:** 30 requests/minute, 14,400/day

## Comparison

| Service | Cost | Quality | Speed | Setup |
|---------|------|---------|-------|-------|
| **Groq** | FREE | Very Good | Super Fast | 2 min |
| Google Gemini | FREE | Good | Medium | 2 min |
| OpenRouter | Paid | Excellent | Medium | 5 min + payment |

**Recommendation:** Start with Groq (FREE). If you need the absolute best quality later, consider OpenRouter with Claude.
