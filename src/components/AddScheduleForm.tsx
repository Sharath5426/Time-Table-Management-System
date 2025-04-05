import React, { useState } from 'react';
import { Course, DAYS, Faculty, TIME_SLOTS } from '../types';
import { Clock, Users, BookOpen, Home } from 'lucide-react';

interface AddScheduleFormProps {
  courses: Course[];
  faculty: Faculty[];
  onAdd: (data: {
    day: string;
    startTime: string;
    course: Course;
    room: string;
  }) => void;
}

export function AddScheduleForm({ courses, faculty, onAdd }: AddScheduleFormProps) {
  const [formData, setFormData] = useState({
    day: DAYS[0],
    startTime: TIME_SLOTS[0],
    courseId: '',
    room: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = courses.find(c => c.id === formData.courseId);
    if (!course) return;

    onAdd({
      day: formData.day,
      startTime: formData.startTime,
      course,
      room: formData.room,
    });

    setFormData({
      day: DAYS[0],
      startTime: TIME_SLOTS[0],
      courseId: '',
      room: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Schedule</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Clock className="inline-block w-4 h-4 mr-2" />
          Day
        </label>
        <select
          value={formData.day}
          onChange={e => setFormData({ ...formData, day: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          {DAYS.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Clock className="inline-block w-4 h-4 mr-2" />
          Time Slot
        </label>
        <select
          value={formData.startTime}
          onChange={e => setFormData({ ...formData, startTime: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          {TIME_SLOTS.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <BookOpen className="inline-block w-4 h-4 mr-2" />
          Course
        </label>
        <select
          value={formData.courseId}
          onChange={e => setFormData({ ...formData, courseId: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name} - {course.code}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Home className="inline-block w-4 h-4 mr-2" />
          Room
        </label>
        <input
          type="text"
          value={formData.room}
          onChange={e => setFormData({ ...formData, room: e.target.value })}
          placeholder="Enter room number"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Schedule
      </button>
    </form>
  );
}