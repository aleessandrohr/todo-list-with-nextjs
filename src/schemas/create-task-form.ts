import z from "zod";

export const createTaskFormSchema = z.object({
	title: z.string().min(1, "Informe a atividade que deseja realizar"),
});

export type CreateTaskForm = z.infer<typeof createTaskFormSchema>;
