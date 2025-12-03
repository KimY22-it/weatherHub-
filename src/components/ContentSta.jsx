import React from "react";
import Title from "./Title";

const ContentSta = () => {
  return (
    // Container chính, định vị nội dung bên phải NavLeft và bên dưới Header
    <div className="absolute top-[65px] left-[260px] p-6 w-[calc(100%-260px)]">
      {/* Tiêu đề và nút hành động */}
      <div className="flex justify-between items-center mb-6">
        <Title text="Quản lý hệ thống trạm" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
          + Tạo trạm
        </button>
      </div>

      {/* Card chứa bảng dữ liệu */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Các tab lọc */}
        <div className="flex border-b mb-4">
          <button className="py-2 px-4 text-blue-600 border-b-2 border-blue-600 font-semibold">
            Trạm đã kích hoạt
          </button>
          <button className="py-2 px-4 text-gray-500 hover:text-blue-600 font-semibold">
            Trạm chưa kích hoạt
          </button>
        </div>

        {/* Bảng dữ liệu */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 font-semibold text-sm text-gray-600 border-b">
                STT
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border-b">
                Tên trạm
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border-b">
                Mã token
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border-b">
                Chủ sở hữu
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border-b">
                Các tác vụ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-3 text-sm text-gray-800">1</td>
              <td className="p-3 text-sm text-gray-800">Trạm A</td>
              <td className="p-3 text-sm text-gray-800 font-mono">cd...</td>
              <td className="p-3 text-sm text-gray-800">Nguyễn Văn A</td>
              <td className="p-3 text-sm text-gray-800">
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:underline">
                    Chi tiết
                  </button>
                  <button className="text-green-500 hover:underline">Mở</button>
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

export default ContentSta;
