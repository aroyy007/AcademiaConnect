import { create } from 'zustand';
import type { User, Post, Routine, Notification } from '../types';

interface AdminState {
  pendingUsers: User[];
  routines: Routine[];
  notifications: Notification[];
  posts: Post[];
  setPendingUsers: (users: User[]) => void;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  addRoutine: (routine: Routine) => void;
  deleteRoutine: (routineId: string) => void;
  addNotification: (notification: Notification) => void;
  deleteNotification: (notificationId: string) => void;
  deletePost: (postId: string) => void;
  setPosts: (posts: Post[]) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  pendingUsers: [],
  routines: [],
  notifications: [],
  posts: [],
  setPendingUsers: (users) => set({ pendingUsers: users }),
  approveUser: (userId) =>
    set((state) => ({
      pendingUsers: state.pendingUsers.filter((user) => user.id !== userId),
    })),
  rejectUser: (userId) =>
    set((state) => ({
      pendingUsers: state.pendingUsers.filter((user) => user.id !== userId),
    })),
  addRoutine: (routine) =>
    set((state) => ({ routines: [...state.routines, routine] })),
  deleteRoutine: (routineId) =>
    set((state) => ({
      routines: state.routines.filter((routine) => routine.id !== routineId),
    })),
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  deleteNotification: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== notificationId),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
  setPosts: (posts) => set({ posts }),
}));