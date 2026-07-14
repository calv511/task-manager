export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "To Do" | "In Progress" | "Completed";

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
}

export type NewTask = Omit<Task, 'id' | 'status'>;