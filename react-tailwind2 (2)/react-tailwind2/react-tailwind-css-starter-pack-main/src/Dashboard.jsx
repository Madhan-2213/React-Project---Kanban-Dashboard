import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaEdit, FaTrash, FaPlus, FaThumbtack, FaCheckCircle } from "react-icons/fa";

const Dashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userEmail = storedUser?.email;

  const [tasks, setTasks] = useState({
    new: [],
    inProgress: [],
    review: [],
    completed: [],
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dateTime: "",
    file: null,
    fileName: "",
    pinned: false,
  priority: "low",
    userEmail,
  });

  const [selectedColumn, setSelectedColumn] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [highlightTaskId, setHighlightTaskId] = useState(null);
  const taskRefs = useRef({});

  const fetchTasks = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const currentUserEmail = storedUser?.email;

    if (!currentUserEmail) return;

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {
      new: [],
      inProgress: [],
      review: [],
      completed: [],
    };

    setTasks({
      new: savedTasks.new.filter((task) => task.userEmail === currentUserEmail),
      inProgress: savedTasks.inProgress.filter(
        (task) => task.userEmail === currentUserEmail
      ),
      review: savedTasks.review.filter(
        (task) => task.userEmail === currentUserEmail
      ),
      completed: savedTasks.completed.filter(
        (task) => task.userEmail === currentUserEmail
      ),
    });
  };

  useEffect(() => {
    fetchTasks();

    // Listen for login changes
    const handleStorageChange = () => {
      fetchTasks();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle search query from Navbar
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = (params.get('search') || '').trim().toLowerCase();
    if (!search) return;

    // Find first matching task by title, description or fileName
    const all = [
      ...tasks.new.map(t => ({ ...t, column: 'new' })),
      ...tasks.inProgress.map(t => ({ ...t, column: 'inProgress' })),
      ...tasks.review.map(t => ({ ...t, column: 'review' })),
      ...tasks.completed.map(t => ({ ...t, column: 'completed' })),
    ];
    const found = all.find(t =>
      t.title?.toLowerCase().includes(search) ||
      t.description?.toLowerCase().includes(search) ||
      t.fileName?.toLowerCase().includes(search)
    );
    if (found) {
      setHighlightTaskId(found.id);
      // Wait a tick to ensure refs are set
      setTimeout(() => {
        const el = taskRefs.current[found.id];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
      // Clear highlight after 2.5s
      setTimeout(() => setHighlightTaskId(null), 2500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, tasks]);

  const saveTasks = (updatedTasks) => {
    if (!userEmail) return;
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};

    // Merge user tasks with existing tasks from other users
    const updatedAllTasks = {
      ...allTasks,
      new: [
        ...(allTasks.new?.filter((task) => task.userEmail !== userEmail) || []),
        ...updatedTasks.new,
      ],
      inProgress: [
        ...(allTasks.inProgress?.filter((task) => task.userEmail !== userEmail) || []),
        ...updatedTasks.inProgress,
      ],
      review: [
        ...(allTasks.review?.filter((task) => task.userEmail !== userEmail) || []),
        ...updatedTasks.review,
      ],
      completed: [
        ...(allTasks.completed?.filter((task) => task.userEmail !== userEmail) || []),
        ...updatedTasks.completed,
      ],
    };

    localStorage.setItem("tasks", JSON.stringify(updatedAllTasks));
  };

  const handleSaveTask = () => {
    if (!newTask.title.trim()) return;

    const updatedTasks = { ...tasks };

    if (editTask) {
      updatedTasks[editTask.column] = updatedTasks[editTask.column].map((task) =>
        task.id === editTask.id ? { ...newTask, id: editTask.id, userEmail } : task
      );
    } else {
      const newTaskWithId = {
        ...newTask,
        id: Date.now().toString(),
        userEmail,
      };
      updatedTasks[selectedColumn] = [
        newTaskWithId,
        ...updatedTasks[selectedColumn],
      ];
    }

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setShowModal(false);
    setEditTask(null);
    setNewTask({
      title: "",
      description: "",
      dateTime: "",
      file: null,
      fileName: "",
      pinned: false,
      priority: "low",
      userEmail,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTask({ ...newTask, file, fileName: file.name });
    }
  };

  const handleDeleteTask = (column, taskId) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column] = updatedTasks[column].filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handlePinTask = (column, taskId) => {
    const updatedTasks = { ...tasks };
    const taskIndex = updatedTasks[column].findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      const task = {
        ...updatedTasks[column][taskIndex],
        pinned: !updatedTasks[column][taskIndex].pinned,
      };
      updatedTasks[column].splice(taskIndex, 1);
      updatedTasks[column] = task.pinned
        ? [task, ...updatedTasks[column]]
        : [...updatedTasks[column], task];
    }

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleMarkCompleted = (column, taskId) => {
    if (column === "completed") return;
    const updatedTasks = { ...tasks };
    const idx = updatedTasks[column].findIndex((t) => t.id === taskId);
    if (idx === -1) return;
    const [task] = updatedTasks[column].splice(idx, 1);
    updatedTasks.completed = [{ ...task }, ...updatedTasks.completed];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const allowedMoves = {
      new: ["inProgress", "review", "completed"],
      inProgress: ["new", "review", "completed"],
      review: ["new", "inProgress", "completed"],
      completed: [],
    };

    if (!allowedMoves[sourceColumn]?.includes(destColumn)) return;

    const updatedTasks = { ...tasks };
    const [movedTask] = updatedTasks[sourceColumn].splice(source.index, 1);
    updatedTasks[destColumn].splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
  <div className="bg-gray-50 min-h-screen p-6">
  {/* Navbar is managed globally in App.js */}
            {/* Task Modal */}
            {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-3">{editTask ? "Edit Task" : "Add New Task"}</h2>
            <input type="text" placeholder="Task Title" className="border p-2 rounded w-full mb-2" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
            <textarea placeholder="Task Description" className="border p-2 rounded w-full mb-2" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
            <input type="datetime-local" className="border p-2 rounded w-full mb-2" value={newTask.dateTime} onChange={(e) => setNewTask({ ...newTask, dateTime: e.target.value })} />
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Priority</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`px-2 py-1 rounded text-sm border ${newTask.priority === 'low' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-white text-gray-700 border-gray-300'}`}
                  onClick={() => setNewTask({ ...newTask, priority: 'low' })}
                >
                  Low
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 rounded text-sm border ${newTask.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-white text-gray-700 border-gray-300'}`}
                  onClick={() => setNewTask({ ...newTask, priority: 'medium' })}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 rounded text-sm border ${newTask.priority === 'high' ? 'bg-red-100 text-red-800 border-red-300' : 'bg-white text-gray-700 border-gray-300'}`}
                  onClick={() => setNewTask({ ...newTask, priority: 'high' })}
                >
                  High
                </button>
              </div>
            </div>
            <input type="file" className="border p-2 rounded w-full mb-2" onChange={handleFileChange} />
            {newTask.fileName && <p className="text-sm text-blue-500">{newTask.fileName}</p>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleSaveTask} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editTask ? "Update" : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Drag and Drop Task Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(tasks).map(([column, columnTasks]) => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  className="bg-white rounded-lg shadow p-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="font-bold text-lg">{column.toUpperCase()}</h3>
                  {column !== "completed" && (
                    <FaPlus
                      className="cursor-pointer text-blue-500"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedColumn(column);
                      }}
                    />
                  )}
                  {columnTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          className={`p-3 rounded-lg mb-3 shadow-sm flex justify-between items-start ${highlightTaskId === task.id ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'bg-gray-200'}`}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={(el) => {
                            provided.innerRef(el);
                            if (el) taskRefs.current[task.id] = el;
                          }}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{task.title}</h4>
                              {task.priority && (
                                <span className={`text-xs px-2 py-0.5 rounded-full border
                                  ${task.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                                  ${task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                                  ${task.priority === 'low' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                                `}>
                                  {task.priority}
                                </span>
                              )}
                            </div>
                            <p>{task.description}</p>
                            {task.fileName && (
                              <p className="text-sm text-blue-500">{task.fileName}</p>
                            )}
                          </div>
                          <div className="flex flex-col space-y-2 ml-2">
                            {column !== "completed" ? (
                              <>
                                <FaCheckCircle title="Mark as completed" className="cursor-pointer text-blue-600" onClick={() => handleMarkCompleted(column, task.id)} />
                                <FaEdit className="cursor-pointer text-green-500" onClick={() => { setEditTask({ ...task, column }); setNewTask(task); setShowModal(true); }} />
                                <FaThumbtack className={`cursor-pointer ${task.pinned ? "text-yellow-500" : "text-gray-500"}`} onClick={() => handlePinTask(column, task.id)} />
                                <FaTrash className="cursor-pointer text-red-500" onClick={() => handleDeleteTask(column, task.id)} />
                              </>
                            ) : (
                              <>
                                <FaTrash title="Delete task" className="cursor-pointer text-red-500" onClick={() => handleDeleteTask(column, task.id)} />
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
