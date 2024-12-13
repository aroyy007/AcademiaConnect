import React from 'react';
import { Calendar, Grid, List } from 'lucide-react';
import { cn } from '../../lib/utils';

type ViewMode = 'calendar' | 'timeline' | 'list';

interface RoutineHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  semester: number;
  section: string;
}

export function RoutineHeader({
  viewMode,
  onViewModeChange,
  semester,
  section,
}: RoutineHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
      <div className="mb-4 sm:mb-0">
        <h1 className="text-2xl font-bold text-gray-900">Class Routine</h1>
        <p className="mt-1 text-sm text-gray-500">
          Semester {semester}, Section {section}
        </p>
      </div>

      <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
        <ViewModeButton
          active={viewMode === 'calendar'}
          onClick={() => onViewModeChange('calendar')}
          icon={<Calendar className="h-4 w-4" />}
        >
          Calendar
        </ViewModeButton>
        <ViewModeButton
          active={viewMode === 'timeline'}
          onClick={() => onViewModeChange('timeline')}
          icon={<Grid className="h-4 w-4" />}
        >
          Timeline
        </ViewModeButton>
        <ViewModeButton
          active={viewMode === 'list'}
          onClick={() => onViewModeChange('list')}
          icon={<List className="h-4 w-4" />}
        >
          List
        </ViewModeButton>
      </div>
    </div>
  );
}

interface ViewModeButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

function ViewModeButton({ children, active, onClick, icon }: ViewModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
        active
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-gray-100'
      )}
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </button>
  );
}