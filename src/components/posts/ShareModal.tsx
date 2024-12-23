import React from 'react';
import { X, Link, Facebook, Twitter, Mail, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

export function ShareModal({ isOpen, onClose, postId }: ShareModalProps) {
  const shareUrl = `${window.location.origin}/post/${postId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const shareToSocial = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        url = `mailto:?body=${encodeURIComponent(shareUrl)}`;
        break;
    }
    if (url) window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Share Post</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={copyLink}
            className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <Link className="h-5 w-5 text-gray-500" />
              <span>Copy Link</span>
            </div>
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => shareToSocial('facebook')}
              className="flex items-center justify-center space-x-2 p-3 border rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              <Facebook className="h-5 w-5" />
              <span>Facebook</span>
            </button>
            
            <button
              onClick={() => shareToSocial('twitter')}
              className="flex items-center justify-center space-x-2 p-3 border rounded-md hover:bg-blue-50 hover:text-blue-400"
            >
              <Twitter className="h-5 w-5" />
              <span>Twitter</span>
            </button>
            
            <button
              onClick={() => shareToSocial('linkedin')}
              className="flex items-center justify-center space-x-2 p-3 border rounded-md hover:bg-blue-50 hover:text-blue-700"
            >
              <Share2 className="h-5 w-5" />
              <span>LinkedIn</span>
            </button>
            
            <button
              onClick={() => shareToSocial('email')}
              className="flex items-center justify-center space-x-2 p-3 border rounded-md hover:bg-gray-50"
            >
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}