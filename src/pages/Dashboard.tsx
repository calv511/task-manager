import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function Dashboard() {
    const { tasks, deleteTask} = useTasks();
    const [filter, setFilter] = useState("All");
    const filteredTasks = tasks.filter(
        task => filter === "All" || task.status === filter
    );

    const filterOptions = ["All", "To Do", "In Progress", "Completed"];

    const priorityClasses: Record<string, string> = {
        Low: "bg-success-subtle text-success-emphasis",
        Medium: "bg-warning-subtle text-warning-emphasis",
        High: "bg-danger-subtle text-danger-emphasis",
    };

    return (
        <section className="card border-0 shadow-sm h-100 task-board">
            <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center mb-4">
                    <div>
                        <p className="section-label mb-2">Dashboard</p>
                        <h2 className="h4 fw-semibold mb-1">Your tasks</h2>
                        <p className="text-body-secondary mb-0">Filter, review, and remove items as the list grows.</p>
                    </div>

                    <div className="btn-group flex-wrap task-filters" role="group" aria-label="Task filters">
                        {filterOptions.map((option) => (
                            <button
                                key={option}
                                type="button"
                                className={`btn ${filter === option ? "btn-dark" : "btn-outline-secondary"}`}
                                onClick={() => setFilter(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {tasks.length === 0 ? (
                    <div className="empty-state border rounded-4 p-4 text-center">
                        <h3 className="h5 fw-semibold mb-2">No tasks yet</h3>
                        <p className="text-body-secondary mb-0">Add your first task to start building the board.</p>
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <div className="empty-state border rounded-4 p-4 text-center">
                        <h3 className="h5 fw-semibold mb-2">No tasks match this filter</h3>
                        <p className="text-body-secondary mb-0">Try a different status or clear the filter to see everything.</p>
                    </div>
                ) : (
                    <div className="task-grid">
                        {filteredTasks.map(task => (
                            <article key={task.id} className="task-card card border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                                        <div>
                                            <h3 className="h5 fw-semibold mb-1">{task.title}</h3>
                                            <p className="text-body-secondary mb-0">{task.description || "No description added."}</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => deleteTask(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2">
                                        <span className={`badge rounded-pill ${priorityClasses[task.priority] || "bg-secondary-subtle text-secondary-emphasis"}`}>
                                            {task.priority}
                                        </span>
                                        <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">
                                            {task.status}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Dashboard;