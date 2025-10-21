'use client';

import { useState, useEffect } from 'react';

interface SavedPost {
  id: string;
  text: string;
  timestamp: number;
}

type SortOption = 'newest' | 'oldest' | 'shortest' | 'longest';

export default function SavedPosts() {
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());

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

  const exportAllPosts = () => {
    const allText = posts.map(p => `${p.text}\n\n---\n\n`).join('');
    const blob = new Blob([allText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkedin-posts-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyAllPosts = () => {
    const allText = posts.map(p => p.text).join('\n\n---\n\n');
    navigator.clipboard.writeText(allText);
    alert(`Copied ${posts.length} posts to clipboard!`);
  };

  const deleteSelected = () => {
    if (selectedPosts.size === 0) return;
    if (!confirm(`Delete ${selectedPosts.size} selected posts?`)) return;
    
    const updated = posts.filter(p => !selectedPosts.has(p.id));
    localStorage.setItem('posts', JSON.stringify(updated));
    setPosts(updated);
    setSelectedPosts(new Set());
  };

  const toggleSelectPost = (id: string) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPosts(newSelected);
  };

  const selectAll = () => {
    setSelectedPosts(new Set(filteredPosts.map(p => p.id)));
  };

  const clearSelection = () => {
    setSelectedPosts(new Set());
  };

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => 
      searchQuery === '' || 
      post.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.timestamp - a.timestamp;
        case 'oldest':
          return a.timestamp - b.timestamp;
        case 'shortest':
          return a.text.length - b.text.length;
        case 'longest':
          return b.text.length - a.text.length;
        default:
          return 0;
      }
    });

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
      {/* Header with actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-white">💾 Saved Posts</h3>
          <span className="text-sm font-normal text-gray-300 bg-white/10 px-3 py-1 rounded-full">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>
        <div className="flex gap-2">
          {selectedPosts.size > 0 && (
            <>
              <button
                onClick={deleteSelected}
                className="text-sm bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 px-3 py-1.5 rounded-lg transition-all"
              >
                🗑️ Delete ({selectedPosts.size})
              </button>
              <button
                onClick={clearSelection}
                className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-all"
              >
                Clear
              </button>
            </>
          )}
          <button
            onClick={selectAll}
            className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-all"
          >
            Select All
          </button>
          <button
            onClick={copyAllPosts}
            className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-all"
          >
            📋 Copy All
          </button>
          <button
            onClick={exportAllPosts}
            className="text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-3 py-1.5 rounded-lg transition-all"
          >
            💾 Export
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search posts..."
            className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white placeholder-gray-400"
          />
        </div>
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-base text-white"
          >
            <option value="newest">📅 Newest First</option>
            <option value="oldest">📅 Oldest First</option>
            <option value="shortest">📊 Shortest First</option>
            <option value="longest">📊 Longest First</option>
          </select>
        </div>
      </div>

      {filteredPosts.length === 0 && searchQuery && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p>No posts found matching &quot;{searchQuery}&quot;</p>
        </div>
      )}

      {/* Posts List */}
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className={`bg-white/5 border-2 rounded-xl p-5 transition-all ${
            selectedPosts.has(post.id)
              ? 'border-blue-400/50 bg-blue-500/10'
              : 'border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={selectedPosts.has(post.id)}
              onChange={() => toggleSelectPost(post.id)}
              className="mt-1 w-4 h-4 rounded accent-blue-500"
            />
            <div className="flex-1">
              <p className="text-gray-200 mb-4 whitespace-pre-wrap line-clamp-4 leading-relaxed">
                {post.text}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 font-medium">
                    📅 {new Date(post.timestamp).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="text-xs text-gray-400">
                    {post.text.split(' ').length} words
                  </span>
                </div>
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
          </div>
        </div>
      ))}
    </div>
  );
}
