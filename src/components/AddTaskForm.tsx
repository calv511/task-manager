import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function AddTaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");

    const { addTask } = useTasks();

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        addTask({ title, description, priority });
        setTitle("");
        setDescription("");
        setPriority("Medium");
    }

    return (
        <form onSubmit={handleSumbit} className="add-task-form">
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
}

export default AddTaskForm;