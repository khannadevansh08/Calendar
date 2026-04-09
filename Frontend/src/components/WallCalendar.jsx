import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isToday,
  addDays
} from 'date-fns';
import './WallCalendar.css';

const WallCalendar = ({ currentDate, selectedDate, onDateClick }) => {

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      const d = addDays(startDate, i);
      const dayName = format(d, 'EEE').toUpperCase();
      const isWeekend = dayName === 'SAT' || dayName === 'SUN';

      days.push(
        <div
          className={`grid-heading${isWeekend ? ' weekend-label' : ''}`}
          key={i}
        >
          {dayName}
        </div>
      );
    }

    return <div className="grid-row-headings">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDateGrid = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDateGrid = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDateGrid;

    while (day <= endDateGrid) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, 'd');
        const daySlug = format(day, 'EEE').toUpperCase();

        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isWeekend = (daySlug === 'SAT' || daySlug === 'SUN') && isCurrentMonth;
        const isCurrentDay = isToday(day) && isCurrentMonth;

        const classes = [
          'grid-cell',
          !isCurrentMonth && 'out-of-month',
          isWeekend && 'weekend-cell',
          isSelected && 'selected',
          isCurrentDay && 'today',
        ].filter(Boolean).join(' ');

        days.push(
          <div
            className={classes}
            key={day.toString()}
            onClick={() => isCurrentMonth && onDateClick(cloneDay)}
          >
            <span className="cell-number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid-row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="grid-body">{rows}</div>;
  };

  return (
    <div className="clean-calendar">
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default WallCalendar;
