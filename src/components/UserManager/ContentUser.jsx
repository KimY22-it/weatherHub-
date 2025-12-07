import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title";
import { useAllUsers } from "./userController";

const ContentUser = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [activeTab, setActiveTab] = useState("active"); // "active" or "inactive"

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { users, loading, error, toggleUserStatus, deleteUser } = useAllUsers();

  // Filter users by status
  const activeUsers = users.filter((u) => u.isActive);
  const inactiveUsers = users.filter((u) => !u.isActive);

  // Reset page when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Show confirmation modal
  const handleShowConfirm = (action, user) => {
    setConfirmAction(action);
    setSelectedUser(user);
    setShowConfirmModal(true);
  };

  // Handle confirm action
  const handleConfirm = () => {
    if (selectedUser) {
      if (confirmAction === "activate" || confirmAction === "deactivate") {
        toggleUserStatus(selectedUser.id);
      } else if (confirmAction === "delete") {
        deleteUser(selectedUser.id);
      }
    }
    setShowConfirmModal(false);
    setSelectedUser(null);
    setConfirmAction(null);
  };

  // Handle cancel
  const handleCancel = () => {
    setShowConfirmModal(false);
    setSelectedUser(null);
    setConfirmAction(null);
  };

  // Get current list based on active tab
  const currentList = activeTab === "active" ? activeUsers : inactiveUsers;

  // Loading state
  if (loading) {
    return (
      <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
        <Title text="Quản lý người dùng" />
        <div className="bg-white p-6 pb-2 pt-2 rounded-lg shadow-lg text-center">
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
        <Title text="Quản lý người dùng" />
        <div className="bg-white p-6 pb-2 pt-2 rounded-lg shadow-lg text-center text-red-500">
          Lỗi: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
      {/* Title */}
      <div className="flex justify-between items-center mb-1">
        <Title text="Quản lý người dùng" />
      </div>

      {/* Card with table */}
      <div className="bg-white p-6 pb-2 pt-2 rounded-lg shadow-lg">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => handleTabChange("active")}
            className={`py-2 px-2 font-semibold ${activeTab === "active"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
              }`}
          >
            Người dùng hoạt động ({activeUsers.length})
          </button>
          <button
            onClick={() => handleTabChange("inactive")}
            className={`py-2 px-2 font-semibold ${activeTab === "inactive"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
              }`}
          >
            Người dùng bị vô hiệu ({inactiveUsers.length})
          </button>
        </div>

        {/* Data table */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#9DD7FB] border border-gray-300">
            <tr>
              <th className="p-3 font-semibold text-sm text-gray-600 border">
                STT
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border">
                Tên người dùng
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border">
                Email
              </th>

              <th className="p-3 font-semibold text-sm text-gray-600 border">
                Số trạm sở hữu
              </th>
              <th className="p-3 font-semibold text-sm text-gray-600 border">
                Các tác vụ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentList.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  {activeTab === "inactive"
                    ? "Không có người dùng bị vô hiệu"
                    : "Không có dữ liệu"}
                </td>
              </tr>
            ) : (
              currentList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((user, index) => (
                  <tr
                    key={user.id}
                    className="odd:bg-white even:bg-gray-100 divide-x divide-gray-300"
                  >
                    <td className="p-3 text-sm text-gray-800">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="p-3 text-sm text-gray-800">{user.name}</td>
                    <td className="p-3 text-sm text-gray-800">{user.email}</td>

                    <td className="p-3 text-sm text-gray-800">{user.stationCount}</td>
                    <td className="p-3 text-sm text-gray-800">
                      <div className="flex gap-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => navigate(`/userManager/detailUserPage/${user.id}`)}
                        >
                          Chi tiết
                        </button>
                        {activeTab === "active" ? (
                          <button
                            className="text-orange-500 hover:underline"
                            onClick={() => handleShowConfirm("deactivate", user)}
                          >
                            Vô hiệu
                          </button>
                        ) : (
                          <button
                            className="text-green-500 hover:underline"
                            onClick={() => handleShowConfirm("activate", user)}
                          >
                            Kích hoạt
                          </button>
                        )}
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleShowConfirm("delete", user)}
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
        {currentList.length > 0 && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-700">
              Hiển thị từ {(currentPage - 1) * itemsPerPage + 1} đến{" "}
              {Math.min(currentPage * itemsPerPage, currentList.length)} trên tổng số{" "}
              {currentList.length} người dùng
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
                    Math.min(prev + 1, Math.ceil(currentList.length / itemsPerPage))
                  )
                }
                disabled={currentPage === Math.ceil(currentList.length / itemsPerPage)}
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
              {confirmAction === "activate" && "Xác nhận kích hoạt"}
              {confirmAction === "deactivate" && "Xác nhận vô hiệu hóa"}
              {confirmAction === "delete" && "Xác nhận xóa"}
            </p>
            <p className="text-gray-600 mb-4">
              {confirmAction === "activate" &&
                `Bạn có chắc muốn kích hoạt người dùng "${selectedUser?.name}"?`}
              {confirmAction === "deactivate" &&
                `Bạn có chắc muốn vô hiệu hóa người dùng "${selectedUser?.name}"?`}
              {confirmAction === "delete" &&
                `Bạn có chắc muốn xóa người dùng "${selectedUser?.name}"?`}
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
                className={`px-6 py-2 font-semibold rounded transition-colors text-white ${confirmAction === "activate"
                  ? "bg-green-500 hover:bg-green-600"
                  : confirmAction === "deactivate"
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

export default ContentUser;
