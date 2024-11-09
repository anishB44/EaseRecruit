import React, { useState, useEffect } from 'react';

const NotesWidget = () => {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [noteInput, setNoteInput] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('Medium');

  const addNote = () => {
    if (noteInput.trim()) {
      const newNote = {
        id: Date.now(),
        text: noteInput,
        category,
        priority,
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes)); // Save to local storage
      setNoteInput('');
    }
  };

  const removeNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes)); // Update local storage
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-semibold text-lg">Notes</h2>
      <div className="mt-4">
        <input
          type="text"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Add a new note"
          className="border rounded p-2 w-full"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2 mt-2 w-full">
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border rounded p-2 mt-2 w-full">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addNote} className="bg-primary text-white rounded p-2 mt-2">Add Note</button>
      </div>
      <ul className="mt-4">
        {notes.map(note => (
          <li key={note.id} className="flex justify-between items-center p-2 border-b">
            <span>{note.text} - <em>{note.category}</em> [Priority: {note.priority}]</span>
            <button onClick={() => removeNote(note.id)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesWidget;
