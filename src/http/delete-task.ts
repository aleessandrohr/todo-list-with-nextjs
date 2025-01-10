interface DeleteTask {
	id: string;
}

export const deleteTask = async ({ id }: DeleteTask) => {
	const response = await fetch("/api/tasks", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id,
		}),
	});

	return response;
};
