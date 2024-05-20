import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
	{
		// chỉ dùng cho nhóm
		conversation_name: {
			type: String,
			// required: true,
		},
		// nhom = 1, k phai nhom = 0
		is_group:{
			type:Boolean,
			required: true
		},
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
