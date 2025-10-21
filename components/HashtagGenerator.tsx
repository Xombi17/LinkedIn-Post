'use client';

import { useState } from 'react';

interface HashtagGeneratorProps {
  postContent: string;
  onHashtagsGenerated?: (hashtags: string[]) => void;
}

export default function HashtagGenerator({ postContent, onHashtagsGenerated }: HashtagGeneratorProps) {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(new Set());

  const generateHashtags = async () => {
    if (!postContent.trim()) return;

    setLoading(true);

    const prompt = `Based on this LinkedIn post, suggest 15 relevant, professional hashtags. Mix popular and niche tags. Include industry-specific and trending hashtags.

Post:
${postContent}

Return ONLY the hashtags, one per line, with the # symbol. No explanations or numbering.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'hashtag', prompt }),
      });

      const data = await res.json();
      if (data.text) {
        // Parse hashtags from response
        const parsedHashtags = data.text
          .split('\n')
          .map((line: string) => line.trim())
          .filter((line: string) => line.startsWith('#'))
          .map((tag: string) => tag.replace(/[^a-zA-Z0-9#]/g, ''))
          .filter((tag: string) => tag.length > 2);
        
        setHashtags(parsedHashtags);
        if (onHashtagsGenerated) {
          onHashtagsGenerated(parsedHashtags);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleHashtag = (hashtag: string) => {
    const newSelected = new Set(selectedHashtags);
    if (newSelected.has(hashtag)) {
      newSelected.delete(hashtag);
    } else {
      newSelected.add(hashtag);
    }
    setSelectedHashtags(newSelected);
  };

  const copySelected = () => {
    const selected = Array.from(selectedHashtags).join(' ');
    navigator.clipboard.writeText(selected);
  };

  const copyAll = () => {
    const all = hashtags.join(' ');
    navigator.clipboard.writeText(all);
  };

  const selectAll = () => {
    setSelectedHashtags(new Set(hashtags));
  };

  const clearSelection = () => {
    setSelectedHashtags(new Set());
  };

  if (!postContent.trim()) {
    return (
      <div className="text-center py-6 text-gray-400">
        Write some content first to generate hashtags
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hashtags.length === 0 ? (
        <button
          onClick={generateHashtags}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Hashtags...
            </span>
          ) : '🏷️ Generate Hashtags'}
        </button>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-white">
              Generated Hashtags ({hashtags.length})
            </h4>
            <div className="flex gap-2">
              {selectedHashtags.size > 0 && (
                <>
                  <button
                    onClick={copySelected}
                    className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-all"
                  >
                    Copy Selected ({selectedHashtags.size})
                  </button>
                  <button
                    onClick={clearSelection}
                    className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-all"
                  >
                    Clear
                  </button>
                </>
              )}
              <button
                onClick={selectAll}
                className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-all"
              >
                Select All
              </button>
              <button
                onClick={copyAll}
                className="text-sm bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-3 py-1 rounded-lg transition-all"
              >
                Copy All
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {hashtags.map((hashtag, idx) => (
              <button
                key={idx}
                onClick={() => toggleHashtag(hashtag)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedHashtags.has(hashtag)
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white scale-105'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {hashtag}
              </button>
            ))}
          </div>

          <button
            onClick={generateHashtags}
            disabled={loading}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all border-2 border-white/20"
          >
            🔄 Regenerate Hashtags
          </button>
        </div>
      )}
    </div>
  );
}
