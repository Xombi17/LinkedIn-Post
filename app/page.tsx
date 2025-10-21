'use client';

import { useState } from 'react';
import PostGenerator from '@/components/PostGenerator';
import RewriteSection from '@/components/RewriteSection';
import Optimizer from '@/components/Optimizer';
import Enhance from '@/components/Enhance';
import SavedPosts from '@/components/SavedPosts';
import LandingPage from '@/components/LandingPage';

type Tab = 'generate' | 'rewrite' | 'enhance' | 'optimize' | 'saved';

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('generate');

  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  const savePost = (text: string) => {
    const saved = JSON.parse(localStorage.getItem('posts') || '[]');
    const newPost = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
    };
    saved.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(saved));
  };

  const tabs = [
    { id: 'generate' as Tab, label: '✍️ Generate', component: <PostGenerator onSave={savePost} /> },
    { id: 'rewrite' as Tab, label: '🔄 Rewrite', component: <RewriteSection /> },
    { id: 'enhance' as Tab, label: '✨ Enhance', component: <Enhance /> },
    { id: 'optimize' as Tab, label: '📊 Optimize', component: <Optimizer /> },
    { id: 'saved' as Tab, label: '📁 My Posts', component: <SavedPosts key={activeTab} /> },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => setShowApp(false)}
          className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            PostPilot Lite
          </h1>
          <p className="text-gray-300 text-lg">
            ✨ Write. Rewrite. Shine on LinkedIn — in one click.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/5 backdrop-blur-md rounded-t-xl shadow-lg border-b-2 border-white/10 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit px-6 py-4 font-semibold transition-all whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'text-white bg-gradient-to-b from-purple-500/20 to-transparent'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/5 backdrop-blur-md rounded-b-xl shadow-2xl p-8 min-h-[500px] border border-white/10">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>Powered by OpenRouter AI • Built with Next.js & Tailwind</p>
        </div>
      </div>
    </main>
  );
}
