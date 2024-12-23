import React, { useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '../store/auth';
import { usePostsStore } from '../store/posts';
import { Navigate } from 'react-router-dom';
import { CreatePost } from '../components/posts/CreatePost';
import { PostCard } from '../components/posts/PostCard';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export function HomePage() {
  const { isAuthenticated, user, token } = useAuthStore();
  const { likePost, addComment, posts, setPosts } = usePostsStore();
  // const [posts, setPosts] = useState([]);
  const [fetched, setFetched] = useState(false)
  // if (user?._id && token ) {
  //   const my_posts = getPosts(token, user?._id);
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLike = (postId: string) => {
    if (user) {
      likePost(postId, user._id);
    }
  };

  const handleComment = (postId: string, content: string) => {
    if (user) {
      const comment = {
        id: crypto.randomUUID(),
        userId: user._id,
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

  const fetchPosts = async () => {
    try {
      if (!fetched) {
        const res = await axios.get(`http://localhost:9000/api/posts?user_id=${user?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = res?.data;

        if (data?.success) {
          setPosts(data?.posts)
          setFetched(true)
        }
      }

    } catch (err) {
      console.log(err)
    }
  }

  const getPosts = fetchPosts()


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