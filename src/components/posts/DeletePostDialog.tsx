import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeletePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeletePostDialog({ isOpen, onClose, onConfirm }: DeletePostDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center space-x-3 text-red-600 mb-4">
          <AlertTriangle className="h-6 w-6" />
          <h3 className="text-lg font-semibold">Delete Post</h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this post? This action can be undone within 24 hours by
          contacting support.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
}