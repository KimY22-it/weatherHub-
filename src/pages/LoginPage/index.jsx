import Header from '@/components/Header'
import Content from '@/pages/LoginPage/Content'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Sử dụng Header nhưng ẩn nút Đăng xuất */}
      <Header showLogout={false} />
      {/* Nội dung đăng nhập */}
      <Content />
    </div>
  );
};

export default LoginPage