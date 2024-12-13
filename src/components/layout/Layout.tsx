import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { FriendsList } from './FriendsList';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
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