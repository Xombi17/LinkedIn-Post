'use client';

import { useState } from 'react';

export default function RewriteSection() {
  const [originalPost, setOriginalPost] = useState('');
  const [name, setName] = useState('');
  const [event, setEvent] = useState('');
  const [highlight, setHighlight] = useState('');
  const [tone, setTone] = useState('Professional');
  const [rewritten, setRewritten] = useState('');
  const [loading, setLoading] = useState(false);

  const rewritePost = async () => {
    if (!originalPost.trim() || !name.trim()) return;

    setLoading(true);
    const prompt = `Rewrite the following LinkedIn post for a new person and context.
Keep the same tone but make it original.

REFERENCE POST:
${originalPost}

CONTEXT:
Name: ${name}
Event: ${event || 'N/A'}
Highlight: ${highlight || 'N/A'}
Tone: ${tone}`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'rewrite', prompt }),
      });

      const data = await res.json();
      if (data.text) {
        setRewritten(data.text);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to rewrite post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rewritten);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Reference Post *
        </label>
        <textarea
          value={originalPost}
          onChange={(e) => setOriginalPost(e.target.value)}
          placeholder="Paste the LinkedIn post you want to use as reference... (Include the full post text)"
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 resize-none text-base text-white placeholder-gray-400"
          rows={6}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name or person's name"
            className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Event
          </label>
          <input
            type="text"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            placeholder="Event, conference, or occasion"
            className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Highlight
        </label>
        <input
          type="text"
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
          placeholder="Key highlight, achievement, or takeaway"
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Tone
        </label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white"
        >
          <option>Professional</option>
          <option>Storytelling</option>
          <option>Technical</option>
          <option>Personal</option>
          <option>Inspirational</option>
        </select>
      </div>

      <button
        onClick={rewritePost}
        disabled={loading || !originalPost.trim() || !name.trim()}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl text-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Rewriting Your Post...
          </span>
        ) : '🔄 Rewrite Post'}
      </button>

      {rewritten && (
        <div className="mt-8 space-y-4 animate-fade-in">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400/30 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">✨ Your Rewritten Post</h3>
              <span className="text-xs text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                {rewritten.split(' ').length} words
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20">
              <p className="whitespace-pre-wrap text-gray-100 leading-relaxed text-base">{rewritten}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={copyToClipboard}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all border-2 border-white/20 hover:border-white/30 shadow-sm hover:shadow-md"
            >
              📋 Copy
            </button>
            <button
              onClick={rewritePost}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              🔄 Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
