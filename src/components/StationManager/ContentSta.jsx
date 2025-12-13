import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title";
import { useAllStations } from "./stationController";

const ContentSta = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Số trạm trên mỗi trang
  const [activeTab, setActiveTab] = useState("activated"); // "activated" or "inactive"

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // "activate", "delete", "open", "lock", "deleteActivated"
  const [selectedStation, setSelectedStation] = useState(null);

  const {
    stations,
    activeStations,
    inactiveStations,
    loading,
    error,
    refetch: refetchStations,
    toggleConnectionStatus,
    deleteStation,
  } = useAllStations();

  // Reset page when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Show confirmation modal
  const handleShowConfirm = (action, station) => {
    setConfirmAction(action);
    setSelectedStation(station);
    setShowConfirmModal(true);
  };

  // Handle confirm action
  const handleConfirm = () => {
    if (selectedStation) {
      if (confirmAction === "open" || confirmAction === "lock") {
        toggleConnectionStatus(selectedStation.id);
      } else if (confirmAction === "deleteStation") {
        deleteStation(selectedStation.id);
      }
    }
    setShowConfirmModal(false);
    setSelectedStation(null);
    setConfirmAction(null);
  };

  // Handle cancel
  const handleCancel = () => {
    setShowConfirmModal(false);
    setSelectedStation(null);
    setConfirmAction(null);
  };

  // Get current list based on active tab
  const currentList =
    activeTab === "activated" ? activeStations : inactiveStations;
  const isLoading = loading;

  // Logic cho việc hiển thị dữ liệu loading và error

  return (
    // Container chính, định vị nội dung bên phải NavLeft và bên dưới Header
    <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
      {/* Tiêu đề và nút hành động */}
      <div className="flex justify-between items-center mb-1">
        <Title text="Quản lý hệ thống trạm" />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors"
          onClick={() => navigate(`/stationManager/createStation`)}
        >
          + Tạo trạm
        </button>
      </div>

      {/* Card chứa bảng dữ liệu */}
      <div className="bg-white p-6 pb-2 pt-2 rounded-lg shadow-lg">
        {/* Các tab lọc */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => handleTabChange("activated")}
            className={`py-2 px-2 font-semibold ${
              activeTab === "activated"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Trạm đã kích hoạt ({activeStations.length})
          </button>
          <button
            onClick={() => handleTabChange("inactive")}
            className={`py-2 px-2 font-semibold ${
              activeTab === "inactive"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Trạm chưa kích hoạt ({inactiveStations.length})
          </button>
        </div>

        {/* Bảng dữ liệu */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#9DD7FB] border border-gray-300">
            <tr>
              <th className="p-3 font-semibold text-sm text-gray-600 border">
                ID
              </th>

              <th className="p-3 font-semibold text-sm text-gray-600 border">
                Mã token
              </th>
              {activeTab === "activated" && (
                <>
                  <th className="p-3 font-semibold text-sm text-gray-600 border">
                    Tên trạm
                  </th>
                  <th className="p-3 font-semibold text-sm text-gray-600 border">
                    Chủ sở hữu
                  </th>
                </>
              )}

              <th className="p-3 font-semibold text-sm text-gray-600 border ">
                Các tác vụ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  <div className="flex justify-center items-center gap-2">
                    <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                    Đang tải dữ liệu...
                  </div>
                </td>
              </tr>
            ) : error && activeTab === "activated" ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-red-500">
                  Lỗi: {error}
                </td>
              </tr>
            ) : currentList.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  {activeTab === "inactive"
                    ? "Không có trạm nào chưa kích hoạt"
                    : "Không có dữ liệu"}
                </td>
              </tr>
            ) : (
              currentList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((station, index) => (
                  <tr
                    key={station.id}
                    className="odd:bg-white even:bg-gray-100 divide-x divide-gray-300"
                  >
                    <td className="p-3 text-sm text-gray-800">{station.id}</td>
                    <td className="p-3 text-sm text-gray-800 font-mono">
                      {station.token}
                    </td>
                    {activeTab === "activated" && (
                      <>
                        <td className="p-3 text-sm text-gray-800">
                          {station.name}
                        </td>
                        <td className="p-3 text-sm text-gray-800">
                          {station.owner}
                        </td>
                      </>
                    )}

                    <td className="p-3 text-sm text-gray-800">
                      <div className="flex gap-2">
                        {activeTab === "activated" ? (
                          <>
                            <button
                              className="text-blue-500 hover:underline"
                              onClick={() =>
                                navigate(
                                  `/stationManager/detailStation/${station.id}`
                                )
                              }
                            >
                              Chi tiết
                            </button>
                            <button
                              className={`${
                                station.connectionStatus === "locked"
                                  ? "text-green-500"
                                  : "text-orange-500"
                              } hover:underline`}
                              onClick={() =>
                                handleShowConfirm(
                                  station.connectionStatus === "locked"
                                    ? "open"
                                    : "lock",
                                  station
                                )
                              }
                            >
                              {station.connectionStatus === "locked"
                                ? "Chia sẻ"
                                : "Khóa"}
                            </button>
                            <button
                              className="text-red-500 hover:underline"
                              onClick={() =>
                                handleShowConfirm("deleteStation", station)
                              }
                            >
                              Xóa
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="text-red-500 hover:underline"
                              onClick={() =>
                                handleShowConfirm("deleteStation", station)
                              }
                            >
                              Xóa
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>

        {/* Phân trang */}
        {currentList.length > 0 && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-700">
              Hiển thị từ {(currentPage - 1) * itemsPerPage + 1} đến{" "}
              {Math.min(currentPage * itemsPerPage, currentList.length)} trên
              tổng số {currentList.length} trạm
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trang trước
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(currentList.length / itemsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage === Math.ceil(currentList.length / itemsPerPage)
                }
                className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trang sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-300 p-6 min-w-[320px] text-center pointer-events-auto">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {confirmAction === "open" && "Xác nhận chia sẻ trạm"}
              {confirmAction === "lock" && "Xác nhận khóa trạm"}
              {confirmAction === "deleteStation" && "Xác nhận xóa"}
            </p>
            <p className="text-gray-600 mb-4">
              {confirmAction === "open" &&
                `Bạn có chắc muốn chia sẻ trạm "${selectedStation?.name}"?`}
              {confirmAction === "lock" &&
                `Bạn có chắc muốn khóa trạm "${selectedStation?.name}"?`}
              {confirmAction === "deleteStation" &&
                `Bạn có chắc muốn xóa trạm ID là "${selectedStation?.id}"?`}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                className={`px-6 py-2 font-semibold rounded transition-colors text-white ${
                  confirmAction === "activate" || confirmAction === "open"
                    ? "bg-green-500 hover:bg-green-600"
                    : confirmAction === "lock"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSta;
