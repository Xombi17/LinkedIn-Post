'use client';

import { useState } from 'react';

interface AnalysisResult {
  score: number;
  tips: string[];
  optimizedPosts: string[];
}

export default function Optimizer() {
  const [postText, setPostText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);

  const analyzePost = async () => {
    if (!postText.trim()) return;

    setLoading(true);
    const prompt = `Analyze the following LinkedIn post for engagement and readability:

${postText}

Provide:
1. A score from 0-100
2. Three specific tips to improve it
3. Three optimized versions of the post implementing your suggestions

Format your response EXACTLY as:
Score: [number]
Tips:
1. [tip]
2. [tip]
3. [tip]

Optimized Version 1:
[full optimized post]

Optimized Version 2:
[full optimized post with different approach]

Optimized Version 3:
[full optimized post with another approach]

IMPORTANT:
- Each optimized version should implement the improvement tips
- Make each version unique with different hooks, structures, or emphasis
- Keep the core message but enhance engagement, readability, and impact
- Use emojis naturally (2-4 per post)
- Include line breaks for readability`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'optimize', prompt }),
      });

      const data = await res.json();
      if (data.text) {
        // Parse the response
        const scoreMatch = data.text.match(/Score:\s*(\d+)/i);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
        
        const tipsMatch = data.text.match(/Tips?:\s*([\s\S]*?)(?=Optimized Version|$)/i);
        const tipsText = tipsMatch ? tipsMatch[1] : '';
        const tips = tipsText
          .split(/\d+\./)
          .filter((tip: string) => tip.trim())
          .map((tip: string) => tip.trim())
          .slice(0, 3);

        // Parse optimized versions
        const version1Match = data.text.match(/Optimized Version 1:\s*([\s\S]*?)(?=Optimized Version 2|$)/i);
        const version2Match = data.text.match(/Optimized Version 2:\s*([\s\S]*?)(?=Optimized Version 3|$)/i);
        const version3Match = data.text.match(/Optimized Version 3:\s*([\s\S]*?)$/i);

        const optimizedPosts = [
          version1Match ? version1Match[1].trim() : '',
          version2Match ? version2Match[1].trim() : '',
          version3Match ? version3Match[1].trim() : ''
        ].filter(post => post.length > 0);

        setAnalysis({ score, tips, optimizedPosts });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const savePost = (text: string, index: number) => {
    setSavingIndex(index);
    const saved = JSON.parse(localStorage.getItem('posts') || '[]');
    const newPost = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
    };
    saved.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(saved));
    
    setTimeout(() => {
      setSavingIndex(null);
      alert('Post saved!');
    }, 500);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Your Post *
        </label>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Paste your LinkedIn post here for analysis and get actionable feedback..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base"
          rows={8}
        />
      </div>

      <button
        onClick={analyzePost}
        disabled={loading || !postText.trim()}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl text-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Your Post...
          </span>
        ) : '📊 Analyze Post'}
      </button>

      {analysis && (
        <div className="mt-8 space-y-5 animate-fade-in">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <div className="inline-block relative">
                <svg className="w-32 h-32" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${(analysis.score / 100) * 339.292} 339.292`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {analysis.score}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">/ 100</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-lg font-bold text-gray-800">Engagement Score</div>
                <div className="text-sm text-gray-600 mt-1">
                  {analysis.score >= 80 ? '🚀 Excellent!' : analysis.score >= 60 ? '👍 Good job!' : analysis.score >= 40 ? '💡 Room for improvement' : '✏️ Needs work'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              💡 Improvement Tips
            </h3>
            <ul className="space-y-4">
              {analysis.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                  <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full flex items-center justify-center text-sm">
                    {idx + 1}
                  </span>
                  <span className="text-gray-800 leading-relaxed text-base">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optimized Versions */}
          {analysis.optimizedPosts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-800">✨ Optimized Versions</h3>
                <span className="text-sm text-gray-500 bg-emerald-100 px-3 py-1 rounded-full font-medium">
                  {analysis.optimizedPosts.length} versions
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Here are {analysis.optimizedPosts.length} improved versions implementing the suggestions above. Choose your favorite!
              </p>
              
              {analysis.optimizedPosts.map((post, idx) => (
                <div key={idx} className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-gray-800">Version {idx + 1}</h4>
                    </div>
                    <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                      {post.split(' ').length} words
                    </span>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 border border-emerald-200 mb-4">
                    <p className="whitespace-pre-wrap text-gray-900 leading-relaxed text-base">{post}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => copyToClipboard(post)}
                      className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2.5 px-4 rounded-lg transition-all border-2 border-gray-300 hover:border-emerald-400 shadow-sm hover:shadow-md"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => savePost(post, idx)}
                      disabled={savingIndex === idx}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                    >
                      {savingIndex === idx ? '✅ Saved!' : '💾 Save'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
