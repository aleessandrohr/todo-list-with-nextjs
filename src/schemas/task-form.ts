import z from "zod";

export const taskFormSchema = z.object({
	title: z.string().min(1, "Informe a atividade que deseja realizar"),
	completed: z.boolean(),
	id: z.string(),
});

export type TaskForm = z.infer<typeof taskFormSchema>;
