import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Routine, ScheduleItem } from '../../types';

interface RoutineCalendarProps {
  routine: Routine;
  onEditClass?: (item: ScheduleItem) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

export function RoutineCalendar({ routine, onEditClass }: RoutineCalendarProps) {
  const [currentWeek, setCurrentWeek] = React.useState(0);

  const getClassForTimeSlot = (day: string, time: string) => {
    return routine.schedule.find(
      (item) => item.day === day && item.time === time
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => setCurrentWeek((prev) => prev - 1)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-medium text-gray-900">
          Week {currentWeek + 1}
        </h3>
        <button
          onClick={() => setCurrentWeek((prev) => prev + 1)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-6 border-b">
            <div className="p-4 text-sm font-medium text-gray-500">Time</div>
            {DAYS.map((day) => (
              <div key={day} className="p-4 text-sm font-medium text-gray-900">
                {day}
              </div>
            ))}
          </div>

          <div className="divide-y">
            {TIME_SLOTS.map((time) => (
              <div key={time} className="grid grid-cols-6">
                <div className="p-4 text-sm text-gray-500">{time}</div>
                {DAYS.map((day) => {
                  const classItem = getClassForTimeSlot(day, time);
                  return (
                    <div
                      key={day}
                      className={cn(
                        'p-4 relative',
                        classItem && 'bg-blue-50'
                      )}
                      onClick={() => classItem && onEditClass?.(classItem)}
                    >
                      {classItem && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900">
                            {classItem.subject}
                          </p>
                          <p className="text-xs text-gray-500">
                            {classItem.teacher}
                          </p>
                          <p className="text-xs text-gray-500">
                            Room: {classItem.room}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}