import { create } from 'zustand';
import type { User } from '../types';

interface FriendsState {
  friends: User[];
  pendingRequests: {
    incoming: User[];
    outgoing: User[];
  };
  searchResults: User[];
  isLoading: boolean;
  searchUsers: (query: string) => Promise<void>;
  sendFriendRequest: (userId: string) => Promise<void>;
  acceptFriendRequest: (userId: string) => Promise<void>;
  rejectFriendRequest: (userId: string) => Promise<void>;
  removeFriend: (userId: string) => Promise<void>;
}

export const useFriendsStore = create<FriendsState>((set, get) => ({
  friends: [],
  pendingRequests: {
    incoming: [],
    outgoing: [],
  },
  searchResults: [],
  isLoading: false,

  searchUsers: async (query: string) => {
    set({ isLoading: true });
    try {
      // Simulated API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 500));
      const results: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@eastdelta.edu.bd',
          department: 'Computer Science',
          semester: 6,
          section: 'A',
          role: 'student',
          status: 'approved',
          createdAt: new Date(),
          friendshipStatus: 'none',
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@eastdelta.edu.bd',
          department: 'Business Administration',
          semester: 4,
          section: 'B',
          role: 'student',
          status: 'approved',
          createdAt: new Date(),
          friendshipStatus: 'pending',
        },
      ].filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      set({ searchResults: results });
    } catch (error) {
      console.error('Failed to search users:', error);
      set({ searchResults: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  sendFriendRequest: async (userId: string) => {
    try {
      // Simulated API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { searchResults } = get();
      set({
        searchResults: searchResults.map((user) =>
          user.id === userId
            ? { ...user, friendshipStatus: 'pending' }
            : user
        ),
      });
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  },

  acceptFriendRequest: async (userId: string) => {
    try {
      // Simulated API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { pendingRequests, friends } = get();
      const user = pendingRequests.incoming.find((u) => u.id === userId);
      if (user) {
        set({
          friends: [...friends, { ...user, friendshipStatus: 'friends' }],
          pendingRequests: {
            ...pendingRequests,
            incoming: pendingRequests.incoming.filter((u) => u.id !== userId),
          },
        });
      }
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    }
  },

  rejectFriendRequest: async (userId: string) => {
    try {
      // Simulated API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { pendingRequests } = get();
      set({
        pendingRequests: {
          ...pendingRequests,
          incoming: pendingRequests.incoming.filter((u) => u.id !== userId),
        },
      });
    } catch (error) {
      console.error('Failed to reject friend request:', error);
    }
  },

  removeFriend: async (userId: string) => {
    try {
      // Simulated API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { friends } = get();
      set({
        friends: friends.filter((u) => u.id !== userId),
      });
    } catch (error) {
      console.error('Failed to remove friend:', error);
    }
  },
}));