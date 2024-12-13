import React from 'react';
import { useAuthStore } from '../../store/auth';
import { User, BookOpen, Users2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.department}</p>
        </div>
      </div>

      <nav className="space-y-2">
        <Link
          to="/profile"
          className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted text-foreground"
        >
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>
        <Link
          to="/friends"
          className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted text-foreground"
        >
          <Users2 className="h-5 w-5" />
          <span>Friends</span>
        </Link>
        <Link
          to="/routine"
          className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted text-foreground"
        >
          <Calendar className="h-5 w-5" />
          <span>Routine</span>
        </Link>
        <Link
          to="/courses"
          className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted text-foreground"
        >
          <BookOpen className="h-5 w-5" />
          <span>Courses</span>
        </Link>
      </nav>
    </div>
  );
}