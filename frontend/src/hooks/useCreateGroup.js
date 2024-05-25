import { useState } from "react";
import toast from "react-hot-toast";

export const useCreateGroup = () => {
	const [loading, setLoading] = useState(false);
	const createGroup = async ({title, members}) => {
		console.log("title")
		setLoading(true);
		try {
			const res = await fetch(`/api/group`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, members }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
            // toast.success("thanh cong")
		}
	};

	return { loading , createGroup};
};

