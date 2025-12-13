import React from "react";
import { useLogin } from "./LoginController";
import { Rainbow, Sun } from "lucide-react";

const ContentLogin = () => {
  const { username, setUsername, password, setPassword, handleLogin } =
    useLogin();

  return (
    <div className="flex-grow flex items-center justify-center bg-[#E6E9EE]">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-xl shadow-xl">
        {/* Cập nhật container của tiêu đề để căn giữa và thêm padding */}
        <div className="text-center pt-[30px] mb-[30px]">
          {/* Cập nhật các lớp CSS cho h1 */}
          <Sun />
          <h1 className="text-4xl font-extrabold text-[#035e9b] pb-[10px] mb-2.5">
            Welcome WeatherHub!
          </h1>
          {/* Cập nhật các lớp CSS cho thẻ p */}
          <p className="text-[20px] text-[#035e9b] leading-[1.4]">
            Connect your mini weather station and stay updated with real-time
            local forecasts. <Rainbow className="inline-block" />
          </p>
        </div>
        <form
          className="space-y-6 flex justify-center flex-col"
          onSubmit={handleLogin}
        >
          <div className="space-y-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3  font-bold rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3  font-bold rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-auto mx-auto py-3 px-4 bg-[#4ea9dd] hover:bg-[#3d7190]  text-white font-bold rounded-2xl transition-colors btn login-btn"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContentLogin;
