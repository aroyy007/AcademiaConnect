import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { FriendsList } from './FriendsList';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const getUser = () => {
    const localUser = JSON.parse(window.localStorage.getItem("user"));
    const localToken = JSON.parse(window.localStorage.getItem("token"));

    if (localUser && localToken) {
      login(localUser, localToken)
      navigate('/home');
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </aside>
          <main className="lg:col-span-6">{children}</main>
          <aside className="hidden lg:block lg:col-span-3">
            <FriendsList />
          </aside>
        </div>
      </div>
    </div>
  );
}