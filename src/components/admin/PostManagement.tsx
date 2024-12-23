import React from 'react';
import { usePostsStore } from '../../store/posts';
import { useAdminStore } from '../../store/admin';
import { formatDate } from '../../lib/utils';
import { Trash2 } from 'lucide-react';
import { Table } from '../ui/Table';
import { DeletePostModal } from './DeletePostModal';
import type { Post } from '../../types';

export function PostManagement() {
  const posts = usePostsStore((state) => state.posts);
  const { deletePost } = useAdminStore();
  const [selectedPostId, setSelectedPostId] = React.useState<string | null>(null);

  const handleDelete = (postId: string) => {
    setSelectedPostId(postId);
  };

  const handleConfirmDelete = (reason: string) => {
    if (selectedPostId) {
      deletePost(selectedPostId);
      setSelectedPostId(null);
    }
  };

  const columns = [
    {
      header: 'User',
      accessor: 'userId',
      className: 'font-medium text-gray-900',
    },
    {
      header: 'Content',
      accessor: (post: Post) => (
        <div className="max-w-md truncate">
          {post.content}
          {post.images && post.images.length > 0 && (
            <span className="ml-2 text-blue-500">
              [{post.images.length} image(s)]
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Posted Date',
      accessor: (post: Post) => formatDate(post.createdAt),
    },
    {
      header: 'Engagement',
      accessor: (post: Post) => `${post.likes.length} likes · ${post.comments.length} comments`,
    },
    {
      header: 'Actions',
      accessor: (post: Post) => (
        <button
          onClick={() => handleDelete(post.id)}
          className="text-red-600 hover:text-red-900"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Post Management
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage user posts
        </p>
      </div>

      <Table
        columns={columns}
        data={posts}
        emptyMessage="No posts found"
      />

      <DeletePostModal
        isOpen={selectedPostId !== null}
        onClose={() => setSelectedPostId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}