import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

  const onDragEnd = (result) => {
    // Handle the drag end logic here
  };

  const addTaskToColumn = (column) => {
    const taskText = prompt("Enter task:");
    if (taskText) {
      setTasks({
        ...tasks,
        [column]: [...tasks[column], { id: Date.now(), text: taskText }]
      });
    }
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    const taskToMove = tasks[fromColumn].find(task => task.id === taskId);
    setTasks({
      ...tasks,
      [fromColumn]: tasks[fromColumn].filter(task => task.id !== taskId),
      [toColumn]: [...tasks[toColumn], taskToMove]
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="font-semibold text-xl mb-4">Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between mt-4">
          {['todo', 'inProgress', 'done'].map(column => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col w-1/3 p-2 border border-gray-300 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">{column.charAt(0).toUpperCase() + column.slice(1)}</h3>
                  <div className="border rounded p-2 h-64 overflow-y-auto">
                    {tasks[column].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex justify-between items-center p-2 border-b hover:bg-gray-100 transition">
                            <span>{task.text}</span>
                            <button onClick={() => moveTask(task.id, column, column === 'todo' ? 'inProgress' : 'done')} className="text-blue-500 hover:text-blue-700 transition">Move</button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  <button onClick={() => addTaskToColumn(column)} className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600 transition">Add Task</button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;