import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

// Custom hook to fetch all users
export const useAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) {
                throw new Error("Lỗi xảy ra khi truy xuất dữ liệu!!");
            }
            const data = await response.json();

            // Get saved user statuses from localStorage
            const userStatus = JSON.parse(localStorage.getItem("userStatus") || "{}");

            const formattedData = data.map((user) => ({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                stationCount: Math.floor(Math.random() * 10) + 1, // Random station count
                isActive: userStatus[user.id]?.isActive !== undefined ? userStatus[user.id].isActive : true,
                createdAt: "01/11/2025",
            }));
            setUsers(formattedData);
        } catch (error) {
            setError(error.message);
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    // Toggle user active status
    const toggleUserStatus = (userId) => {
        const userStatus = JSON.parse(localStorage.getItem("userStatus") || "{}");
        const currentStatus = userStatus[userId]?.isActive !== undefined ? userStatus[userId].isActive : true;
        userStatus[userId] = { isActive: !currentStatus };
        localStorage.setItem("userStatus", JSON.stringify(userStatus));

        setUsers((prev) =>
            prev.map((u) => {
                if (u.id === userId) {
                    const newStatus = !u.isActive;
                    toast.success(newStatus ? "Đã kích hoạt người dùng!" : "Đã vô hiệu hóa người dùng!");
                    return { ...u, isActive: newStatus };
                }
                return u;
            })
        );
    };

    // Delete a user (only from state, not real deletion)
    const deleteUser = (userId) => {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        toast.success("Đã xóa người dùng thành công!");
    };

    return {
        users,
        loading,
        error,
        refetch: fetchAllUsers,
        toggleUserStatus,
        deleteUser,
    };
};

// Custom hook to fetch a single user by ID
export const useUserById = (id) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserById = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${id}`
            );
            if (!response.ok) {
                throw new Error("Không tìm thấy người dùng!");
            }
            const data = await response.json();
            const formattedData = {
                id: data.id,
                name: data.name,
                username: data.username,
                email: data.email,
                phone: data.phone,
                address: `${data.address.street}, ${data.address.city}`,
                company: data.company.name,
                website: data.website,
                stationCount: Math.floor(Math.random() * 10) + 1,
                isActive: true,
                createdAt: "01/11/2025",
            };
            setUser(formattedData);
        } catch (err) {
            setError(err.message);
            console.error(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchUserById();
    }, [fetchUserById]);

    return { user, loading, error, refetch: fetchUserById };
};
