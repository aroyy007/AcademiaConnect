import React from 'react';

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="px-4 py-2">
      <p className="text-gray-800 whitespace-pre-wrap break-words">{content}</p>
    </div>
  );
}