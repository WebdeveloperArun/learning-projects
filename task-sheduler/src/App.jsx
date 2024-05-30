import React, { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");
  // const [upcomingTasks, setUpcomingTasks] = useState([]);

  const createTask = () => {
    if (task.trim() === "" || deadline === "") {
      alert("Please enter a task and select a valid deadline.");
      return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    const data = {
      id: tasks.length + 1,
      task,
      priority,
      deadline,
      done: false,
    };
    setTasks([...tasks, data]);

    setTask("");
    setPriority("top");
    setDeadline("");
  };
  

  const markDone = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    setTasks(updatedTasks);

    const completedTask = tasks.find((t) => t.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };

  const upcomingTasks = tasks.filter((t) => !t.done); 
  console.log(upcomingTasks);

  return (
    <div className="App">
      <header className="bg-white text-green-500 text-center p-4 shadow-md">
        <h1 className="text-xl">Task Scheduler</h1>
      </header>
      <main className="max-w-2xl mx-auto my-5 p-5 bg-white shadow-md rounded-lg">
        <div className="task-form flex flex-wrap gap-2 mb-5">
          <input
            type="text"
            id="task"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-2 border border-gray-300 text-base flex-1 rounded-lg"
          />
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border border-gray-300 text-base flex-1 rounded-lg"
          >
            <option value="top">Top Priority</option>
            <option value="middle">Middle Priority</option>
            <option value="low">Less Priority</option>
          </select>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="p-2 border border-gray-300 text-base flex-1 rounded-lg"
          />
          <button
            id="add-task"
            onClick={createTask}
            className="p-2 bg-green-500 text-white border-none cursor-pointer rounded-lg"
          >
            Add Task
          </button>
        </div>
        <h2 className="heading text-lg pb-2">Upcoming Tasks</h2>
        <div className="task-list border border-gray-300 p-2">
          <table className="w-full mt-5 bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="bg-gray-200 text-black rounded-lg p-5">
                  Task Name
                </th>
                <th className="bg-gray-200 text-black rounded-lg p-5">
                  Priority
                </th>
                <th className="bg-gray-200 text-black rounded-lg p-5">
                  Deadline
                </th>
                <th className="bg-gray-200 text-black rounded-lg p-5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {upcomingTasks.map((t) => (
                <tr key={t.id}>
                  <td className=" border-b border-gray-300 p-5 pl-10">
                    {t.task}
                  </td>
                  <td className="border-b border-gray-300 p-5 pl-10">
                    {t.priority}
                  </td>
                  <td className="border-b border-gray-300 p-5 pl-10">
                    {t.deadline}
                  </td>
                  <td className="border-b border-gray-300 p-5 pl-10">
                    {!t.done && (
                      <button
                        className="mark-done p-2 ml-3 text-base flex-1 rounded-lg bg-red-600 text-white border-none cursor-pointer"
                        onClick={() => markDone(t.id)}
                      >
                        Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="completed-task-list mt-5">
          <h2 className="cheading text-gray-700 text-lg pb-2">
            Completed Tasks
          </h2>
          <table className="w-full mt-5 bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="bg-gray-200 text-black rounded-lg p-5">
                  Task Name
                </th>
                <th className="bg-gray-200 text-black rounded-lg p-5">
                  Priority
                </th>
                <th className="bg-gray-200 text-black rounded-lg p-5">
                  Deadline
                </th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((ct) => (
                <tr key={ct.id}>
                  <td className="border-b border-gray-300 p-5 pl-20">
                    {ct.task}
                  </td>
                  <td className="border-b border-gray-300 p-5 pl-20">
                    {ct.priority}
                  </td>
                  <td className="border-b border-gray-300 p-5 pl-20">
                    {ct.deadline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default App;
