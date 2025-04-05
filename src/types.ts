export interface Course {
  id: string;
  name: string;
  code: string;
  faculty: string;
  duration: number; // in hours
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  course: Course;
  room: string;
  scheduleId: string; // Added to track which schedule this slot belongs to
}

export interface Faculty {
  id: string;
  name: string;
  department: string;
}

export interface Schedule {
  id: string;
  name: string;
  slots: TimeSlot[];
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
];