import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Circle,
  Edit,
  Icon,
  IdCard,
  IdCardIcon,
  Locate,
  MailSearch,
  Map,
  TicketIcon,
  UserCog,
} from "lucide-react";
import Title from "../Title";
import { useStationById } from "./stationController";

const DetailSta = () => {
  const { stationId } = useParams(); // Gọi hook ở đầu
  const { station, loading, error } = useStationById(stationId);

  if (loading) {
    return (
      <div className="absolute top-[55px] left-[260px] p-6 w-[calc(100%-260px)]">
        <Title text="Thông tin chi tiết trạm" />
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-[55px] left-[260px] p-6 w-[calc(100%-260px)]">
        <Title text="Thông tin chi tiết trạm" />
        <div className="bg-white p-6 rounded-lg shadow-lg text-center text-red-500">
          Lỗi: {error}
        </div>
      </div>
    );
  }

  // Nếu không tìm thấy trạm, hiển thị thông báo
  if (!station) {
    return (
      <div className="absolute top-[55px] left-[260px] p-6 w-[calc(100%-260px)]">
        <Title text="Lỗi" />
        <p>Không tìm thấy thông tin trạm.</p>
      </div>
    );
  }

  return (
    <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
      <div className="flex justify-between items-center mb-1">
        <Title text="Thông tin chi tiết trạm" />
      </div>

      {/* Card chứa dữ liệu */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {/* Header với tên trạm */}
        <div className="mb-4 pb-3 border-b-2 border-blue-100">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Edit className="text-blue-600" size={32} />
            {station.name}
          </h2>
          <p className="text-gray-500 mt-2">ID: {station.id}</p>
        </div>

        {/* Grid layout cho thông tin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Token Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-500 p-2 rounded-lg">
                <TicketIcon className="text-white" size={20} />
              </div>
              <h3 className="font-semibold text-gray-700">Mã Token</h3>
            </div>
            <p className="text-gray-800 font-mono text-sm break-all bg-white p-3 rounded-lg">
              {station.token}
            </p>
          </div>

          {/* Location Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl border border-green-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-500 p-2 rounded-lg">
                <Map className="text-white" size={20} />
              </div>
              <h3 className="font-semibold text-gray-700">Vị trí</h3>
            </div>
            <p className="text-gray-800">
              {station.location || "Chưa cập nhật"}
            </p>
          </div>

          {/* Owner Card */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl border border-purple-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-500 p-2 rounded-lg">
                <UserCog className="text-white" size={20} />
              </div>
              <h3 className="font-semibold text-gray-700">Chủ sở hữu</h3>
            </div>
            <p className="text-gray-800">{station.owner}</p>
          </div>

          {/* Status Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl border border-orange-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Circle className="text-white" size={20} />
              </div>
              <h3 className="font-semibold text-gray-700">Trạng thái</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Kích hoạt:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    station.activationStatus === "Đã kích hoạt"
                      ? "bg-green-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {station.activationStatus}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Kết nối:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    station.connectionStatus === "Open"
                      ? "bg-blue-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {station.connectionStatus === "Open" ? "Chia sẻ" : "Khóa"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline section */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <IdCard size={20} className="text-gray-600" />
            Thông tin thời gian
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngày tạo</p>
                <p className="font-medium text-gray-800">{station.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cập nhật lần cuối</p>
                <p className="font-medium text-gray-800">
                  {station.lastUpdatedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSta;
