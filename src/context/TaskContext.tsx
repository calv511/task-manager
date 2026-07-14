/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useContext, useState } from "react";
import type { Task, NewTask, TaskStatus } from "../types/task";

const TASKS_STORAGE_KEY = "task-manager.tasks";

const loadTasksFromStorage = () => {
    if (typeof window === "undefined") {
        return [] as Task[];
    }

    try {
        const storedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) as Task[] : [];
    } catch {
        return [] as Task[];
    }
};

export interface TaskContextType {
    tasks: Task[];
    addTask: (taskData: NewTask) => void;
    updateTask: (id: number, updates: Partial<Task>) => void;
    setTaskStatus: (id: number, status: TaskStatus) => void;
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
    const [tasks, setTasks] = useState<Task[]>(loadTasksFromStorage);

    useEffect(() => {
        window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

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

    const setTaskStatus = (id: number, status: TaskStatus) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, status } : task
            )
        );
    }

    const deleteTask = (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, setTaskStatus, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}