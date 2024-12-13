export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
  profileImage?: string;
  department: string;
  semester: number;
  section: string;
  createdAt: Date;
  friendshipStatus?: 'none' | 'pending' | 'friends';
  isVerified?: boolean;
}

export interface PostMetrics {
  likes: number;
  reactions: Reaction[];
  comments: number;
  shares: number;
}

export interface Reaction {
  type: 'love' | 'haha' | 'sad';
  count: number;
  users: string[];
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  images?: string[];
  likes: string[];
  comments: Comment[];
  createdAt: Date;
  editHistory?: EditHistory[];
  deletedAt?: Date;
  metrics: PostMetrics;
  user: {
    id: string;
    name: string;
    profileImage?: string;
    isVerified: boolean;
  };
}

export interface EditHistory {
  timestamp: Date;
  previousContent: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'social' | 'university';
  title: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Routine {
  id: string;
  semester: number;
  section: string;
  department: string;
  schedule: ScheduleItem[];
}

export interface ScheduleItem {
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}