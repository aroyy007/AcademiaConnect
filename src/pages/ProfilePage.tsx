import React from 'react';
import { useAuthStore } from '../store/auth';
import { Navigate } from 'react-router-dom';
import { ProfileCard } from '../components/profile/ProfileCard';

export function ProfilePage() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ProfileCard />
    </div>
  );
}