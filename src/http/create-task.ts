import type { CreateTaskForm } from "@/schemas/create-task-form";

export const createTask = async ({ title }: CreateTaskForm) => {
	const response = await fetch("/api/tasks", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title,
		}),
	});

	return response;
};
