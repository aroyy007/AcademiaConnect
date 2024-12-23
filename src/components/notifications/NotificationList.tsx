import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Inbox } from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import type { Notification } from '../../types';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function NotificationList({
  notifications,
  onMarkAsRead,
  onDelete,
  onArchive,
  onLoadMore,
  hasMore,
}: NotificationListProps) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView && hasMore && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasMore, onLoadMore]);

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Inbox className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
        <p className="mt-1 text-sm text-gray-500">
          You're all caught up! Check back later for new updates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
      {hasMore && (
        <div ref={ref} className="flex justify-center py-4">
          <div className="animate-pulse text-gray-400">Loading more...</div>
        </div>
      )}
    </div>
  );
}