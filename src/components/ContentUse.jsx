import React from "react";
import Title from "./Title";

const ContentUse = () => {
  return (
    // Container chính, định vị nội dung
    <div className="absolute top-[65px] left-[260px] p-6 w-[calc(100%-260px)]">
      {/* Tiêu đề trang */}
      <Title text="Quản lý người dùng" />

      {/* Card chứa bảng dữ liệu */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Bảng dữ liệu người dùng */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 font-semibold text-sm text-gray-600 border-b">
                STT
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border-b">
                Tên người dùng
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border-b">
                Email
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border-b">
                Số trạm sở hữu
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border-b">
                Các tác vụ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-3 text-sm text-gray-800">1</td>
              <td className="p-3 text-sm text-gray-800">Nguyễn Văn A</td>
              <td className="p-3 text-sm text-gray-800">cd@gmail.com</td>
              <td className="p-3 text-sm text-gray-800">5</td>
              <td className="p-3 text-sm text-gray-800">
                <div className="flex gap-4">
                  <button className="text-blue-500 hover:underline">
                    Chi tiết
                  </button>
                  <button className="text-green-500 hover:underline">
                    Kích hoạt
                  </button>
                  <button className="text-red-500 hover:underline">Xóa</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentUse;
