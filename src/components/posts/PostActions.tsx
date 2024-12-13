import React from 'react';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

interface PostActionsProps {
  postId: string;
  authorId: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function PostActions({ postId, authorId, onEdit, onDelete }: PostActionsProps) {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const user = useAuthStore((state) => state.user);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user || user.id !== authorId) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => {
                onEdit();
                setShowMenu(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Post
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowMenu(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}