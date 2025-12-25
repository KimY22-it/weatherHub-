import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import authService from "@/apis/services/authService";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => { }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.login({
        username,
        password,
        accessChannel: "WEB",
      });

      const { accessToken, refreshToken } = response.data;

      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Đăng nhập thất bại");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
  };
};
