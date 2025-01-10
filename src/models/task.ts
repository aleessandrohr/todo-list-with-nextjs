import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		completed: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

TaskSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

TaskSchema.set("toJSON", { virtuals: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
