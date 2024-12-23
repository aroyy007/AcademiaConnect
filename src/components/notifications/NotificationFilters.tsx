import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

type NotificationType = 'all' | 'university' | 'social' | 'unread';

interface NotificationFiltersProps {
  activeFilter: NotificationType;
  onFilterChange: (filter: NotificationType) => void;
  unreadCount: number;
}

export function NotificationFilters({
  activeFilter,
  onFilterChange,
  unreadCount,
}: NotificationFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b">
      <div className="flex items-center space-x-2 mb-4 sm:mb-0">
        <Filter className="h-5 w-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <FilterButton
          active={activeFilter === 'all'}
          onClick={() => onFilterChange('all')}
        >
          All
        </FilterButton>
        <FilterButton
          active={activeFilter === 'unread'}
          onClick={() => onFilterChange('unread')}
        >
          Unread ({unreadCount})
        </FilterButton>
        <FilterButton
          active={activeFilter === 'university'}
          onClick={() => onFilterChange('university')}
        >
          University
        </FilterButton>
        <FilterButton
          active={activeFilter === 'social'}
          onClick={() => onFilterChange('social')}
        >
          Social
        </FilterButton>
      </div>
    </div>
  );
}

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function FilterButton({ children, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1 rounded-full text-sm font-medium transition-colors',
        active
          ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      )}
    >
      {children}
    </button>
  );
}