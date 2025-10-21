import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { mode, prompt } = await req.json();

    const groqApiKey = process.env.GROQ_API_KEY;
    
    // Check if we have the API key
    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured. Get a FREE API key at: https://console.groq.com/keys' },
        { status: 500 }
      );
    }
    
    console.log('Using Groq API (Free & Fast)...');
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Free, fast, and high quality
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: mode === 'optimize' ? 3000 : 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Groq error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate content', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || 'No response generated';

    console.log('✅ Groq response received successfully');
    return NextResponse.json({ text, mode }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
