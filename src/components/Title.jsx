import React from "react";

const Title = ({ text }) => {
  return (
    <div className="mb-6">
      {" "}
      {/* Thêm khoảng cách dưới với nội dung bên dưới */}
      <h1 className="text-2xl font-bold text-gray-800 pb-2 border-b">{text}</h1>
    </div>
  );
};

export default Title;
