'use client';

import { useState } from 'react';

export default function Enhance() {
  const [originalPost, setOriginalPost] = useState('');
  const [enhanceType, setEnhanceType] = useState('make_longer');
  const [customInstruction, setCustomInstruction] = useState('');
  const [enhanced, setEnhanced] = useState('');
  const [loading, setLoading] = useState(false);

  const enhanceOptions = [
    { value: 'make_longer', label: '📏 Make it Longer', description: 'Expand with more details and examples' },
    { value: 'make_shorter', label: '✂️ Make it Shorter', description: 'Condense while keeping key points' },
    { value: 'more_storytelling', label: '📖 Add More Storytelling', description: 'Include narrative elements and personal touches' },
    { value: 'more_professional', label: '💼 Make it More Professional', description: 'Enhance formality and business tone' },
    { value: 'more_casual', label: '😊 Make it More Casual', description: 'Add conversational and friendly tone' },
    { value: 'add_data', label: '📊 Add Data & Statistics', description: 'Include numbers and metrics where relevant' },
    { value: 'add_hooks', label: '🎣 Improve Hook', description: 'Create a more compelling opening' },
    { value: 'add_cta', label: '👉 Add Call-to-Action', description: 'Include engagement prompts' },
    { value: 'custom', label: '✨ Custom Enhancement', description: 'Specify your own instructions' },
  ];

  const enhancePost = async () => {
    if (!originalPost.trim()) return;

    setLoading(true);

    let instruction = '';
    
    switch (enhanceType) {
      case 'make_longer':
        instruction = 'Expand this post to be longer (400-500 words). Add more details, examples, personal insights, and storytelling elements while maintaining the core message. Include 3-5 relevant emojis and use proper line breaks.';
        break;
      case 'make_shorter':
        instruction = 'Condense this post to be shorter and more concise (150-200 words) while keeping all the key points and impact. Make every word count. Include 2-3 emojis.';
        break;
      case 'more_storytelling':
        instruction = 'Rewrite this post with more storytelling elements. Add a personal narrative arc, emotional moments, and relatable experiences. Make it feel like a journey. Include 3-4 emojis naturally.';
        break;
      case 'more_professional':
        instruction = 'Rewrite this post with a more professional, business-focused tone. Use industry terminology appropriately, maintain credibility, and sound authoritative while still being engaging. Include 2-3 professional emojis sparingly.';
        break;
      case 'more_casual':
        instruction = 'Rewrite this post with a more casual, conversational tone. Make it feel like talking to a friend while maintaining professionalism. Add personality and warmth. Include 4-5 fun emojis.';
        break;
      case 'add_data':
        instruction = 'Enhance this post by adding relevant data points, statistics, percentages, or numbers that support the message. If specific data isn\'t provided, suggest [Insert data: description] placeholders. Include 2-3 emojis.';
        break;
      case 'add_hooks':
        instruction = 'Rewrite this post with a much stronger, attention-grabbing opening hook. The first line should make people stop scrolling. Keep the rest of the content largely the same. Include 3-4 emojis.';
        break;
      case 'add_cta':
        instruction = 'Enhance this post by adding a strong call-to-action at the end that encourages engagement (comments, shares, questions). Make it natural and compelling. Include 3-4 emojis.';
        break;
      case 'custom':
        instruction = customInstruction || 'Improve this post while maintaining its core message and authenticity.';
        break;
    }

    const prompt = `You are an expert LinkedIn content enhancer. Take the following post and enhance it according to these instructions:

INSTRUCTIONS: ${instruction}

ORIGINAL POST:
${originalPost}

IMPORTANT:
- Maintain the core message and authenticity of the original
- Use short paragraphs and line breaks for readability
- Make it engaging and LinkedIn-appropriate
- Keep the author's voice intact while improving it
- Use emojis naturally (don't overdo it)

Write the enhanced LinkedIn post now:`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'enhance', prompt }),
      });

      const data = await res.json();
      if (data.text) {
        setEnhanced(data.text);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to enhance post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhanced);
    alert('Copied to clipboard!');
  };

  const savePost = () => {
    const saved = JSON.parse(localStorage.getItem('posts') || '[]');
    const newPost = {
      id: Date.now().toString(),
      text: enhanced,
      timestamp: Date.now(),
    };
    saved.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(saved));
    alert('Post saved!');
  };

  const selectedOption = enhanceOptions.find(opt => opt.value === enhanceType);

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Your Post *
        </label>
        <textarea
          value={originalPost}
          onChange={(e) => setOriginalPost(e.target.value)}
          placeholder="Paste the post you want to enhance here..."
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 resize-none text-base text-white placeholder-gray-400"
          rows={6}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Enhancement Type
        </label>
        <select
          value={enhanceType}
          onChange={(e) => setEnhanceType(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white"
        >
          {enhanceOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {selectedOption && (
          <p className="mt-2 text-sm text-gray-400 italic">
            {selectedOption.description}
          </p>
        )}
      </div>

      {enhanceType === 'custom' && (
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Custom Instructions *
          </label>
          <textarea
            value={customInstruction}
            onChange={(e) => setCustomInstruction(e.target.value)}
            placeholder="E.g., Add more technical details, include a personal anecdote, make it funny..."
            className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 resize-none text-base text-white placeholder-gray-400"
            rows={3}
          />
        </div>
      )}

      <button
        onClick={enhancePost}
        disabled={loading || !originalPost.trim() || (enhanceType === 'custom' && !customInstruction.trim())}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl text-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enhancing Your Post...
          </span>
        ) : '✨ Enhance Post'}
      </button>

      {enhanced && (
        <div className="mt-8 space-y-4 animate-fade-in">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400/30 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">✨ Enhanced Post</h3>
              <span className="text-xs text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                {enhanced.split(' ').length} words
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20">
              <p className="whitespace-pre-wrap text-gray-100 leading-relaxed text-base">{enhanced}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={copyToClipboard}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all border-2 border-white/20 hover:border-white/30 shadow-sm hover:shadow-md"
            >
              📋 Copy
            </button>
            <button
              onClick={enhancePost}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all border-2 border-white/20 hover:border-white/30 shadow-sm hover:shadow-md"
            >
              🔄 Re-enhance
            </button>
            <button
              onClick={savePost}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              💾 Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
