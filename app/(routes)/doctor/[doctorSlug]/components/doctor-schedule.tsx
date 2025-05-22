"use client";

import { useState } from "react";
import {
  format,
  addDays,
  startOfDay,
  isBefore,
  parse,
  getDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Genera las horas de 8:00 AM a 9:30 PM (en media hora)
const fullHours = Array.from({ length: 28 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2); // 8 a 21
  const minutes = i % 2 === 0 ? "00" : "30";
  const suffix = hour < 12 ? "AM" : hour === 12 ? "PM" : "PM";
  const displayHour = hour <= 12 ? hour : hour - 12;
  return `${displayHour}:${minutes} ${suffix}`;
});

const isWithinAvailability = (timeStr: string) => {
  const time = parse(timeStr, "h:mm a", new Date());
  const minTime = parse("11:00 AM", "h:mm a", new Date());
  const maxTime = parse("6:30 PM", "h:mm a", new Date());
  return time >= minTime && time <= maxTime;
};

const CalendarAvailability = () => {
  const [startDate, setStartDate] = useState(startOfDay(new Date()));
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
          const isWeekend = getDay(day) === 0 || getDay(day) === 6; // Domingo o Sábado

          return (
            <div key={i}>
              <h4
                className={`text-center font-semibold mb-2 ${
                  isWeekend ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {format(day, "EEE, MMM d")}
              </h4>

              <div className="grid grid-cols-3 sm:grid-cols-1 items-center gap-2">
                {hoursToShow.map((hour, j) => {
                  const isAvailable =
                    !isWeekend && isWithinAvailability(hour);

                  return (
                    <div
                      key={j}
                      className={`w-full text-center rounded-full px-4 py-2 text-sm font-medium 
                        ${
                          isAvailable
                            ? "bg-green-200 text-green-900"
                            : "bg-gray-200 text-gray-400"
                        }`}
                    >
                      {hour}
                    </div>
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