'use client';

import { useState } from 'react';
import CharacterCounter from './CharacterCounter';
import HashtagGenerator from './HashtagGenerator';
import PostPreview from './PostPreview';

interface PostGeneratorProps {
  onSave: (post: string) => void;
}

export default function PostGenerator({ onSave }: PostGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [context, setContext] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [length, setLength] = useState('Medium');
  const [generated, setGenerated] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHashtags, setShowHashtags] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const generatePost = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    
    const lengthGuide = {
      'Short': '2-3 paragraphs (150-200 words)',
      'Medium': '3-4 paragraphs (250-350 words)',
      'Long': '4-5 paragraphs (400-500 words)'
    };

    let prompt = `You are an expert LinkedIn content creator and storytelling coach. Create an engaging, authentic LinkedIn post that will resonate with professionals.

TOPIC: ${topic}

TONE: ${tone}
LENGTH: ${lengthGuide[length as keyof typeof lengthGuide]}
${context ? `\nADDITIONAL CONTEXT: ${context}` : ''}
${targetAudience ? `\nTARGET AUDIENCE: ${targetAudience}` : ''}
${callToAction ? `\nCALL TO ACTION: ${callToAction}` : ''}

IMPORTANT GUIDELINES:
- Start with a compelling hook that grabs attention
- Use short paragraphs and line breaks for readability
- Include personal insights or experiences to build authenticity
- Add relevant emojis naturally (2-4 throughout the post)
- End with a thought-provoking question or inspiring statement
- Make it conversational and relatable
- Use storytelling elements when appropriate
${callToAction ? '- Include the call-to-action naturally in the closing' : '- End with a question to encourage engagement'}

Write the complete LinkedIn post now:`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'generate', prompt }),
      });

      const data = await res.json();
      if (data.text) {
        setGenerated(data.text);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    alert('Copied to clipboard!');
  };

  const savePost = () => {
    onSave(generated);
    alert('Post saved!');
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          What&apos;s your post about? *
        </label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="E.g., My experience attending TechConf 2024, lessons learned from a failed project, celebrating a team milestone..."
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 resize-none text-base text-white placeholder-gray-400"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <option>Educational</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Length
          </label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white"
          >
            <option>Short</option>
            <option>Medium</option>
            <option>Long</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Additional Context (Optional)
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="E.g., I'm a software engineer with 5 years experience, this happened at my startup, I learned this the hard way..."
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 resize-none text-base text-white placeholder-gray-400"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Target Audience (Optional)
        </label>
        <input
          type="text"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="E.g., Software developers, Marketing professionals, Startup founders..."
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Call to Action (Optional)
        </label>
        <input
          type="text"
          value={callToAction}
          onChange={(e) => setCallToAction(e.target.value)}
          placeholder="E.g., Share your experience, Comment below, Check out my article..."
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white placeholder-gray-400"
        />
      </div>

      <button
        onClick={generatePost}
        disabled={loading || !topic.trim()}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl text-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Your Post...
          </span>
        ) : '✨ Generate Post'}
      </button>

      {generated && (
        <div className="mt-8 space-y-4 animate-fade-in">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/30 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">📝 Your Generated Post</h3>
              <CharacterCounter text={generated} />
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20">
              <p className="whitespace-pre-wrap text-gray-100 leading-relaxed text-base">{generated}</p>
            </div>
          </div>

          {/* Hashtag Generator Section */}
          <div className="bg-white/5 border-2 border-white/10 rounded-xl p-6">
            <button
              onClick={() => setShowHashtags(!showHashtags)}
              className="flex items-center justify-between w-full text-left mb-4"
            >
              <h4 className="text-lg font-semibold text-white">🏷️ Add Hashtags</h4>
              <span className="text-gray-400">{showHashtags ? '▲' : '▼'}</span>
            </button>
            {showHashtags && (
              <HashtagGenerator postContent={generated} />
            )}
          </div>

          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all border-2 border-white/20 hover:border-white/30 shadow-sm hover:shadow-md"
            >
              👁️ Preview
            </button>
            <button
              onClick={copyToClipboard}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all border-2 border-white/20 hover:border-white/30 shadow-sm hover:shadow-md"
            >
              📋 Copy
            </button>
            <button
              onClick={generatePost}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all border-2 border-white/20 hover:border-white/30 shadow-sm hover:shadow-md"
            >
              🔄 Regen
            </button>
            <button
              onClick={savePost}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              💾 Save
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && generated && (
        <PostPreview postContent={generated} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}
