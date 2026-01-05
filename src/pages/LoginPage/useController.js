import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import authService from "@/apis/services/authService";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  useEffect(() => { }, []);

  // Validate username
  const validateUsername = (value) => {
    if (!value || value.trim() === "") {
      return "Tên đăng nhập không được để trống";
    }
    if (value.length < 3) {
      return "Tên đăng nhập phải có ít nhất 3 ký tự";
    }
    if (value.length > 50) {
      return "Tên đăng nhập không được vượt quá 50 ký tự";
    }
    // Chỉ cho phép chữ cái, số, dấu gạch dưới và dấu chấm
    if (!/^[a-zA-Z0-9_.]+$/.test(value)) {
      return "Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới và dấu chấm";
    }
    return "";
  };

  // Validate password
  const validatePassword = (value) => {
    if (!value || value.trim() === "") {
      return "Mật khẩu không được để trống";
    }
    if (value.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (value.length > 100) {
      return "Mật khẩu không được vượt quá 100 ký tự";
    }
    return "";
  };

  // Validate toàn bộ form
  const validateForm = () => {
    const newErrors = {};
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError) newErrors.username = usernameError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle username change
  const handleUsernameChange = (value) => {
    setUsername(value);
    if (touched.username) {
      const error = validateUsername(value);
      setErrors(prev => ({ ...prev, username: error }));
    }
  };

  // Handle password change
  const handlePasswordChange = (value) => {
    setPassword(value);
    if (touched.password) {
      const error = validatePassword(value);
      setErrors(prev => ({ ...prev, password: error }));
    }
  };

  // Handle blur event
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    if (field === "username") {
      const error = validateUsername(username);
      setErrors(prev => ({ ...prev, username: error }));
    } else if (field === "password") {
      const error = validatePassword(password);
      setErrors(prev => ({ ...prev, password: error }));
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Đánh dấu tất cả các trường đã được touch
    setTouched({ username: true, password: true });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({
        username: username.trim(),
        password,
        accessChannel: "WEB",
      });

      const { accessToken, refreshToken } = response.data;

      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);

      // Xử lý lỗi chi tiết hơn
      let errorMessage = "Đăng nhập thất bại. Vui lòng thử lại.";

      if (error.response) {
        // Lỗi từ server
        if (error.response.status === 401) {
          errorMessage = "Tên đăng nhập hoặc mật khẩu không chính xác";
        } else if (error.response.status === 403) {
          errorMessage = "Tài khoản của bạn đã bị khóa";
        } else if (error.response.status >= 500) {
          errorMessage = "Lỗi máy chủ. Vui lòng thử lại sau";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // Không nhận được phản hồi từ server
        errorMessage = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng";
      }

      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername: handleUsernameChange,
    password,
    setPassword: handlePasswordChange,
    handleLogin,
    handleBlur,
    errors,
    isLoading,
    isFormValid: Object.keys(errors).length === 0 && username && password,
  };
};
