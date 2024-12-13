import React from 'react';
import { useFriendsStore } from '../../store/friends';
import { User, Circle } from 'lucide-react';

export function FriendsList() {
  const { friends } = useFriendsStore();

  return (
    <div className="bg-card rounded-lg shadow-sm p-6">
      <h3 className="font-medium text-foreground mb-4">Friends</h3>
      <div className="space-y-4">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <Circle className="h-3 w-3 absolute bottom-0 right-0 text-green-500 fill-current" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{friend.name}</p>
              <p className="text-xs text-muted-foreground">{friend.department}</p>
            </div>
          </div>
        ))}
        {friends.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No friends yet. Start connecting!
          </p>
        )}
      </div>
    </div>
  );
}