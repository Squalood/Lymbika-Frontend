"use client";

import { useState } from "react";
import { format, addDays, startOfDay, isBefore } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Genera las horas de 9:00 AM a 9:00 PM (13 horas)
const fullHours = Array.from({ length: 13 }, (_, i) => {
  const hour = 9 + i;
  const suffix = hour < 12 ? 'AM' : hour === 12 ? 'PM' : 'PM';
  const displayHour = hour <= 12 ? hour : hour - 12;
  return `${displayHour}:00 ${suffix}`;
});

const CalendarAvailability = () => {
  const [startDate, setStartDate] = useState(startOfDay(new Date()));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [expandedDayIndex, setExpandedDayIndex] = useState<number | null>(null);

  const today = startOfDay(new Date());
  const days = Array.from({ length: 3 }, (_, i) => addDays(startDate, i));
  const canGoBack = isBefore(today, startDate);

  const handleNext = () => {
    setStartDate(addDays(startDate, 3));
    setExpandedDayIndex(null);
  };

  const handlePrev = () => {
    if (canGoBack) {
      setStartDate(addDays(startDate, -3));
      setExpandedDayIndex(null);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedDayIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="bg-white p-4">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} disabled={!canGoBack} className={canGoBack ? "" : "opacity-30 cursor-not-allowed"}>
          <ChevronLeft />
        </button>
        <h3 className="font-semibold text-gray-800">
          {format(days[0], "MMM dd")} - {format(days[2], "dd")}
        </h3>
        <button onClick={handleNext}>
          <ChevronRight />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols sm:grid-cols-3 gap-4">
        {days.map((day, i) => {
          const isExpanded = expandedDayIndex === i;
          const hoursToShow = isExpanded ? fullHours : fullHours.slice(0, 8);

          return (
            <div key={i} className="border-r last:border-r-0 pr-3">
              <h4 className="text-center font-semibold text-gray-700 mb-2">
                {format(day, "EEE, MMM d")}
              </h4>

              <div className="grid grid-cols-3 sm:grid-cols-1 items-center gap-2">
                {hoursToShow.map((hour, j) => {
                  const fullDate = `${format(day, "yyyy-MM-dd")} ${hour}`;
                  return (
                    <button
                      key={j}
                      onClick={() => setSelectedTime(fullDate)}
                      className={`w-full rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 
                        ${
                          selectedTime === fullDate
                            ? "bg-primary text-white"
                            : "bg-blue-100 text-primary hover:bg-blue-100"
                        }`}
                    >
                      {hour}
                    </button>
                  );
                })}

                <Button
                  onClick={() => toggleExpand(i)}
                  className="text-sm text-background font-medium mt-1 hover:underline w-full"
                > 
                  {isExpanded ? "Show less" : "More"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarAvailability;