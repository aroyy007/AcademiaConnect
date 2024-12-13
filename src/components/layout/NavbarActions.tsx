import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

export function NavbarActions() {
  const { user, logout } = useAuthStore();

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {user.role === 'admin' && (
        <Link
          to="/admin"
          className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
        >
          Admin Dashboard
        </Link>
      )}
      <button
        onClick={logout}
        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
      >
        <LogOut className="h-5 w-5" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}