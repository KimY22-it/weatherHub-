import React from "react";
import { Link, useLocation } from "react-router-dom";

const Title = ({ text }) => {
  const location = useLocation();
  const pathname = location.pathname;
  if (pathname.startsWith(`/stationManager/detailStation`)) {
    return (
      <div className="mb-4 mt-2">
        <h1 className="text-2xl font-bold text-gray-800 pb-2 border-b flex items-center gap-2">
          <Link to="/stationManager" className="hover:underline">
            Quản lý hệ thống trạm
          </Link>
          <span className="text-gray-500">&gt;</span>
          <span>{text}</span>
        </h1>
      </div>
    );
  }
  if (pathname === `/stationManager/createStation`) {
    return (
      <div className="mb-4 mt-2">
        <h1 className="text-2xl font-bold text-gray-800 pb-2 border-b flex items-center gap-2">
          <Link to="/stationManager" className="hover:underline">
            Quản lý hệ thống trạm
          </Link>
          <span className="text-gray-500">&gt;</span>
          <span>{text}</span>
        </h1>
      </div>
    );
  }
  if (pathname.startsWith(`/userManager/detailUserPage`)) {
    return (
      <div className="mb-4 mt-2">
        <h1 className="text-2xl font-bold text-gray-800 pb-2 border-b flex items-center gap-2">
          <Link to="/userManager" className="hover:underline">
            Quản lý người dùng
          </Link>
          <span className="text-gray-500">&gt;</span>
          <span>{text}</span>
        </h1>
      </div>
    );
  }
  return (
    <div className="mb-4 mt-2">
      {/* Thêm khoảng cách dưới với nội dung bên dưới */}
      <h1 className="text-2xl font-bold text-gray-800 pb-2 border-b">{text}</h1>
    </div>
  );
};

export default Title;
