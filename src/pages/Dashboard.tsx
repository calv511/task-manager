import { useTasks } from "../context/TaskContext";

function Dashboard() {
    const { tasks, deleteTask} = useTasks();

    return (
        <div className="task-list">
            {tasks.length === 0 ? <p>No tasks found. Add one to get started</p> : 
                tasks.map(task => (
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