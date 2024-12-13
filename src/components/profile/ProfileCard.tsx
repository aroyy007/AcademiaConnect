import React from 'react';
import { useAuthStore } from '../../store/auth';
import { User, Mail, BookOpen, Users } from 'lucide-react';

export function ProfileCard() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <User className="h-12 w-12 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500">{user.department}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-gray-600">
          <Mail className="h-5 w-5" />
          <span>{user.email}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-600">
          <BookOpen className="h-5 w-5" />
          <span>Semester {user.semester}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-600">
          <Users className="h-5 w-5" />
          <span>Section {user.section}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-500">Posts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-500">Friends</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-500">Comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}