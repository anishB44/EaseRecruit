import React from 'react';
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TodoWidget from "./components/TodoWidget";
import KanbanBoard from "./components/KanbanBoard";
import CalendarWidget from "./components/CalendarWidget";
import NotesWidget from "./components/NotesWidget";
import PomodoroTimer from "./components/PomodoroTimer";

const MyList = () => {
  return (
    <div>
      <DashboardHeader title="My List" subtitle="Manage your tasks and schedule." />
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-4">
          <TodoWidget />
          <NotesWidget />
        </div>
        <div className="col-span-8">
          <KanbanBoard />
          <CalendarWidget />
          <PomodoroTimer />
        </div>
      </div>
    </div>
  );
};

export default MyList;
