import z from "zod";

const envSchema = z.object({
	MONGODB_USERNAME: z.string(),
	MONGODB_PASSWORD: z.string(),
	MONGODB_URI: z.string().url(),
});

export const env = envSchema.parse(process.env);
