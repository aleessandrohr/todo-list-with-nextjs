import { ITask } from "@/app/tasks/components/Task";

export const updateTask = async ({ id, completed, title }: ITask) => {
	const response = await fetch("/api/tasks", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id,
			title,
			completed,
		}),
	});

	return response;
};
