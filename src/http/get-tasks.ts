import { ITask } from "@/app/tasks/components/Task";

type Tasks = Array<ITask>;

export const getTasks = async (): Promise<Tasks> => {
	const response = await fetch("/api/tasks");
	const data = await response.json();

	return data;
};
