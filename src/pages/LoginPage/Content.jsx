import React from "react";
import { useLogin } from "./useController";
import { Rainbow, Sun, Loader2 } from "lucide-react";

const Content = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    handleBlur,
    errors,
    isLoading,
    isFormValid
  } = useLogin();

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

        {/* Hiển thị lỗi chung */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <p className="text-sm font-medium">{errors.general}</p>
          </div>
        )}

        <form
          className="space-y-6 flex justify-center flex-col"
          onSubmit={handleLogin}
        >
          <div className="space-y-4">
            {/* Username field */}
            <div>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => handleBlur("username")}
                disabled={isLoading}
                className={`w-full px-4 py-3 font-bold rounded-2xl border ${errors.username
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 ml-2">{errors.username}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                disabled={isLoading}
                className={`w-full px-4 py-3 font-bold rounded-2xl border ${errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 ml-2">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !username || !password}
            className="w-auto mx-auto py-3 px-6 bg-[#4ea9dd] hover:bg-[#3d7190] text-white font-bold rounded-2xl transition-colors btn login-btn disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Content;
