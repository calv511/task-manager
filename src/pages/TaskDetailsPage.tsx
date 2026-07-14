import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import type { TaskPriority, TaskStatus } from "../types/task";

function TaskDetailsPage() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const { tasks, updateTask, setTaskStatus, deleteTask } = useTasks();
    const task = tasks.find((item) => item.id === Number(taskId));

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPriority, setEditPriority] = useState<TaskPriority>("Medium");
    const [editStatus, setEditStatus] = useState<TaskStatus>("To Do");

    useEffect(() => {
        if (!task) {
            return;
        }

        setEditTitle(task.title);
        setEditDescription(task.description || "");
        setEditPriority(task.priority);
        setEditStatus(task.status);
    }, [task]);

    if (!task) {
        return (
            <main className="home-shell">
                <div className="container py-4 py-md-5">
                    <section className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5 text-center">
                            <p className="section-label mb-2">Task not found</p>
                            <h1 className="h3 fw-semibold mb-3">This task no longer exists</h1>
                            <p className="text-body-secondary mb-4">Return to the dashboard to view your current tasks.</p>
                            <Link className="btn btn-primary" to="/">
                                Back to dashboard
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    const handleSave = () => {
        updateTask(task.id, {
            title: editTitle.trim(),
            description: editDescription.trim(),
            priority: editPriority,
            status: editStatus,
        });
        navigate("/");
    };

    return (
        <main className="home-shell">
            <div className="container py-4 py-md-5">
                <section className="card border-0 shadow-sm mb-4 task-details-hero">
                    <div className="card-body p-4 p-md-5">
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center mb-4">
                            <div>
                                <p className="section-label mb-2">Task details</p>
                                <h1 className="display-6 fw-semibold mb-2">{task.title}</h1>
                                <p className="lead text-body-secondary mb-0">
                                    Review the task, update its fields, or change its status from this dedicated page.
                                </p>
                            </div>

                            <Link className="btn btn-outline-secondary" to="/">
                                Back to dashboard
                            </Link>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-4">
                            <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">{task.status}</span>
                            <span className="badge rounded-pill bg-warning-subtle text-warning-emphasis">{task.priority}</span>
                        </div>

                        <div className="row g-4">
                            <div className="col-12 col-lg-5">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body p-4">
                                        <p className="section-label mb-2">Task summary</p>
                                        <dl className="row mb-0">
                                            <dt className="col-4 text-body-secondary">Title</dt>
                                            <dd className="col-8">{task.title}</dd>

                                            <dt className="col-4 text-body-secondary">Description</dt>
                                            <dd className="col-8">{task.description || "No description added."}</dd>

                                            <dt className="col-4 text-body-secondary">Priority</dt>
                                            <dd className="col-8">{task.priority}</dd>

                                            <dt className="col-4 text-body-secondary">Status</dt>
                                            <dd className="col-8">{task.status}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-7">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body p-4">
                                        <p className="section-label mb-2">Edit task</p>
                                        <div className="d-grid gap-3">
                                            <div>
                                                <label className="form-label" htmlFor="detail-title">Title</label>
                                                <input
                                                    id="detail-title"
                                                    className="form-control"
                                                    value={editTitle}
                                                    onChange={(event) => setEditTitle(event.target.value)}
                                                />
                                            </div>

                                            <div>
                                                <label className="form-label" htmlFor="detail-description">Description</label>
                                                <textarea
                                                    id="detail-description"
                                                    className="form-control"
                                                    rows={4}
                                                    value={editDescription}
                                                    onChange={(event) => setEditDescription(event.target.value)}
                                                />
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="detail-priority">Priority</label>
                                                    <select
                                                        id="detail-priority"
                                                        className="form-select"
                                                        value={editPriority}
                                                        onChange={(event) => setEditPriority(event.target.value as TaskPriority)}
                                                    >
                                                        <option value="Low">Low</option>
                                                        <option value="Medium">Medium</option>
                                                        <option value="High">High</option>
                                                    </select>
                                                </div>

                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="detail-status">Status</label>
                                                    <select
                                                        id="detail-status"
                                                        className="form-select"
                                                        value={editStatus}
                                                        onChange={(event) => setEditStatus(event.target.value as TaskStatus)}
                                                    >
                                                        <option value="To Do">To Do</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-wrap gap-2">
                                                <button type="button" className="btn btn-success" onClick={handleSave}>
                                                    Save changes
                                                </button>
                                                <button type="button" className="btn btn-outline-secondary" onClick={() => setTaskStatus(task.id, "To Do") }>
                                                    Mark To Do
                                                </button>
                                                <button type="button" className="btn btn-outline-secondary" onClick={() => setTaskStatus(task.id, "In Progress") }>
                                                    Mark In Progress
                                                </button>
                                                <button type="button" className="btn btn-outline-secondary" onClick={() => setTaskStatus(task.id, "Completed") }>
                                                    Mark Completed
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger ms-auto"
                                                    onClick={() => {
                                                        deleteTask(task.id);
                                                        navigate("/");
                                                    }}
                                                >
                                                    Delete task
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default TaskDetailsPage;