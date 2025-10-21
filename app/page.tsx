'use client';

import { useState } from 'react';
import PostGenerator from '@/components/PostGenerator';
import RewriteSection from '@/components/RewriteSection';
import Optimizer from '@/components/Optimizer';
import SavedPosts from '@/components/SavedPosts';

type Tab = 'generate' | 'rewrite' | 'optimize' | 'saved';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('generate');

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
    { id: 'optimize' as Tab, label: '📊 Optimize', component: <Optimizer /> },
    { id: 'saved' as Tab, label: '📁 My Posts', component: <SavedPosts key={activeTab} /> },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            PostPilot Lite
          </h1>
          <p className="text-gray-600 text-lg">
            ✨ Write. Rewrite. Shine on LinkedIn — in one click.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-t-xl shadow-md border-b-2 border-gray-200 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit px-6 py-4 font-semibold transition-all whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-gradient-to-b from-blue-50 to-transparent'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-b-xl shadow-xl p-8 min-h-[500px]">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by OpenRouter AI • Built with Next.js & Tailwind</p>
        </div>
      </div>
    </main>
  );
}
