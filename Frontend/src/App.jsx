import { useState } from 'react';
import './App.css';
import WallCalendar from './components/WallCalendar';
import NotesSection from './components/NotesSection';
import HeroImage from './components/HeroImage';
import { addMonths, subMonths, format } from 'date-fns';
import { ChevronLeft, ChevronRight, X, StickyNote } from 'lucide-react';

const RING_COUNT = 22;

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isNotesOpen, setIsNotesOpen] = useState(true);

  const currentMonthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDateClick = (day) => {
    if (selectedDate && day.getTime() === selectedDate.getTime()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(day);
      setIsNotesOpen(true);
    }
  };

  const spiralRings = Array.from({ length: RING_COUNT }).map((_, i) => (
    <div key={i} className="spiral-ring">
      <div className="ring-highlight" />
    </div>
  ));

  return (
    <div className="app-wrapper">
      <div className="hanger" />
      <div className={`paper-container ${selectedDate ? 'focused-mode' : ''}`}>
        <div className="branding-title">Elite Studio</div>
        <div className="spiral-binding">{spiralRings}</div>

        {/* Hero Image */}
        <div className="hero-wrapper">
          <HeroImage date={currentDate} />
          <div className="hero-ribbon">
            <div className="ribbon-year">{currentDate.getFullYear()}</div>
            <div className="ribbon-month">{format(currentDate, 'MMMM')}</div>
            <div className="nav-arrows">
              <button className="nav-arr" onClick={prevMonth} aria-label="Previous month">
                <ChevronLeft size={18} />
              </button>
              <button className="nav-arr" onClick={nextMonth} aria-label="Next month">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          {/* Notes Panel */}
          {isNotesOpen ? (
            <div className="notes-col">
              <div className="notes-header">
                <span className="notes-heading">
                  {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Monthly Notes'}
                </span>
                <div className="notes-actions">
                  {selectedDate && (
                    <button
                      className="notes-action-btn accent"
                      onClick={() => setSelectedDate(null)}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    className="notes-action-btn"
                    onClick={() => setIsNotesOpen(false)}
                    aria-label="Close notes"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>
              <NotesSection
                monthKey={currentMonthKey}
                selectedDate={selectedDate}
              />
            </div>
          ) : (
            <div className="notes-col">
              <button
                className="show-notes-btn"
                onClick={() => setIsNotesOpen(true)}
              >
                <StickyNote size={13} />
                Notes
              </button>
            </div>
          )}

          {/* Calendar Panel */}
          <div className="calendar-col">
            <WallCalendar
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
