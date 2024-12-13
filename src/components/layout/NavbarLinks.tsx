import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Bell, Calendar, User } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

export function NavbarLinks() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link
        to="/homepage"
        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
      >
        <Home className="h-5 w-5" />
        <span>Home</span>
      </Link>
      <Link
        to="/notifications"
        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
      >
        <Bell className="h-5 w-5" />
        <span>Notifications</span>
      </Link>
      <Link
        to="/routine"
        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
      >
        <Calendar className="h-5 w-5" />
        <span>Routine</span>
      </Link>
      <Link
        to="/profile"
        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
      >
        <User className="h-5 w-5" />
        <span>Profile</span>
      </Link>
    </div>
  );
}