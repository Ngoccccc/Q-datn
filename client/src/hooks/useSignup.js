import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    username,
    email,
    password,
    confirmPassword,
    avatar,
  }) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/signup",
        {
          username,
          email,
          password,
          confirmPassword,
          avatar,
        },
        config
      );
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;