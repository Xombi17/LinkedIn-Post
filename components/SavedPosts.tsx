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
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No saved posts yet</h3>
        <p className="text-gray-500">Generate some posts and save your favorites to see them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          💾 Saved Posts
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        </h3>
      </div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all"
        >
          <p className="text-gray-800 mb-4 whitespace-pre-wrap line-clamp-4 leading-relaxed">
            {post.text}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-xs text-gray-500 font-medium">
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
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                📋 Copy
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow-md"
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
