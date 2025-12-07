import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("loggedIn", "false");
  }, []);
  // Hàm này sẽ được gọi khi người dùng nhấp vào nút "Đăng nhập"
  const handleLogin = (event) => {
    // event.preventDefault() ngăn trình duyệt tải lại trang khi form được gửi
    event.preventDefault();

    // In thông tin ra console để kiểm tra
    console.log("Attempting to log in with:");
    console.log("Email:", email);
    console.log("Password:", password);

    // --- Logic xác thực người dùng sẽ ở đây ---
    // Ví dụ: gọi API để kiểm tra email và password

    // Sau khi đăng nhập thành công, chuyển hướng đến trang chủ
    alert("Đăng nhập thành công!"); // Thông báo tạm thời
    localStorage.setItem("loggedIn", "true"); // Lưu trạng thái đăng nhập
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Sử dụng Header nhưng ẩn nút Đăng xuất */}
      <Header showLogout={false} />

      <div className="flex-grow flex items-center justify-center bg-[#E6E9EE]">
        <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-xl shadow-xl">
          {/* Cập nhật container của tiêu đề để căn giữa và thêm padding */}
          <div className="text-center pt-[30px] mb-[30px]">
            {/* Cập nhật các lớp CSS cho h1 */}
            <h1 className="text-4xl font-extrabold text-[#035e9b] pb-[10px] mb-2.5">
              Welcome WeatherHub!
            </h1>
            {/* Cập nhật các lớp CSS cho thẻ p */}
            <p className="text-[20px] text-[#035e9b] leading-[1.4]">
              Connect your mini weather station and stay updated with real-time
              local forecasts.
            </p>
          </div>
          <form
            className="space-y-6 flex justify-center flex-col"
            onSubmit={handleLogin}
          >
            <div className="space-y-4">
              <input
                type="email"
                id="username"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3  font-bold rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                id="password"
                placeholder="Nhập password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3  font-bold rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-auto mx-auto py-3 px-4 bg-[#0A5E9B] hover:bg-[#033a5e]  text-white font-bold rounded-2xl transition-colors btn login-btn"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
