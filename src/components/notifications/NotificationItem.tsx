import React from 'react';
import { Bell, CheckCircle, Clock, Trash2, Archive } from 'lucide-react';
import { cn, formatDate } from '../../lib/utils';
import type { Notification } from '../../types';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  onArchive,
}: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'university':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'social':
        return <Clock className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div
      className={cn(
        'p-4 bg-white rounded-lg shadow-sm border-l-4 transition-colors',
        notification.read ? 'border-gray-200' : 'border-blue-500',
        !notification.read && 'bg-blue-50'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
            <p className="mt-1 text-sm text-gray-500">{notification.content}</p>
            <p className="mt-1 text-xs text-gray-400">
              {formatDate(notification.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
              title="Mark as read"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => onArchive(notification.id)}
            className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
            title="Archive"
          >
            <Archive className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(notification.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}