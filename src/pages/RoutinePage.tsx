import React from 'react';
import { useAuthStore } from '../store/auth';
import { Navigate } from 'react-router-dom';
import { RoutineHeader } from '../components/routine/RoutineHeader';
import { RoutineCalendar } from '../components/routine/RoutineCalendar';
import type { Routine, ScheduleItem } from '../types';

type ViewMode = 'calendar' | 'timeline' | 'list';

export function RoutinePage() {
  const { isAuthenticated, user } = useAuthStore();
  const [viewMode, setViewMode] = React.useState<ViewMode>('calendar');
  const [routine, setRoutine] = React.useState<Routine>({
    id: '1',
    semester: user?.semester || 1,
    section: user?.section || 'A',
    department: user?.department || '',
    schedule: [],
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleEditClass = (item: ScheduleItem) => {
    // In a real app, you would open a modal to edit the class details
    console.log('Edit class:', item);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RoutineHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        semester={routine.semester}
        section={routine.section}
      />
      
      <div className="mt-6">
        {viewMode === 'calendar' && (
          <RoutineCalendar routine={routine} onEditClass={handleEditClass} />
        )}
        {/* Add Timeline and List view components here */}
      </div>
    </div>
  );
}