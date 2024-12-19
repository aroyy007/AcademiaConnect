import React from 'react';
import { Search, UserPlus, UserCheck, Clock } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { useFriendsStore } from '../../store/friends';
import { cn } from '../../lib/utils';
import type { User } from '../../types';

export function UserSearch() {
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [debouncedQuery] = useDebounce(query, 300);
  const { searchUsers, sendFriendRequest, searchResults, isLoading } = useFriendsStore();
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (debouncedQuery.length >= 2) {
      searchUsers(debouncedQuery);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedQuery, searchUsers]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendRequest = async (userId: string) => {
    try {
      await sendFriendRequest(userId);
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((user) => (
                <UserSearchResult
                  key={user._id}
                  user={user}
                  onSendRequest={handleSendRequest}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              {query.length >= 2 ? 'No users found' : 'Type to search users'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface UserSearchResultProps {
  user: User;
  onSendRequest: (userId: string) => void;
}

function UserSearchResult({ user, onSendRequest }: UserSearchResultProps) {
  return (
    <div className="px-4 py-2 hover:bg-gray-50 flex flex-col items-start justify-between gap-y-2">
      <div className="flex items-center space-x-3">
        {/* <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div> */}
        <div>
          <div className="font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.department}</div>
        </div>
      </div>
      <FriendshipButton user={user} onSendRequest={onSendRequest} />
    </div>
  );
}

interface FriendshipButtonProps {
  user: User;
  onSendRequest: (userId: string) => void;
}

function FriendshipButton({ user, onSendRequest }: FriendshipButtonProps) {
  if (user.friendshipStatus === 'friends') {
    return (
      <button
        disabled
        className="flex items-center space-x-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
      >
        <UserCheck className="h-4 w-4" />
        <span>Friends</span>
      </button>
    );
  }

  if (user.friendshipStatus === 'pending') {
    return (
      <button
        disabled
        className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
      >
        <Clock className="h-4 w-4" />
        <span>Pending</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => onSendRequest(user._id)}
      className={cn(
        'flex items-center space-x-1 px-3 py-1 rounded-full',
        'bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm transition-colors'
      )}
    >
      <UserPlus className="h-4 w-4" />
      <span>Add Friend</span>
    </button>
  );
}