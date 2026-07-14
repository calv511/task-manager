import { useCallback, useEffect, useMemo, useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { TaskPriority, TaskStatus } from "../types/task";
import { validateTaskForm, type TaskFormErrors } from "../utils/taskValidation";

function Dashboard() {
    const { tasks, deleteTask, updateTask, setTaskStatus } = useTasks();
    const [filter, setFilter] = useState("All");
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPriority, setEditPriority] = useState<TaskPriority>("Medium");
    const [editStatus, setEditStatus] = useState<TaskStatus>("To Do");
    const [editErrors, setEditErrors] = useState<TaskFormErrors>({});
    const [editSubmitError, setEditSubmitError] = useState("");
    const [focusedTaskId, setFocusedTaskId] = useState<number | null>(null);
    const filteredTasks = tasks.filter(
        task => filter === "All" || task.status === filter
    );
    const focusedTask = useMemo(
        () => tasks.find((task) => task.id === focusedTaskId) ?? null,
        [tasks, focusedTaskId],
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
        setEditErrors({});
        setEditSubmitError("");
    };

    const cancelEditingTask = useCallback(() => {
        setEditingTaskId(null);
        setEditTitle("");
        setEditDescription("");
        setEditPriority("Medium");
        setEditStatus("To Do");
        setEditErrors({});
        setEditSubmitError("");
    }, []);

    const openTaskDetails = (taskId: number) => {
        setFocusedTaskId(taskId);
        cancelEditingTask();
    };

    const shouldIgnoreCardInteraction = (target: EventTarget | null) => {
        if (!(target instanceof Element)) {
            return false;
        }

        return Boolean(target.closest("button, a, input, select, textarea, label"));
    };

    const closeTaskDetails = useCallback(() => {
        setFocusedTaskId(null);
        cancelEditingTask();
    }, [cancelEditingTask]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeTaskDetails();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeTaskDetails]);

    const saveTaskEdits = (taskId: number) => {
        const nextErrors = validateTaskForm({
            title: editTitle,
            description: editDescription,
            priority: editPriority,
            status: editStatus,
        });

        setEditErrors(nextErrors);
        setEditSubmitError("");

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        try {
            updateTask(taskId, {
                title: editTitle.trim(),
                description: editDescription.trim(),
                priority: editPriority,
                status: editStatus,
            });
            cancelEditingTask();
        } catch {
            setEditSubmitError("Something went wrong while saving the task. Please try again.");
        }
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
                            <article
                                key={task.id}
                                className="task-card card border-0 shadow-sm"
                                role="button"
                                tabIndex={0}
                                onClick={(event) => {
                                    if (shouldIgnoreCardInteraction(event.target)) {
                                        return;
                                    }

                                    openTaskDetails(task.id);
                                }}
                                onKeyDown={(event) => {
                                    if (shouldIgnoreCardInteraction(event.target)) {
                                        return;
                                    }

                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        openTaskDetails(task.id);
                                    }
                                }}
                            >
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                                        <div>
                                            {editingTaskId === task.id ? (
                                                <div className="d-grid gap-3">
                                                    <div>
                                                        <label className="form-label" htmlFor={`edit-title-${task.id}`}>Title</label>
                                                        <input
                                                            id={`edit-title-${task.id}`}
                                                                className={`form-control ${editErrors.title ? "is-invalid" : ""}`}
                                                            value={editTitle}
                                                                onChange={(e) => {
                                                                    setEditTitle(e.target.value);
                                                                    if (editErrors.title) {
                                                                        setEditErrors((currentErrors) => ({ ...currentErrors, title: undefined }));
                                                                    }
                                                                }}
                                                        />
                                                            {editErrors.title ? <div className="invalid-feedback d-block">{editErrors.title}</div> : null}
                                                    </div>
                                                    <div>
                                                        <label className="form-label" htmlFor={`edit-description-${task.id}`}>Description</label>
                                                        <textarea
                                                            id={`edit-description-${task.id}`}
                                                                className={`form-control ${editErrors.description ? "is-invalid" : ""}`}
                                                            rows={3}
                                                            value={editDescription}
                                                                onChange={(e) => {
                                                                    setEditDescription(e.target.value);
                                                                    if (editErrors.description) {
                                                                        setEditErrors((currentErrors) => ({ ...currentErrors, description: undefined }));
                                                                    }
                                                                }}
                                                        />
                                                            {editErrors.description ? <div className="invalid-feedback d-block">{editErrors.description}</div> : null}
                                                    </div>
                                                    <div>
                                                        <label className="form-label" htmlFor={`edit-priority-${task.id}`}>Priority</label>
                                                        <select
                                                            id={`edit-priority-${task.id}`}
                                                                className={`form-select ${editErrors.priority ? "is-invalid" : ""}`}
                                                            value={editPriority}
                                                                onChange={(e) => {
                                                                    setEditPriority(e.target.value as TaskPriority);
                                                                    if (editErrors.priority) {
                                                                        setEditErrors((currentErrors) => ({ ...currentErrors, priority: undefined }));
                                                                    }
                                                                }}
                                                        >
                                                            <option value="Low">Low</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="High">High</option>
                                                        </select>
                                                            {editErrors.priority ? <div className="invalid-feedback d-block">{editErrors.priority}</div> : null}
                                                    </div>
                                                    <div>
                                                        <label className="form-label" htmlFor={`edit-status-${task.id}`}>Status</label>
                                                        <select
                                                            id={`edit-status-${task.id}`}
                                                                className={`form-select ${editErrors.status ? "is-invalid" : ""}`}
                                                            value={editStatus}
                                                                onChange={(e) => {
                                                                    setEditStatus(e.target.value as TaskStatus);
                                                                    if (editErrors.status) {
                                                                        setEditErrors((currentErrors) => ({ ...currentErrors, status: undefined }));
                                                                    }
                                                                }}
                                                        >
                                                            <option value="To Do">To Do</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Completed">Completed</option>
                                                        </select>
                                                            {editErrors.status ? <div className="invalid-feedback d-block">{editErrors.status}</div> : null}
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

            {focusedTask ? (
                <div className="task-modal-backdrop" role="presentation" onClick={closeTaskDetails}>
                    <div
                        className="task-modal card border-0 shadow-lg"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`task-modal-title-${focusedTask.id}`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="card-body p-4 p-md-5">
                            <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                                <div>
                                    <p className="section-label mb-2">Task details</p>
                                    <h3 className="h3 fw-semibold mb-2" id={`task-modal-title-${focusedTask.id}`}>{focusedTask.title}</h3>
                                    <p className="text-body-secondary mb-0">Click outside the panel, press Escape, or use the X button to close.</p>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close task details"
                                    onClick={closeTaskDetails}
                                />
                            </div>

                            {editingTaskId === focusedTask.id ? (
                                <div className="d-grid gap-3">
                                    <div>
                                        <label className="form-label" htmlFor={`modal-title-${focusedTask.id}`}>Title</label>
                                        <input
                                            id={`modal-title-${focusedTask.id}`}
                                            className={`form-control ${editErrors.title ? "is-invalid" : ""}`}
                                            value={editTitle}
                                            onChange={(e) => {
                                                setEditTitle(e.target.value);
                                                if (editErrors.title) {
                                                    setEditErrors((currentErrors) => ({ ...currentErrors, title: undefined }));
                                                }
                                            }}
                                        />
                                        {editErrors.title ? <div className="invalid-feedback d-block">{editErrors.title}</div> : null}
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor={`modal-description-${focusedTask.id}`}>Description</label>
                                        <textarea
                                            id={`modal-description-${focusedTask.id}`}
                                            className={`form-control ${editErrors.description ? "is-invalid" : ""}`}
                                            rows={4}
                                            value={editDescription}
                                            onChange={(e) => {
                                                setEditDescription(e.target.value);
                                                if (editErrors.description) {
                                                    setEditErrors((currentErrors) => ({ ...currentErrors, description: undefined }));
                                                }
                                            }}
                                        />
                                        {editErrors.description ? <div className="invalid-feedback d-block">{editErrors.description}</div> : null}
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-12 col-md-6">
                                            <label className="form-label" htmlFor={`modal-priority-${focusedTask.id}`}>Priority</label>
                                            <select
                                                id={`modal-priority-${focusedTask.id}`}
                                                className={`form-select ${editErrors.priority ? "is-invalid" : ""}`}
                                                value={editPriority}
                                                onChange={(e) => {
                                                    setEditPriority(e.target.value as TaskPriority);
                                                    if (editErrors.priority) {
                                                        setEditErrors((currentErrors) => ({ ...currentErrors, priority: undefined }));
                                                    }
                                                }}
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                            {editErrors.priority ? <div className="invalid-feedback d-block">{editErrors.priority}</div> : null}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label" htmlFor={`modal-status-${focusedTask.id}`}>Status</label>
                                            <select
                                                id={`modal-status-${focusedTask.id}`}
                                                className={`form-select ${editErrors.status ? "is-invalid" : ""}`}
                                                value={editStatus}
                                                onChange={(e) => {
                                                    setEditStatus(e.target.value as TaskStatus);
                                                    if (editErrors.status) {
                                                        setEditErrors((currentErrors) => ({ ...currentErrors, status: undefined }));
                                                    }
                                                }}
                                            >
                                                <option value="To Do">To Do</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                            {editErrors.status ? <div className="invalid-feedback d-block">{editErrors.status}</div> : null}
                                        </div>
                                    </div>
                                    {editSubmitError ? <div className="alert alert-danger py-2">{editSubmitError}</div> : null}
                                    <div className="d-flex flex-wrap gap-2 justify-content-between">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => saveTaskEdits(focusedTask.id)}
                                        >
                                            Save changes
                                        </button>
                                        <div className="d-flex flex-wrap gap-2">
                                            <button type="button" className="btn btn-outline-secondary" onClick={cancelEditingTask}>
                                                Cancel edit
                                            </button>
                                            <button type="button" className="btn btn-outline-danger" onClick={() => {
                                                deleteTask(focusedTask.id);
                                                closeTaskDetails();
                                            }}>
                                                Delete task
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="d-flex flex-wrap gap-2 mb-4">
                                        <span className={`badge rounded-pill ${priorityClasses[focusedTask.priority] || "bg-secondary-subtle text-secondary-emphasis"}`}>
                                            {focusedTask.priority}
                                        </span>
                                        <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis">
                                            {focusedTask.status}
                                        </span>
                                    </div>

                                    <div className="card border-0 bg-body-tertiary mb-4">
                                        <div className="card-body p-4">
                                            <p className="section-label mb-2">Description</p>
                                            <p className="mb-0 text-body-secondary">
                                                {focusedTask.description || "No description added."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2">
                                        <button type="button" className="btn btn-primary" onClick={() => startEditingTask(focusedTask.id)}>
                                            Edit task
                                        </button>
                                        <div className="btn-group" role="group" aria-label="Quick status changes">
                                            <button type="button" className="btn btn-outline-secondary" onClick={() => setTaskStatus(focusedTask.id, "To Do") }>
                                                To Do
                                            </button>
                                            <button type="button" className="btn btn-outline-secondary" onClick={() => setTaskStatus(focusedTask.id, "In Progress") }>
                                                In Progress
                                            </button>
                                            <button type="button" className="btn btn-outline-secondary" onClick={() => setTaskStatus(focusedTask.id, "Completed") }>
                                                Completed
                                            </button>
                                        </div>
                                        <button type="button" className="btn btn-outline-danger ms-auto" onClick={() => {
                                            deleteTask(focusedTask.id);
                                            closeTaskDetails();
                                        }}>
                                            Delete task
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    )
}

export default Dashboard;