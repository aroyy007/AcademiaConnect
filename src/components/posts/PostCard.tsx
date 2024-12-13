import React from 'react';
import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { PostMetrics } from './PostMetrics';
import { CommentModal } from './CommentModal';
import { ShareModal } from './ShareModal';
import type { Post } from '../../types';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onShare: (postId: string) => void;
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const [showCommentModal, setShowCommentModal] = React.useState(false);
  const [showShareModal, setShowShareModal] = React.useState(false);

  const handleLike = () => {
    onLike(post.id);
  };

  const handleComment = (content: string) => {
    onComment(post.id, content);
    setShowCommentModal(false);
  };

  const handleShare = () => {
    onShare(post.id);
    setShowShareModal(true);
  };

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <PostHeader
        user={post.user}
        timestamp={post.createdAt.toISOString()}
        onMenuOpen={() => {}}
      />
      <PostContent content={post.content} />
      <PostMetrics
        metrics={post.metrics}
        currentUserReaction={post.likes.length > 0 ? 'like' : null}
        onLike={handleLike}
        onComment={() => setShowCommentModal(true)}
        onShare={handleShare}
      />

      <CommentModal
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        onSubmit={handleComment}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        postId={post.id}
      />
    </article>
  );
}