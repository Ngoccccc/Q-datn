import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

// export const getUsersForSidebar = async (req, res) => {
// 	if (req.query.search) {
// 		const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
// 		res.send(users);
// 	}
// 	else {
// 		try {
// 			const loggedInUserId = req.user._id;

// 			const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

// 			res.status(200).json(filteredUsers);
// 		} catch (error) {
// 			console.error("Error in getUsersForSidebar: ", error.message);
// 			res.status(500).json({ error: "Internal server error" });
// 		}

// 	}

// };

export const getUsersForSidebar = asyncHandler(async (req, res) => {
	const keyword = req.query.search
		? {
			$or: [
				{ name: { $regex: req.query.search, $options: "i" } },
				{ email: { $regex: req.query.search, $options: "i" } },
			],
		}
		: {};

	const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
	res.send(users);
});
