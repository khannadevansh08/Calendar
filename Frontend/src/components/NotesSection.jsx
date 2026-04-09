import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import './NotesSection.css';

const NotesSection = ({ monthKey, selectedDate }) => {
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Generate a specific key based on month and selection
  const getStorageKey = useCallback(() => {
    let key = `notes-${monthKey}`;
    if (selectedDate) {
      key += `-date-${format(selectedDate, 'yyyyMMdd')}`;
    }
    return key;
  }, [monthKey, selectedDate]);

  useEffect(() => {
    const savedNotes = localStorage.getItem(getStorageKey());
    setNotes(savedNotes || '');
    setIsSaved(false);
  }, [getStorageKey]);

  const handleSave = (val) => {
    localStorage.setItem(getStorageKey(), val);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="notes-container">
      <div className="ruled-paper">
        <textarea
          className="ruled-textarea"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            handleSave(e.target.value);
          }}
          placeholder={selectedDate ? "Add notes for this date..." : "Add monthly notes..."}
          spellCheck="false"
        />
        <span className={`save-status ${isSaved ? 'visible' : ''}`}>Auto-saved</span>
      </div>
    </div>
  );
};

export default NotesSection;
