import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
	{
		// chỉ dùng cho nhóm
		conversation_id: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation"
			// required: true,
		},
		// nhom = 1, k phai nhom = 0
		user_id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "User",
			// required: true
		},
		
	},
	{ timestamps: true }
);

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
