import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [workInterval, setWorkInterval] = useState(25 * 60);
  const [breakInterval, setBreakInterval] = useState(5 * 60);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isWorkSession, setIsWorkSession] = useState(true);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (isWorkSession) {
        alert("Work session complete! Take a break.");
        setTimeLeft(breakInterval);
      } else {
        alert("Break time over! Back to work.");
        setCyclesCompleted(cyclesCompleted + 1);
        setTimeLeft(workInterval);
      }
      setIsWorkSession(!isWorkSession);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, isWorkSession, workInterval, breakInterval]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isWorkSession ? workInterval : breakInterval);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-semibold text-lg">Pomodoro Timer</h2>
      <div className="mt-4">
        <div className="text-2xl">{formatTime(timeLeft)}</div>
        <button onClick={toggleTimer} className="bg-primary text-white rounded p-2 mt-2">
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="bg-red-500 text-white rounded p-2 mt-2 ml-2">Reset</button>
      </div>
      <div className="mt-4">
        <label>Work Duration (minutes): </label>
        <input
          type="number"
          value={workInterval / 60}
          onChange={(e) => setWorkInterval(e.target.value * 60)}
          className="border rounded p-2"
        />
      </div>
      <div className="mt-2">
        <label>Break Duration (minutes): </label>
        <input
          type="number"
          value={breakInterval / 60}
          onChange={(e) => setBreakInterval(e.target.value * 60)}
          className="border rounded p-2"
        />
      </div>
      <div className="mt-4">
        <p>Completed Cycles: {cyclesCompleted}</p>
      </div>
    </div>
  );
};

export default PomodoroTimer;

