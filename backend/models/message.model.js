import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		type:{
			type: Number,
			required: true
		},
		conversation_id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "Conversation",
			required: true
		},
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		message: {
			type: String,
			required: true,
		},
		// createdAt, updatedAt
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
