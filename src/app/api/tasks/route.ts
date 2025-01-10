import { connectToDatabase } from "@/db/mongodb";
import Task from "@/models/task";

export async function POST(request: Request) {
	await connectToDatabase();

	const data = await request.json();

	const task = await Task.create(data);

	return new Response(JSON.stringify(task), { status: 201 });
}

export async function GET() {
	await connectToDatabase();

	const tasks = await Task.find();

	return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function PUT(request: Request) {
	await connectToDatabase();

	const data = await request.json();

	const task = await Task.findByIdAndUpdate(
		data.id,
		{ title: data.title, completed: data.completed },
		{ new: true },
	);

	return new Response(JSON.stringify(task), { status: 200 });
}

export async function DELETE(request: Request) {
	await connectToDatabase();

	const data = await request.json();

	await Task.findByIdAndDelete(data.id);

	return new Response(null, { status: 204 });
}
