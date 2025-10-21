'use client';

import { useEffect } from 'react';
import CharacterCounter from './CharacterCounter';

interface PostPreviewProps {
  postContent: string;
  onClose: () => void;
}

export default function PostPreview({ postContent, onClose }: PostPreviewProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              👤
            </div>
            <div>
              <h3 className="font-semibold text-white">Your Name</h3>
              <p className="text-sm text-gray-400">Your Title • 1st</p>
              <p className="text-xs text-gray-500">Just now • 🌐</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Post Content */}
        <div className="px-6 py-6 max-h-[calc(90vh-200px)] overflow-y-auto custom-scrollbar">
          <div className="text-gray-100 leading-relaxed whitespace-pre-wrap break-words">
            {postContent}
          </div>
        </div>

        {/* Engagement Bar */}
        <div className="bg-white/5 border-t border-white/10 px-6 py-3">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-blue-400">👍</span>
              <span className="text-green-400">💡</span>
              <span className="text-red-400">❤️</span>
              <span className="ml-1">0 reactions</span>
            </div>
            <div className="flex items-center gap-4">
              <span>0 comments</span>
              <span>0 reposts</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/10">
            <button className="flex items-center justify-center gap-2 py-2 text-gray-400 hover:bg-white/10 rounded-lg transition-all">
              <span>👍</span>
              <span className="text-sm font-medium">Like</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 text-gray-400 hover:bg-white/10 rounded-lg transition-all">
              <span>💬</span>
              <span className="text-sm font-medium">Comment</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 text-gray-400 hover:bg-white/10 rounded-lg transition-all">
              <span>🔄</span>
              <span className="text-sm font-medium">Repost</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 text-gray-400 hover:bg-white/10 rounded-lg transition-all">
              <span>📤</span>
              <span className="text-sm font-medium">Send</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-t border-white/10">
          <CharacterCounter text={postContent} />
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
            >
              Close
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(postContent);
                onClose();
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-lg"
            >
              📋 Copy Post
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
