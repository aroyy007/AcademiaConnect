import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

export function CommentModal({ isOpen, onClose, onSubmit }: CommentModalProps) {
  const { register, handleSubmit, reset } = useForm<{ content: string }>();

  const handleFormSubmit = (data: { content: string }) => {
    onSubmit(data.content);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Add Comment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <textarea
            {...register('content', { required: true })}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Write your comment..."
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}