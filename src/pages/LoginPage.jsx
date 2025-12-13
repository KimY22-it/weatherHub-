import Header from '@/components/Header'
import ContentLogin from '@/components/LoginPage/LoginContent'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Sử dụng Header nhưng ẩn nút Đăng xuất */}
      <Header showLogout={false} />
      {/* Nội dung đăng nhập */}
      <ContentLogin />
    </div>
  );
};

export default LoginPage