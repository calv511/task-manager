import { createContext, useContext } from "react";
import type { Task, NewTask } from "../types/task";

export interface TaskContextType {
    tasks: Task[];
    addTask: (taskData: NewTask) => void;
    updateTask: (id: number, updates: Partial<Task>) => void;
    deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (context == undefined) {
        throw new Error("useTasks must be used within a TaskProvider");
    }

    return context;
}