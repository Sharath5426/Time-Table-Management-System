import React, { useState } from 'react';
import { Calendar, GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Timetable } from './components/Timetable';
import { AddScheduleForm } from './components/AddScheduleForm';
import { Course, Faculty, Schedule, TimeSlot } from './types';

// Sample data
const sampleCourses: Course[] = [
  { id: '1', name: 'Web Development', code: 'CS101', faculty: 'Dr. Smith', duration: 1 },
  { id: '2', name: 'Database Systems', code: 'CS102', faculty: 'Dr. Johnson', duration: 1 },
  { id: '3', name: 'Algorithms', code: 'CS103', faculty: 'Dr. Williams', duration: 1 },
];

const sampleFaculty: Faculty[] = [
  { id: '1', name: 'Dr. Smith', department: 'Computer Science' },
  { id: '2', name: 'Dr. Johnson', department: 'Computer Science' },
  { id: '3', name: 'Dr. Williams', department: 'Computer Science' },
];

function App() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: '1', name: 'Default Schedule', slots: [] }
  ]);
  const [currentScheduleId, setCurrentScheduleId] = useState('1');

  const handleAddSchedule = (data: {
    day: string;
    startTime: string;
    course: Course;
    room: string;
  }) => {
    const currentSchedule = schedules.find(s => s.id === currentScheduleId);
    if (!currentSchedule) return;

    // Check for conflicts within the current schedule
    const hasConflict = currentSchedule.slots.some(
      slot => 
        slot.day === data.day && 
        slot.startTime === data.startTime
    );

    if (hasConflict) {
      alert('Time slot is already occupied!');
      return;
    }

    const newSlot: TimeSlot = {
      id: Math.random().toString(),
      ...data,
      endTime: data.startTime,
      scheduleId: currentScheduleId
    };

    setSchedules(schedules.map(schedule => 
      schedule.id === currentScheduleId
        ? { ...schedule, slots: [...schedule.slots, newSlot] }
        : schedule
    ));
  };

  const handleDeleteSlot = (slotId: string) => {
    setSchedules(schedules.map(schedule => ({
      ...schedule,
      slots: schedule.slots.filter(slot => slot.id !== slotId)
    })));
  };

  const handleCreateNewSchedule = () => {
    const newSchedule: Schedule = {
      id: Math.random().toString(),
      name: `Schedule ${schedules.length + 1}`,
      slots: []
    };
    setSchedules([...schedules, newSchedule]);
    setCurrentScheduleId(newSchedule.id);
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    if (schedules.length === 1) {
      alert('Cannot delete the last schedule!');
      return;
    }
    
    const newSchedules = schedules.filter(s => s.id !== scheduleId);
    setSchedules(newSchedules);
    setCurrentScheduleId(newSchedules[0].id);
  };

  const currentSchedule = schedules.find(s => s.id === currentScheduleId) || schedules[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto px-4 print:px-0">
        <div className="flex items-center justify-center mb-8 print:mb-4">
          <Calendar className="w-8 h-8 text-blue-600 mr-2 print:hidden" />
          <h1 className="text-3xl font-bold text-gray-900">Academic Timetable Management</h1>
        </div>

        <div className="mb-6 print:hidden">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {schedules.map(schedule => (
              <div
                key={schedule.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
                  schedule.id === currentScheduleId
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentScheduleId(schedule.id)}
              >
                <span>{schedule.name}</span>
                {schedules.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSchedule(schedule.id);
                    }}
                    className="p-1 hover:bg-red-100 rounded-full"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleCreateNewSchedule}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
              New Schedule
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 print:block">
          <div className="lg:col-span-1 print:hidden">
            <AddScheduleForm
              courses={sampleCourses}
              faculty={sampleFaculty}
              onAdd={handleAddSchedule}
            />
          </div>
          
          <div className="lg:col-span-3 print:w-full">
            <div className="bg-white p-6 rounded-lg shadow-md print:shadow-none print:p-0">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600 mr-2 print:hidden" />
                <h2 className="text-xl font-semibold">{currentSchedule.name}</h2>
              </div>
              <Timetable 
                schedule={currentSchedule.slots}
                onDeleteSlot={handleDeleteSlot}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;