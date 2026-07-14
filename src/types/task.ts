export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: "To Do" | "In Progress" | "Completed";
    priority: TaskPriority;
}

export type NewTask = Omit<Task, 'id' | 'status'>;