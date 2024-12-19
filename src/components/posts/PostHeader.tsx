import React from 'react';
import { MoreHorizontal, BadgeCheck, User } from 'lucide-react';
import { format } from 'timeago.js';
import type { User as UserType } from '../../types/post';

interface PostHeaderProps {
  user: UserType;
  timestamp: Date;
  onMenuOpen: () => void;
}

export function PostHeader({ user, timestamp, onMenuOpen }: PostHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <div className="relative">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <h3 className="font-semibold text-gray-900">{user?.name || 'Anonymous'}</h3>
            {user?.isVerified && (
              <BadgeCheck className="h-4 w-4 text-blue-500" aria-label="Verified user" />
            )}
          </div>
          <p className="text-sm text-gray-500">{format(timestamp)}</p>
        </div>
      </div>
      <button
        onClick={onMenuOpen}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Post options"
      >
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
}