import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Add CSS for better styling

const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventInput, setEventInput] = useState('');

  const addEvent = () => {
    if (eventInput.trim()) {
      setEvents([...events, { id: Date.now(), date, text: eventInput }]);
      setEventInput('');
    }
  };

  const removeEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-semibold text-lg">Calendar</h2>
      <Calendar onChange={setDate} value={date} />
      <h3 className="mt-4">Events on {date.toDateString()}:</h3>
      <input
        type="text"
        value={eventInput}
        onChange={(e) => setEventInput(e.target.value)}
        placeholder="Add an event"
        className="border rounded p-2 w-full"
      />
      <button onClick={addEvent} className="bg-primary text-white rounded p-2 mt-2">Add Event</button>
      <ul className="mt-4">
        {events.filter(event => event.date.toDateString() === date.toDateString()).map(event => (
          <li key={event.id} className="flex justify-between items-center p-2 border-b">
            <span>{event.text}</span>
            <button onClick={() => removeEvent(event.id)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarWidget;
