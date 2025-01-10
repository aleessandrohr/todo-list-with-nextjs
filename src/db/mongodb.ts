import mongoose from "mongoose";

import { env } from "@/schemas/env";

let isConnected = false;

export async function connectToDatabase() {
	if (isConnected) return;

	try {
		const db = await mongoose.connect(env.MONGODB_URI);
		isConnected = db.connections[0].readyState === 1;
		console.log("Conectado ao MongoDB");
	} catch (error) {
		console.error("Erro ao conectar ao MongoDB", error);
	}
}
