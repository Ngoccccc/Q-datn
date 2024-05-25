import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { createNewSheet } from "../db/connectToGGSheet.js";
import Conversation from "../models/conversation.model.js";
import Participant from "../models/participant.model.js";


export const createGroup = async (req, res) => {
	try {
		const { title, members } = req.body;

		const newGroup = await Conversation.create({
			conversation_name: title,
			is_group: 1
		})

		const conversation_id = newGroup._id;

		members.forEach(async (member) => {
			const memberData = await User.findOne({ username: member })
			if (memberData) {
				await Participant.create({
					conversation_id,
					user_id: memberData._id
				});
			}

		});


	} catch (error) {
		console.log("Error in createGroup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

