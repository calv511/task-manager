import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { TaskPriority, TaskStatus } from "../types/task";

function Dashboard() {
    const { tasks, deleteTask, updateTask, setTaskStatus } = useTasks();
    const [filter, setFilter] = useState("All");
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPriority, setEditPriority] = useState<TaskPriority>("Medium");
    const [editStatus, setEditStatus] = useState<TaskStatus>("To Do");
    const filteredTasks = tasks.filter(
        task => filter === "All" || task.status === filter
    );

    const filterOptions = ["All", "To Do", "In Progress", "Completed"];

    const priorityClasses: Record<string, string> = {
        Low: "bg-success-subtle text-success-emphasis",
        Medium: "bg-warning-subtle text-warning-emphasis",
        High: "bg-danger-subtle text-danger-emphasis",
    };

    const startEditingTask = (taskId: number) => {
        const taskToEdit = tasks.find(task => task.id === taskId);

        if (!taskToEdit) {
            return;
        }

        setEditingTaskId(taskToEdit.id);
        setEditTitle(taskToEdit.title);
        setEditDescription(taskToEdit.description || "");
        setEditPriority(taskToEdit.priority);
        setEditStatus(taskToEdit.status);
    };

    const cancelEditingTask = () => {
        setEditingTaskId(null);
        setEditTitle("");
        setEditDescription("");
        setEditPriority("Medium");
        setEditStatus("To Do");
    };

    const saveTaskEdits = (taskId: number) => {
        updateTask(taskId, {
            title: editTitle.trim(),
            description: editDescription.trim(),
            priority: editPriority,
            status: editStatus,
        });
        cancelEditingTask();
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
                                            {editingTaskId === task.id ? (
                                                <div className="d-grid gap-3">
                                                    <div>
                                                        <label className="form-label" htmlFor={`edit-title-${task.id}`}>Title</label>
                                                        <input
                                                            id={`edit-title-${task.id}`}
                                                            className="form-control"
                                                            value={editTitle}
                                                            onChange={(e) => setEditTitle(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="form-label" htmlFor={`edit-description-${task.id}`}>Description</label>
                                                        <textarea
                                                            id={`edit-description-${task.id}`}
                                                            className="form-control"
                                                            rows={3}
                                                            value={editDescription}
                                                            onChange={(e) => setEditDescription(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="form-label" htmlFor={`edit-priority-${task.id}`}>Priority</label>
                                                        <select
                                                            id={`edit-priority-${task.id}`}
                                                            className="form-select"
                                                            value={editPriority}
                                                            onChange={(e) => setEditPriority(e.target.value as TaskPriority)}
                                                        >
                                                            <option value="Low">Low</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="High">High</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="form-label" htmlFor={`edit-status-${task.id}`}>Status</label>
                                                        <select
                                                            id={`edit-status-${task.id}`}
                                                            className="form-select"
                                                            value={editStatus}
                                                            onChange={(e) => setEditStatus(e.target.value as TaskStatus)}
                                                        >
                                                            <option value="To Do">To Do</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Completed">Completed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <h3 className="h5 fw-semibold mb-1">{task.title}</h3>
                                                    <p className="text-body-secondary mb-0">{task.description || "No description added."}</p>
                                                </>
                                            )}
                                        </div>
                                        <div className="d-flex flex-column gap-2 align-items-end">
                                            {editingTaskId === task.id ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-success"
                                                        onClick={() => saveTaskEdits(task.id)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={cancelEditingTask}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => startEditingTask(task.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <div className="btn-group btn-group-sm" role="group" aria-label="Task status controls">
                                                        <button
                                                            type="button"
                                                            className={`btn ${task.status === "To Do" ? "btn-dark" : "btn-outline-secondary"}`}
                                                            onClick={() => setTaskStatus(task.id, "To Do")}
                                                        >
                                                            To Do
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`btn ${task.status === "In Progress" ? "btn-dark" : "btn-outline-secondary"}`}
                                                            onClick={() => setTaskStatus(task.id, "In Progress")}
                                                        >
                                                            In Progress
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`btn ${task.status === "Completed" ? "btn-dark" : "btn-outline-secondary"}`}
                                                            onClick={() => setTaskStatus(task.id, "Completed")}
                                                        >
                                                            Completed
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => deleteTask(task.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
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