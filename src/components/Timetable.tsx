import React from 'react';
import { DAYS, TIME_SLOTS, TimeSlot } from '../types';
import { Printer, X } from 'lucide-react';

interface TimetableProps {
  schedule: TimeSlot[];
  onDeleteSlot: (slotId: string) => void;
}

export function Timetable({ schedule, onDeleteSlot }: TimetableProps) {
  const handlePrint = () => {
    window.print();
  };

  const getSlotContent = (day: string, time: string) => {
    const slot = schedule.find(
      s => s.day === day && s.startTime === time
    );
    return slot ? (
      <div className="bg-blue-100 p-2 rounded-md print:bg-white print:border print:border-gray-300 relative group">
        <button
          onClick={() => onDeleteSlot(slot.id)}
          className="absolute top-1 right-1 p-1 bg-red-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
        >
          <X className="w-3 h-3 text-red-500" />
        </button>
        <p className="font-semibold">{slot.course.name}</p>
        <p className="text-sm text-gray-600">{slot.room}</p>
        <p className="text-sm text-gray-600">{slot.course.faculty}</p>
      </div>
    ) : null;
  };

  return (
    <div>
      <div className="flex justify-end mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Schedule
        </button>
      </div>
      <div className="overflow-x-auto print:overflow-visible">
        <table className="min-w-full bg-white border border-gray-200 print:shadow-none">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-50 print:bg-gray-100">Time</th>
              {DAYS.map(day => (
                <th key={day} className="border p-2 bg-gray-50 print:bg-gray-100">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map(time => (
              <tr key={time}>
                <td className="border p-2 font-medium">{time}</td>
                {DAYS.map(day => (
                  <td key={`${day}-${time}`} className="border p-2 h-24 print:h-auto">
                    {getSlotContent(day, time)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}