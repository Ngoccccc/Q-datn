import { useState } from "react";
import {toast} from "react-toastify";
import { useAuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (email, password) => {
		console.log(email, password);
		setLoading(true);
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data } = await axios.post("/api/auth/login", { email, password }, config);
			console.log(data);
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
			navigate("/");
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

