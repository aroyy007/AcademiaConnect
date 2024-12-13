import React from 'react';
import { useAuthStore } from '../store/auth';
import { usePostsStore } from '../store/posts';
import { Navigate } from 'react-router-dom';
import { CreatePost } from '../components/posts/CreatePost';
import { PostCard } from '../components/posts/PostCard';
import { toast } from 'react-hot-toast';

export function HomePage() {
  const { isAuthenticated, user } = useAuthStore();
  const { posts, likePost, addComment } = usePostsStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLike = (postId: string) => {
    if (user) {
      likePost(postId, user.id);
    }
  };

  const handleComment = (postId: string, content: string) => {
    if (user) {
      const comment = {
        id: crypto.randomUUID(),
        userId: user.id,
        content,
        createdAt: new Date(),
      };
      addComment(postId, comment);
      toast.success('Comment added successfully!');
    }
  };

  const handleShare = (postId: string) => {
    toast.success('Post shared successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
        <p className="text-gray-600">Share your thoughts with the EDU community.</p>
      </div>

      <CreatePost />

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        ))}
        {posts.length === 0 && (
          <p className="text-center text-gray-500">No posts yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
}