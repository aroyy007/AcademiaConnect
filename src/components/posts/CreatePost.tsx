import React, { useState } from 'react';
import { useAuthStore } from '../../store/auth';
import { usePostsStore } from '../../store/posts';
import { Image, Send } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const addPost = usePostsStore((state) => state.addPost);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!content.trim() || !user) return;

  //   const newPost = {
  //     id: crypto.randomUUID(),
  //     userId: user?._id,
  //     user: user,
  //     content,
  //     images,
  //     likes: [],
  //     comments: [],
  //     createdAt: new Date(),
  //   };

  //   // addPost(newPost);


  //   setContent('');
  //   setImages([]);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    // const newPost = {
    //   userId: user?._id,
    //   content,
    //   images,
    //   likes: [],
    //   comments: [],
    //   createdAt: new Date(),
    // };

    try {
      const res = await axios.post("http://localhost:9000/api/posts", {
        content, images
      },{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      const res_data = res?.data;

      console.log(res_data);
      if (res_data?.success) {
  
        addPost(res_data?.data);
        toast.success('Post created successfully!');
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      console.error('Post creation failed:', error);
      toast.error('Post creation failed. Please try again.');
    }

    setContent('');
    setImages([]);
    return; // Ensure a clean exit
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server and get a URL
      const imageUrl = URL.createObjectURL(file);
      setImages([...images, imageUrl]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />

      {images.length > 0 && (
        <div className="mt-2 flex gap-2 flex-wrap">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Uploaded content"
              className="h-20 w-20 object-cover rounded"
            />
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <label className="cursor-pointer text-gray-600 hover:text-blue-600">
          <Image className="h-5 w-5" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        <button
          type="submit"
          disabled={!content.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}