import React from "react";
import { Card } from "../ui/card";
import Title from "../Title";
import { useDashboardStats } from "./HomePageController";

const ContentHomePage = () => {
  // Get real data from controller
  const { stats, loading } = useDashboardStats();
  const { stationStats, userStats } = stats;

  // Calculate percentages (avoid division by zero)
  const stationActivatedPercent = stationStats.total > 0
    ? (stationStats.activated / stationStats.total) * 100
    : 0;
  const userActivePercent = userStats.total > 0
    ? (userStats.active / userStats.total) * 100
    : 0;

  return (
    <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
      <div className="flex justify-between items-center mb-1">
        <Title text="Trang chủ" />
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Card 1: Station Stats */}
        <Card className="p-6 border-0 bg-gradient-to-br from-white to-green-50 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600 mb-1">Tổng số trạm</h2>
              <p className="text-4xl font-bold text-gray-800">{stationStats.total}</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">📡</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Đã kích hoạt: <strong className="ml-1">{stationStats.activated}</strong>
              </span>
              <span className="flex items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                Chưa kích hoạt: <strong className="ml-1">{stationStats.inactive}</strong>
              </span>
            </div>
          </div>
        </Card>

        {/* Card 2: User Stats */}
        <Card className="p-6 border-0 bg-gradient-to-br from-white to-blue-50 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600 mb-1">Tổng số người dùng</h2>
              <p className="text-4xl font-bold text-gray-800">{userStats.total}</p>
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">👥</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Đang hoạt động: <strong className="ml-1">{userStats.active}</strong>
              </span>
              <span className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Đã vô hiệu: <strong className="ml-1">{userStats.disabled}</strong>
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Cards Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Chart Card 1: Station Status Chart */}
        <Card className="p-6 border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-gray-700 mb-6 text-center">
            Biểu đồ trạng thái trạm
          </h2>
          <div className="flex items-center justify-center gap-10">
            {/* Donut Chart */}
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="16"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="16"
                  strokeDasharray={`${stationActivatedPercent * 2.51} 251`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-green-600">{Math.round(stationActivatedPercent)}%</span>
                <span className="text-xs text-gray-500">Đã kích hoạt</span>
              </div>
            </div>
            {/* Legend */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Đã kích hoạt</p>
                  <p className="text-lg font-bold text-gray-900">{stationStats.activated} trạm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Chưa kích hoạt</p>
                  <p className="text-lg font-bold text-gray-900">{stationStats.inactive} trạm</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chart Card 2: User Status Chart */}
        <Card className="p-6 border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-gray-700 mb-6 text-center">
            Biểu đồ trạng thái người dùng
          </h2>
          <div className="flex items-center justify-center gap-10">
            {/* Donut Chart */}
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#fecaca"
                  strokeWidth="16"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="16"
                  strokeDasharray={`${userActivePercent * 2.51} 251`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">{Math.round(userActivePercent)}%</span>
                <span className="text-xs text-gray-500">Hoạt động</span>
              </div>
            </div>
            {/* Legend */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Đang hoạt động</p>
                  <p className="text-lg font-bold text-gray-900">{userStats.active} người</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-400 rounded-sm"></div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Đã vô hiệu</p>
                  <p className="text-lg font-bold text-gray-900">{userStats.disabled} người</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContentHomePage;
