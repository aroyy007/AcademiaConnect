export interface User {
  id: string;
  name: string;
  profileImage?: string;
  isVerified: boolean;
}

export interface Reaction {
  type: 'love' | 'haha' | 'sad';
  count: number;
  users: string[];
}

export interface PostMetrics {
  likes: number;
  reactions: Reaction[];
  comments: number;
  shares: number;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  metrics: PostMetrics;
  currentUserReaction: string | null;
}

export interface PostProps extends Post {
  onLike: (postId: string) => void;
  onReact: (postId: string, reactionType: string) => void;
  onComment: (postId: string, comment: string) => void;
  onShare: (postId: string) => void;
}