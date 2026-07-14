import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { TaskPriority } from "../types/task";
import { validateTaskForm, type TaskFormErrors } from "../utils/taskValidation";

function AddTaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<TaskPriority>("Medium");
    const [errors, setErrors] = useState<TaskFormErrors>({});
    const [submitError, setSubmitError] = useState("");

    const { addTask } = useTasks();

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        const nextErrors = validateTaskForm({ title, description, priority });

        setErrors(nextErrors);
        setSubmitError("");

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        try {
            addTask({ title: title.trim(), description: description.trim(), priority });
            setTitle("");
            setDescription("");
            setPriority("Medium");
            setErrors({});
        } catch {
            setSubmitError("Something went wrong while creating the task. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSumbit} className="card border-0 shadow-sm add-task-form h-100">
            <div className="card-body p-4">
                <div className="mb-3">
                    <p className="section-label mb-2">New Task</p>
                    <h2 className="h5 fw-semibold mb-1">Create a task</h2>
                    <p className="text-body-secondary mb-0">Keep the form focused so it is easy to extend later.</p>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="task-title">Title</label>
                    <input
                        id="task-title"
                        type="text"
                        className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (errors.title) {
                                setErrors((currentErrors) => ({ ...currentErrors, title: undefined }));
                            }
                        }}
                    />
                    {errors.title ? <div className="invalid-feedback d-block">{errors.title}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="task-description">Description</label>
                    <textarea
                        id="task-description"
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        rows={4}
                        placeholder="Add a short note about the work"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            if (errors.description) {
                                setErrors((currentErrors) => ({ ...currentErrors, description: undefined }));
                            }
                        }}
                    />
                    {errors.description ? <div className="invalid-feedback d-block">{errors.description}</div> : null}
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="task-priority">Priority</label>
                    <select
                        id="task-priority"
                        className={`form-select ${errors.priority ? "is-invalid" : ""}`}
                        value={priority}
                        onChange={(e) => {
                            setPriority(e.target.value as TaskPriority);
                            if (errors.priority) {
                                setErrors((currentErrors) => ({ ...currentErrors, priority: undefined }));
                            }
                        }}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    {errors.priority ? <div className="invalid-feedback d-block">{errors.priority}</div> : null}
                </div>

                {submitError ? <div className="alert alert-danger py-2">{submitError}</div> : null}

                <button type="submit" className="btn btn-primary w-100">
                    Add Task
                </button>
            </div>
        </form>
    );
}

export default AddTaskForm;