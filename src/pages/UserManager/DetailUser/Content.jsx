import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStationByUserID } from "../useController";
import { useAllStations } from "../../StationManager/useController";
import Title from "@/components/Title";


const DetailUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const {
    stations,
    loading,
    error,
    refetch: fetchStationByUserID,
  } = useStationByUserID(userId);

  const { deleteStation } = useAllStations();

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

  // Show confirmation modal
  const handleShowConfirm = (action, station) => {
    setConfirmAction(action);
    setSelectedStation(station);
    setShowConfirmModal(true);
  };

  // Handle confirm action
  const handleConfirm = () => {
    if (selectedStation) {
      if (confirmAction === "delete") {
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

  if (loading) {
    return (
      <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
        <Title text="Danh sách trạm sở hữu" />
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
        <Title text="Danh sách trạm sở hữu" />
        <div className="bg-white p-6 rounded-lg shadow-lg text-center text-red-500">
          Lỗi: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
      {/* Title with back button */}
      <div className="flex justify-between items-center mb-1">
        <Title text={`Các trạm của ${stations[0]?.owner}`} />
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors"
          onClick={() => navigate("/userManager")}
        >
          ← Quay lại
        </button>
      </div>

      {/* Data table */}
      <div className="bg-white p-6 pb-2 pt-2 rounded-lg shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#9DD7FB] border border-gray-300">
            <tr>
              <th className="p-3 font-semibold text-sm text-gray-600 border">
                ID
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border">
                Tên trạm
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border">
                Mã token
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border">
                Trạng thái
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border">
                Các tác vụ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stations.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Người dùng này chưa sở hữu trạm nào
                </td>
              </tr>
            ) : (
              stations
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
                    <td className="p-3 text-sm text-gray-800">
                      {station.name}
                    </td>
                    <td className="p-3 text-sm text-gray-800 font-mono">
                      {station.token}
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      <span
                        className={`px-2 py-1 rounded text-xs ${station.connectionStatus === "Public"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                          }`}
                      >
                        {station.connectionStatus === "Public"
                          ? "Đang chia sẻ"
                          : "Đã khóa"}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-800">
                      <div className="flex gap-2">
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
                          className="text-red-500 hover:underline"
                          onClick={() => handleShowConfirm("delete", station)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {stations.length > 0 && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-700">
              Hiển thị từ {(currentPage - 1) * itemsPerPage + 1} đến{" "}
              {Math.min(currentPage * itemsPerPage, stations.length)} trên tổng
              số {stations.length} trạm
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
                      Math.ceil(stations.length / itemsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage === Math.ceil(stations.length / itemsPerPage)
                }
                className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trang sau
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-300 p-6 min-w-[320px] text-center pointer-events-auto">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                {confirmAction === "delete" && "Xác nhận xóa"}
              </p>
              <p className="text-gray-600 mb-4">
                {confirmAction === "delete" &&
                  `Bạn có chắc muốn xóa trạm "${selectedStation?.name}"?`}
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
                  className={`px-6 py-2 font-semibold rounded transition-colors text-white ${confirmAction === "Public"
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
    </div>
  );
};

export default DetailUser;
