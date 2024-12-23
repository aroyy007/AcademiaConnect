import React from 'react';
import { useAuthStore } from '../store/auth';
import { Navigate } from 'react-router-dom';
import { NotificationFilters } from '../components/notifications/NotificationFilters';
import { NotificationList } from '../components/notifications/NotificationList';
import type { Notification } from '../types';

type NotificationType = 'all' | 'university' | 'social' | 'unread';

export function NotificationsPage() {
  const { isAuthenticated } = useAuthStore();
  const [activeFilter, setActiveFilter] = React.useState<NotificationType>('all');
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const handleArchive = (id: string) => {
    // In a real app, you would update the archived status in the backend
    handleDelete(id);
  };

  const handleLoadMore = () => {
    // In a real app, you would fetch more notifications from the backend
    setPage((prev) => prev + 1);
    // Simulate no more notifications after page 3
    if (page >= 3) {
      setHasMore(false);
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    switch (activeFilter) {
      case 'university':
        return notification.type === 'university';
      case 'social':
        return notification.type === 'social';
      case 'unread':
        return !notification.read;
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <NotificationFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        unreadCount={unreadCount}
      />
      <div className="mt-6">
        <NotificationList
          notifications={filteredNotifications}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDelete}
          onArchive={handleArchive}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
}