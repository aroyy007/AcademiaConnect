import React from 'react';
import { Modal } from '../ui/Modal';

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function DeletePostModal({ isOpen, onClose, onConfirm }: DeletePostModalProps) {
  const [reason, setReason] = React.useState('');

  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Post"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </>
      }
    >
      <p className="text-sm text-gray-500 mb-4">
        Are you sure you want to delete this post? This action cannot be undone.
      </p>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason for deletion (optional)"
        className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows={3}
      />
    </Modal>
  );
}