import { createContext, useContext, useState } from "react";
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

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // ... CRUD functions (addTask, updateTask, deleteTask)

    const addTask = (formValues: NewTask) => {
        const newTask: Task = {
            ...formValues,
            id: Date.now(),
            status: "To Do",
        }
        setTasks(prevTasks => [...prevTasks, newTask]);
     }

        const updateTask = (id: number, updates: Partial<Task>) => {
            setTasks(prevTasks => 
                prevTasks.map(task =>
                    task.id === id ? { ...task, ...updates } : task
                )
            );
        };
        
   

    const deleteTask = (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}