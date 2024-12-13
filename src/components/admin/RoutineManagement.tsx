import React from 'react';
import { useAdminStore } from '../../store/admin';
import { Trash2, Plus } from 'lucide-react';
import type { ScheduleItem } from '../../types';

export function RoutineManagement() {
  const { routines, addRoutine, deleteRoutine } = useAdminStore();
  const [isAdding, setIsAdding] = React.useState(false);
  const [formData, setFormData] = React.useState({
    semester: '',
    section: '',
    department: '',
    schedule: [] as ScheduleItem[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoutine = {
      id: crypto.randomUUID(),
      semester: parseInt(formData.semester),
      section: formData.section,
      department: formData.department,
      schedule: formData.schedule,
    };
    addRoutine(newRoutine);
    setIsAdding(false);
    setFormData({
      semester: '',
      section: '',
      department: '',
      schedule: [],
    });
  };

  const addScheduleItem = () => {
    setFormData((prev) => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        { day: '', time: '', subject: '', teacher: '', room: '' },
      ],
    }));
  };

  const updateScheduleItem = (index: number, field: keyof ScheduleItem, value: string) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Routine Management
        </h3>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Routine
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">Add New Routine</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Semester
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, semester: e.target.value }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Section
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, section: e.target.value }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, department: e.target.value }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Administration">
                      Business Administration
                    </option>
                    <option value="Engineering">Engineering</option>
                    <option value="Law">Law</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-medium">Schedule</h4>
                  <button
                    type="button"
                    onClick={addScheduleItem}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Class
                  </button>
                </div>

                {formData.schedule.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2">
                    <select
                      value={item.day}
                      onChange={(e) =>
                        updateScheduleItem(index, 'day', e.target.value)
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Day</option>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
                        (day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        )
                      )}
                    </select>
                    <input
                      type="time"
                      value={item.time}
                      onChange={(e) =>
                        updateScheduleItem(index, 'time', e.target.value)
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      value={item.subject}
                      onChange={(e) =>
                        updateScheduleItem(index, 'subject', e.target.value)
                      }
                      placeholder="Subject"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      value={item.teacher}
                      onChange={(e) =>
                        updateScheduleItem(index, 'teacher', e.target.value)
                      }
                      placeholder="Teacher"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      value={item.room}
                      onChange={(e) =>
                        updateScheduleItem(index, 'room', e.target.value)
                      }
                      placeholder="Room"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Routine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Semester
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {routines.map((routine) => (
              <tr key={routine.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {routine.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {routine.semester}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {routine.section}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {routine.schedule.length} classes
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => deleteRoutine(routine.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {routines.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  No routines found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}