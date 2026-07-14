import type { TaskPriority, TaskStatus } from "../types/task";

export type TaskFormErrors = Partial<{
    title: string;
    description: string;
    priority: string;
    status: string;
    submit: string;
}>;

const validPriorities: TaskPriority[] = ["Low", "Medium", "High"];
const validStatuses: TaskStatus[] = ["To Do", "In Progress", "Completed"];

export type TaskFormValues = {
    title: string;
    description: string;
    priority: string;
    status?: string;
};

export const validateTaskForm = (values: TaskFormValues): TaskFormErrors => {
    const errors: TaskFormErrors = {};
    const title = values.title.trim();
    const description = values.description.trim();

    if (!title) {
        errors.title = "Title is required.";
    } else if (title.length < 3) {
        errors.title = "Title must be at least 3 characters.";
    } else if (title.length > 80) {
        errors.title = "Title must be 80 characters or fewer.";
    }

    if (description.length > 280) {
        errors.description = "Description must be 280 characters or fewer.";
    }

    if (!validPriorities.includes(values.priority as TaskPriority)) {
        errors.priority = "Choose a valid priority.";
    }

    if (values.status !== undefined && !validStatuses.includes(values.status as TaskStatus)) {
        errors.status = "Choose a valid status.";
    }

    return errors;
};
