import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PostMetrics as Metrics } from '../../types/post';

interface PostMetricsProps {
  metrics: Metrics;
  currentUserReaction: string | null;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export function PostMetrics({
  metrics = { likes: 0, reactions: [], comments: 0, shares: 0 },
  currentUserReaction,
  onLike,
  onComment,
  onShare,
}: PostMetricsProps) {
  return (
    <div className="px-4 py-2 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onLike}
            className={`p-2 rounded-full transition-colors ${
              currentUserReaction === 'like'
                ? 'text-red-500 bg-red-50'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            aria-label={currentUserReaction === 'like' ? 'Unlike post' : 'Like post'}
          >
            <Heart className="h-5 w-5" />
          </motion.button>
          <span className="text-sm text-gray-500">{metrics.likes}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onComment}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Comment on post"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-500">{metrics.comments}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onShare}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Share post"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-500">{metrics.shares}</span>
        </div>
      </div>
    </div>
  );
}