import { create } from 'zustand';
import type { Post } from '../types';

interface PostsState {
  posts: Post[];
  deletedPosts: Post[];
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  restorePost: (postId: string) => void;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: { id: string; userId: string; content: string; createdAt: Date }) => void;
}

const initialPosts: Post[] = [
  // {
  //   id: '1',
  //   userId: 'demo-user-1',
  //   title: 'Welcome to EDU Social',
  //   content: 'This is a demo post to showcase the platform.',
  //   images: [],
  //   likes: [],
  //   comments: [],
  //   createdAt: new Date(),
  //   metrics: {
  //     likes: 0,
  //     reactions: [],
  //     comments: 0,
  //     shares: 0
  //   },
  //   user: {
  //     id: 'demo-user-1',
  //     name: 'John Doe',
  //     profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  //     isVerified: true
  //   }
  // }
];

export const usePostsStore = create<PostsState>((set) => ({
  posts: initialPosts,
  deletedPosts: [],
  addPost: (post) => {
    console.log("post : ", post)
    set((state) => ({
      posts: [
        {
          ...post,
          // metrics: {
          //   likes: 0,
          //   reactions: [],
          //   comments: 0,
          //   shares: 0
          // }
        },
        ...state.posts
      ]
    }))
  },

  updatePost: (postId, updates) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
            ...post,
            ...updates,
            editHistory: [
              ...(post.editHistory || []),
              {
                timestamp: new Date(),
                previousContent: post.content,
              },
            ],
          }
          : post
      ),
    })),

  deletePost: (postId) =>
    set((state) => {
      const post = state.posts.find((p) => p.id === postId);
      if (!post) return state;

      return {
        posts: state.posts.filter((p) => p.id !== postId),
        deletedPosts: [...state.deletedPosts, { ...post, deletedAt: new Date() }],
      };
    }),

  restorePost: (postId) =>
    set((state) => {
      const post = state.deletedPosts.find((p) => p.id === postId);
      if (!post) return state;

      return {
        deletedPosts: state.deletedPosts.filter((p) => p.id !== postId),
        posts: [...state.posts, { ...post, deletedAt: undefined }],
      };
    }),

  likePost: (postId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
            ...post,
            likes: post.likes.includes(userId)
              ? post.likes.filter((id) => id !== userId)
              : [...post.likes, userId],
            metrics: {
              ...post.metrics,
              likes: post.likes.includes(userId)
                ? post.metrics.likes - 1
                : post.metrics.likes + 1
            }
          }
          : post
      ),
    })),

  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
            ...post,
            comments: [...post.comments, comment],
            metrics: {
              ...post.metrics,
              comments: post.metrics.comments + 1
            }
          }
          : post
      ),
    })),
}));