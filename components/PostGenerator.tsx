'use client';

import { useState } from 'react';

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
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          What&apos;s your post about? *
        </label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="E.g., My experience attending TechConf 2024, lessons learned from a failed project, celebrating a team milestone..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
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
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Length
          </label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          >
            <option>Short</option>
            <option>Medium</option>
            <option>Long</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Additional Context (Optional)
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="E.g., I'm a software engineer with 5 years experience, this happened at my startup, I learned this the hard way..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Target Audience (Optional)
        </label>
        <input
          type="text"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="E.g., Software developers, Marketing professionals, Startup founders..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Call to Action (Optional)
        </label>
        <input
          type="text"
          value={callToAction}
          onChange={(e) => setCallToAction(e.target.value)}
          placeholder="E.g., Share your experience, Comment below, Check out my article..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
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
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">📝 Your Generated Post</h3>
              <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                {generated.split(' ').length} words
              </span>
            </div>
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <p className="whitespace-pre-wrap text-gray-900 leading-relaxed text-base">{generated}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={copyToClipboard}
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md"
            >
              📋 Copy
            </button>
            <button
              onClick={generatePost}
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md"
            >
              🔄 Regenerate
            </button>
            <button
              onClick={savePost}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              💾 Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
