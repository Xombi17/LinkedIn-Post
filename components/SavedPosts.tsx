'use client';

import { useState, useEffect } from 'react';

interface SavedPost {
  id: string;
  text: string;
  timestamp: number;
}

export default function SavedPosts() {
  const [posts, setPosts] = useState<SavedPost[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('posts');
      setPosts(saved ? JSON.parse(saved) : []);
    }
  };

  const deletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    localStorage.setItem('posts', JSON.stringify(updated));
    setPosts(updated);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📁</div>
        <h3 className="text-xl font-semibold text-gray-200 mb-2">No saved posts yet</h3>
        <p className="text-gray-400">Generate some posts and save your favorites to see them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          💾 Saved Posts
          <span className="text-sm font-normal text-gray-300 bg-white/10 px-3 py-1 rounded-full">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        </h3>
      </div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white/5 border-2 border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all"
        >
          <p className="text-gray-200 mb-4 whitespace-pre-wrap line-clamp-4 leading-relaxed">
            {post.text}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-xs text-gray-400 font-medium">
              📅 {new Date(post.timestamp).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(post.text)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                📋 Copy
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-white/10 hover:bg-red-500/20 border border-red-400/30 text-red-300 hover:text-red-200 font-semibold py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
