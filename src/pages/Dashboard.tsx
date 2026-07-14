import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function Dashboard() {
    const { tasks, deleteTask} = useTasks();
    const [filter, setFilter] = useState("All");
    const filteredTasks = tasks.filter(
        task => filter === "All" || task.status === filter
    );

    return (
        <div className="task-list">
            <div className="filter-buttons">
                <button onClick={() => setFilter("All")}>All</button>
                <button onClick={() => setFilter("To Do")}>To Do</button>
                <button onClick={() => setFilter("In Progress")}>In Progress</button>
                <button onClick={() => setFilter("Completed")}>Completed</button>
            </div>
            {tasks.length === 0 ? <p>No tasks found. Add one to get started</p> : 
                filteredTasks.map(task => (
                    <div key={task.id} className="task-card">
                        <h3>{task.title}</h3>
                        <p>Status: {task.status}</p>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Dashboard;