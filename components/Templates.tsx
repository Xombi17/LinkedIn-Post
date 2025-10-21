'use client';

import { useState } from 'react';
import CharacterCounter from './CharacterCounter';

interface Template {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  template: string;
  variables: string[];
}

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [generatedPost, setGeneratedPost] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const templates: Template[] = [
    {
      id: 'job-announcement',
      title: 'New Job Announcement',
      category: 'Career',
      icon: '🎉',
      description: 'Announce your new job or role',
      template: `I'm thrilled to announce that I'm starting a new position as {role} at {company}! 🎉

After {experience}, I'm excited to bring my skills in {skills} to this incredible team.

{company} is doing amazing work in {industry}, and I can't wait to contribute to {goals}.

A huge thank you to everyone who supported me on this journey. Looking forward to this new chapter! 🚀

{cta}`,
      variables: ['role', 'company', 'experience', 'skills', 'industry', 'goals', 'cta']
    },
    {
      id: 'product-launch',
      title: 'Product Launch',
      category: 'Business',
      icon: '🚀',
      description: 'Announce a new product or feature',
      template: `Big news! We're launching {product}! 🚀

After {timeframe} of hard work, we're finally ready to share {product} with the world.

What makes it special?
✨ {feature1}
✨ {feature2}
✨ {feature3}

We built this to solve {problem} for {audience}.

{cta}

What do you think? Drop your thoughts in the comments! 👇`,
      variables: ['product', 'timeframe', 'feature1', 'feature2', 'feature3', 'problem', 'audience', 'cta']
    },
    {
      id: 'achievement',
      title: 'Celebrate Achievement',
      category: 'Personal',
      icon: '🏆',
      description: 'Share a personal or team achievement',
      template: `Proud moment! {achievement} 🏆

{backstory}

This wouldn't have been possible without:
• {person1}
• {person2}
• {person3}

Key learnings:
1️⃣ {learning1}
2️⃣ {learning2}
3️⃣ {learning3}

{reflection}

What's your biggest win this {timeframe}? 💪`,
      variables: ['achievement', 'backstory', 'person1', 'person2', 'person3', 'learning1', 'learning2', 'learning3', 'reflection', 'timeframe']
    },
    {
      id: 'thought-leadership',
      title: 'Thought Leadership',
      category: 'Insights',
      icon: '💡',
      description: 'Share insights and expertise',
      template: `{hook}

I've been thinking a lot about {topic} lately, and here's what I've learned:

{insight1}

{insight2}

{insight3}

The key takeaway? {takeaway}

This matters because {why_it_matters}

What's your take on this? Do you agree or disagree? 

Let's discuss in the comments 👇`,
      variables: ['hook', 'topic', 'insight1', 'insight2', 'insight3', 'takeaway', 'why_it_matters']
    },
    {
      id: 'event-recap',
      title: 'Event Recap',
      category: 'Events',
      icon: '🎤',
      description: 'Share highlights from an event',
      template: `Just wrapped up {event}! What an incredible experience 🎤

Here are my top {number} takeaways:

1️⃣ {takeaway1}
2️⃣ {takeaway2}
3️⃣ {takeaway3}

Highlight moments:
✨ {highlight1}
✨ {highlight2}

Grateful to have connected with so many amazing people including {mentions}.

Already looking forward to next year! 🙌

Were you there? What was your favorite part?`,
      variables: ['event', 'number', 'takeaway1', 'takeaway2', 'takeaway3', 'highlight1', 'highlight2', 'mentions']
    },
    {
      id: 'asking-advice',
      title: 'Ask for Advice',
      category: 'Community',
      icon: '🤔',
      description: 'Engage community for advice or opinions',
      template: `Question for my network: {question} 🤔

Context:
{context}

I'm specifically curious about:
• {aspect1}
• {aspect2}
• {aspect3}

My current thinking:
{your_thoughts}

What's worked for you? What should I avoid?

Drop your insights below! Your experience could really help 👇

#AskingForAFriend`,
      variables: ['question', 'context', 'aspect1', 'aspect2', 'aspect3', 'your_thoughts']
    },
    {
      id: 'lessons-learned',
      title: 'Lessons Learned',
      category: 'Growth',
      icon: '📚',
      description: 'Share lessons from failures or experiences',
      template: `Let me tell you about the time I {situation}... 📚

Spoiler: It didn't go as planned.

What happened:
{story}

What I learned:
1. {lesson1}
2. {lesson2}
3. {lesson3}

The biggest surprise? {surprise}

If I could go back, I'd {what_id_change}

Have you faced something similar? How did you handle it?

Share your story below 👇`,
      variables: ['situation', 'story', 'lesson1', 'lesson2', 'lesson3', 'surprise', 'what_id_change']
    },
    {
      id: 'team-shoutout',
      title: 'Team Appreciation',
      category: 'Personal',
      icon: '👏',
      description: 'Appreciate your team publicly',
      template: `Shoutout time! 👏

Our team just {accomplishment}, and I couldn't be prouder.

Special recognition to:
• {person1} for {contribution1}
• {person2} for {contribution2}
• {person3} for {contribution3}

What makes this team special:
✨ {quality1}
✨ {quality2}
✨ {quality3}

{reflection}

Tag someone on your team who deserves recognition today! 💪`,
      variables: ['accomplishment', 'person1', 'contribution1', 'person2', 'contribution2', 'person3', 'contribution3', 'quality1', 'quality2', 'quality3', 'reflection']
    }
  ];

  const categories = Array.from(new Set(templates.map(t => t.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const fillTemplate = () => {
    if (!selectedTemplate) return;

    let filled = selectedTemplate.template;
    selectedTemplate.variables.forEach(variable => {
      const value = variables[variable] || `[${variable}]`;
      filled = filled.replace(new RegExp(`{${variable}}`, 'g'), value);
    });

    setGeneratedPost(filled);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    setToast('Copied to clipboard!');
    setTimeout(() => setToast(null), 2000);
  };

  const savePost = () => {
    const saved = JSON.parse(localStorage.getItem('posts') || '[]');
    const newPost = {
      id: Date.now().toString(),
      text: generatedPost,
      timestamp: Date.now(),
    };
    saved.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(saved));
    setToast('Post saved!');
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === 'All'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          All Templates
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      {!selectedTemplate && (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className="text-left bg-white/5 border-2 border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{template.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  <span className="inline-block text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Template Editor */}
      {selectedTemplate && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedTemplate.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedTemplate.title}</h3>
                <p className="text-sm text-gray-400">{selectedTemplate.description}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedTemplate(null);
                setVariables({});
                setGeneratedPost('');
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Templates
            </button>
          </div>

          {/* Variable Inputs */}
          <div className="bg-white/5 border-2 border-white/10 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-white mb-4">Fill in the details:</h4>
            {selectedTemplate.variables.map(variable => (
              <div key={variable}>
                <label className="block text-sm font-semibold text-gray-200 mb-2 capitalize">
                  {variable.replace(/_/g, ' ')}
                </label>
                <input
                  type="text"
                  value={variables[variable] || ''}
                  onChange={(e) => setVariables({ ...variables, [variable]: e.target.value })}
                  placeholder={`Enter ${variable.replace(/_/g, ' ')}`}
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white placeholder-gray-400"
                />
              </div>
            ))}
          </div>

          <button
            onClick={fillTemplate}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl text-lg"
          >
            ✨ Generate from Template
          </button>

          {/* Generated Post */}
          {generatedPost && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/30 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">📝 Your Post</h3>
                  <CharacterCounter text={generatedPost} />
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20">
                  <p className="whitespace-pre-wrap text-gray-100 leading-relaxed text-base">{generatedPost}</p>
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
                  onClick={savePost}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  💾 Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl shadow-2xl">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
