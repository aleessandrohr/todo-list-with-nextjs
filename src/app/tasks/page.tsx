"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTask } from "@/http/create-task";
import { getTasks } from "@/http/get-tasks";
import {
	createTaskFormSchema,
	type CreateTaskForm,
} from "@/schemas/create-task-form";

import { Task } from "./components/Task";

const Page = () => {
	const queryClient = useQueryClient();

	const { data: tasks } = useQuery({
		queryKey: ["tasks"],
		queryFn: getTasks,
	});

	const {
		handleSubmit,
		register,
		reset,
		formState: { isValid },
	} = useForm<CreateTaskForm>({
		defaultValues: {
			title: "",
		},
		resolver: zodResolver(createTaskFormSchema),
	});

	const onSubmit = handleSubmit(async data => {
		if (!isValid) return;

		const response = await createTask({
			title: data.title,
		});

		if (!response.ok) {
			throw new Error("task not created");
		}

		queryClient.invalidateQueries({
			queryKey: ["tasks"],
		});

		reset();
	});

	return (
		<main className="flex flex-col items-center justify-center gap-6 p-6">
			<section className="flex w-full max-w-lg flex-col gap-4 p-4">
				<header className="text-center">
					<h1 className="text-xl">Crie sua Tarefa</h1>
				</header>
				<div>
					<form onSubmit={onSubmit}>
						<div className="flex w-full items-center space-x-2">
							<Input {...register("title")} placeholder="Digite a tarefa..." />
							<Button type="submit" disabled={!isValid}>
								Criar
							</Button>
						</div>
					</form>
				</div>
			</section>
			<section className="flex w-full max-w-lg flex-col gap-4 p-4">
				<header className="text-center">
					<h2 className="text-xl">Veja suas Tarefas</h2>
				</header>
				{tasks &&
					tasks.map(task => (
						<Fragment key={task.id}>
							<Task task={task} />
						</Fragment>
					))}
			</section>
		</main>
	);
};

export default Page;
