import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  content: z.string().min(1, 'Content is required').max(1000, 'Content is too long'),
  images: z.array(z.string()).optional(),
});

type PostForm = z.infer<typeof postSchema>;

interface PostEditorProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    images?: string[];
  };
  onSubmit: (data: PostForm) => void;
  onCancel?: () => void;
}

export function PostEditor({ initialData, onSubmit, onCancel }: PostEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
      images: [],
    },
  });

  const images = watch('images') || [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server and get a URL
      const imageUrl = URL.createObjectURL(file);
      setValue('images', [...images, imageUrl]);
    }
  };

  const removeImage = (index: number) => {
    setValue(
      'images',
      images.filter((_, i) => i !== index)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          {...register('title')}
          className={cn(
            'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
            errors.title && 'border-red-500'
          )}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          {...register('content')}
          rows={5}
          className={cn(
            'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
            errors.content && 'border-red-500'
          )}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="mt-2 flex items-center space-x-4">
          <label className="cursor-pointer">
            <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
              <Image className="h-5 w-5" />
              <span>Add Image</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="h-24 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting
            ? 'Saving...'
            : initialData
            ? 'Save Changes'
            : 'Create Post'}
        </button>
      </div>
    </form>
  );
}