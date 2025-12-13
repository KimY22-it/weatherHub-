import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Title from "../Title";

const DetailUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    // Confirmation modal state
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);

    useEffect(() => {
        const fetchUserAndStations = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch user info
                const userResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${userId}`
                );
                if (!userResponse.ok) {
                    throw new Error("Không tìm thấy người dùng!");
                }
                const userData = await userResponse.json();
                setUser(userData);

                // Fetch stations (using posts as fake stations for this user)
                const stationsResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
                );
                const stationsData = await stationsResponse.json();

                // Format as stations
                const formattedStations = stationsData.slice(0, 10).map((item, index) => ({
                    id: item.id,
                    name: `Trạm ${userData.username}-${index + 1}`,
                    token: `${Math.random().toString(36).substring(2, 10)}...`,
                    location: `${userData.address.city}, ${userData.address.street}`,
                    connectionStatus: Math.random() > 0.3 ? "open" : "locked",
                    createdAt: "01/11/2025",
                }));
                setStations(formattedStations);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserAndStations();
        }
    }, [userId]);

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
                // Toggle connection status
                setStations((prev) =>
                    prev.map((s) => {
                        if (s.id === selectedStation.id) {
                            const newStatus = s.connectionStatus === "open" ? "locked" : "open";
                            return { ...s, connectionStatus: newStatus };
                        }
                        return s;
                    })
                );
                toast.success(confirmAction === "open" ? "Đã mở trạm!" : "Đã khóa trạm!");
            } else if (confirmAction === "delete") {
                setStations((prev) => prev.filter((s) => s.id !== selectedStation.id));
                toast.success("Đã xóa trạm thành công!");
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

    if (!user) {
        return (
            <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
                <Title text="Lỗi" />
                <p>Không tìm thấy thông tin người dùng.</p>
            </div>
        );
    }

    return (
        <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
            {/* Title with back button */}
            <div className="flex justify-between items-center mb-1">
                <Title text={`Các trạm của: ${user.name}`} />
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors"
                    onClick={() => navigate("/userManager")}
                >
                    ← Quay lại
                </button>
            </div>

            {/* Card with table */}
            <div className="bg-white p-6 pb-2 pt-2 rounded-lg shadow-lg">
                {/* User info header */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-gray-700">
                        <span className="font-semibold">Chủ sở hữu:</span> {user.name} ({user.username})
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Tổng số trạm:</span> {stations.length} trạm
                    </p>
                </div>

                {/* Data table */}
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#9DD7FB] border border-gray-300">
                        <tr>
                            <th className="p-3 font-semibold text-sm text-gray-600 border">
                                STT
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
                                        <td className="p-3 text-sm text-gray-800">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                        <td className="p-3 text-sm text-gray-800">{station.name}</td>
                                        <td className="p-3 text-sm text-gray-800 font-mono">
                                            {station.token}
                                        </td>
                                        <td className="p-3 text-sm text-gray-800">
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${station.connectionStatus === "open"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-orange-100 text-orange-700"
                                                    }`}
                                            >
                                                {station.connectionStatus === "open" ? "Đang mở" : "Đã khóa"}
                                            </span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-800">
                                            <div className="flex gap-2">
                                                <button
                                                    className="text-blue-500 hover:underline"
                                                    onClick={() => navigate(`/stationManager/detailStation/${station.id}`)}
                                                >
                                                    Chi tiết
                                                </button>
                                                <button
                                                    className={`${station.connectionStatus === "locked" ? "text-green-500" : "text-orange-500"} hover:underline`}
                                                    onClick={() => handleShowConfirm(
                                                        station.connectionStatus === "locked" ? "open" : "lock",
                                                        station
                                                    )}
                                                >
                                                    {station.connectionStatus === "locked" ? "Mở" : "Khóa"}
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
                            {Math.min(currentPage * itemsPerPage, stations.length)} trên tổng số{" "}
                            {stations.length} trạm
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
                                        Math.min(prev + 1, Math.ceil(stations.length / itemsPerPage))
                                    )
                                }
                                disabled={currentPage === Math.ceil(stations.length / itemsPerPage)}
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
                            {confirmAction === "open" && "Xác nhận mở trạm"}
                            {confirmAction === "lock" && "Xác nhận khóa trạm"}
                            {confirmAction === "delete" && "Xác nhận xóa"}
                        </p>
                        <p className="text-gray-600 mb-4">
                            {confirmAction === "open" && `Bạn có chắc muốn mở trạm "${selectedStation?.name}"?`}
                            {confirmAction === "lock" && `Bạn có chắc muốn khóa trạm "${selectedStation?.name}"?`}
                            {confirmAction === "delete" && `Bạn có chắc muốn xóa trạm "${selectedStation?.name}"?`}
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
                                className={`px-6 py-2 font-semibold rounded transition-colors text-white ${confirmAction === "open"
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

export default DetailUser;
