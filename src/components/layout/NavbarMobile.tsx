import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Bell, Calendar, User } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

export function NavbarMobile() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-blue-600 p-2"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/notifications"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </Link>
          <Link
            to="/routine"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <Calendar className="h-5 w-5" />
            <span>Routine</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
        </div>
      )}
    </div>
  );
}