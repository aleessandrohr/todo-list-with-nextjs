import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteTask } from "@/http/delete-task";
import { updateTask } from "@/http/update-task";
import { TaskForm, taskFormSchema } from "@/schemas/task-form";

export interface ITask {
	id: string;
	title: string;
	completed: boolean;
}

interface Props {
	task: ITask;
}

export const Task = ({ task }: Props) => {
	const queryClient = useQueryClient();

	const form = useForm<TaskForm>({
		defaultValues: {
			title: task.title,
			completed: task.completed,
			id: task.id,
		},
		resolver: zodResolver(taskFormSchema),
	});

	const {
		handleSubmit,
		register,
		control,
		formState: { isValid },
	} = form;

	const onSubmit = async (data: TaskForm) => {
		console.log(data);

		const response = await updateTask({
			id: data.id,
			title: data.title,
			completed: data.completed,
		});

		if (!response.ok) {
			throw new Error("task not updated");
		}

		queryClient.invalidateQueries({
			queryKey: ["tasks"],
		});
	};

	const handleDeleteTask = async () => {
		const response = await deleteTask({
			id: task.id,
		});

		if (!response.ok) {
			throw new Error("task not deleted");
		}

		queryClient.invalidateQueries({
			queryKey: ["tasks"],
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex w-full items-center space-x-2">
					<FormField
						control={control}
						name="completed"
						render={({ field }) => (
							<FormItem className="w-full space-x-2">
								<FormControl>
									<Checkbox
										type="submit"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<label
									htmlFor={task.id}
									className="w-full text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									{task.title}
								</label>
							</FormItem>
						)}
					/>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Editar</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<form>
								<DialogHeader>
									<DialogTitle>Editar tarefa</DialogTitle>
									<DialogDescription>Edite a sua tarefa.</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Tarefa
										</Label>
										<Input {...register("title")} className="col-span-3" />
									</div>
								</div>
								<DialogFooter>
									<Button type="submit">Save changes</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger asChild>
							<Button>Remover</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Remover tarefa</DialogTitle>
								<DialogDescription>Remova a sua tarefa.</DialogDescription>
							</DialogHeader>
							<DialogFooter className="w-full">
								<Button
									type="button"
									disabled={!isValid}
									variant="destructive"
									onClick={handleDeleteTask}
									className="w-full"
								>
									Remover
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</form>
		</Form>
	);
};
