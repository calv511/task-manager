import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { TaskPriority } from "../types/task";

function AddTaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<TaskPriority>("Medium");

    const { addTask } = useTasks();

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        addTask({ title, description, priority });
        setTitle("");
        setDescription("");
        setPriority("Medium");
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
                        className="form-control"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="task-description">Description</label>
                    <textarea
                        id="task-description"
                        className="form-control"
                        rows={4}
                        placeholder="Add a short note about the work"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="task-priority">Priority</label>
                    <select
                        id="task-priority"
                        className="form-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Add Task
                </button>
            </div>
        </form>
    );
}

export default AddTaskForm;