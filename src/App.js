import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTasks";
import About from "./components/About";


// Helped a lot in fixing the routing issue in DOM
// https://github.com/ReactTraining/react-router/issues/5946


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Football Practice",
      day: "Feb 6th at 2:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Gaming Session",
      day: "Feb 15th at 2:30pm",
      reminder: true,
    },
  ]);

  // useEffect(() => {
  //   const getTasks = async () => {
  //     const tasksFromServer = await fetchTasks();
  //     setTasks(tasksFromServer);
  //   };
  //   getTasks();
  // }, []);

  // // Fetch data from JSON server
  // const fetchTasks = async () => {
  //   const res = await fetch("http://localhost:5000/tasks");

  //   const data = await res.json();

  //   return data;
  // };

  // // Fetch a task from JSON server
  // const fetchTask = async (id) => {
  //   const res = await fetch(`http://localhost:5000/tasks/${id}`);

  //   const data = await res.json();

  //   return data;
  // };

  // Delete a task
  const deleteTask = async (id) => {
    // await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: "DELETE",
    // });
    setTasks(tasks.filter((tasks) => tasks.id !== id));
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    // const taskToToggle = await fetchTask(id);
    // const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(updatedTask),
    // });

    // const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  // Add task
  const addTask = async (task) => {
    // const res = await fetch("http://localhost:5000/tasks", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(task),
    // });
    // const data = await res.json();

    // setTasks([...tasks, task]);

    const id = Math.floor(Math.random() * 1000) + 1;

    const newTask = { id, ...task };

    setTasks([...tasks, newTask]);
  };

  return (
    // https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1
    <Router basename={window.location.pathname}>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTasks onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No tasks to show."
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
