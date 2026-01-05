import userService from "@/apis/services/userService";
import stationsService from "@/apis/services/stationsService";
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
      // Fetch more users to support client-side pagination
      const response = await userService.getUsers(0, 100);

      const formattedData = response.data.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        stationCount: user.stationCount,
        isActive: user.active,
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
  const toggleUserStatus = async (userId) => {
    try {
      const user = users.find((u) => u.id === userId);
      if (!user) return;

      const newStatus = !user.isActive;
      if (user.isActive) {
        await userService.lockUser(userId);
      } else {
        await userService.unlockUser(userId);
      }

      toast.success(
        `Đã ${newStatus ? "kích hoạt" : "vô hiệu"} người dùng thành công!`
      );
      fetchAllUsers();
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật trạng thái người dùng");
    }
  };

  return {
    users,
    loading,
    error,
    refetch: fetchAllUsers,
    toggleUserStatus,
  };
};

export const useStationByUserID = (userId) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStationByUserID = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await stationsService.getStationsByIdUser(userId);

      const formattedData = response.data.map((station) => ({
        id: station.id,
        name: station.name,
        token: station.apiKey,
        location: station.location,
        connectionStatus: station.isPublic ? "Public" : "Private",
        isActive: station.active,
        createdAt: station.createdAt,
        updatedAt: station.updatedAt,
        owner: station.ownerName,
      }));
      setStations(formattedData);
    } catch (error) {
      setError(error.message);
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStationByUserID();
  }, [fetchStationByUserID]);

  return {
    stations,
    loading,
    error,
    refetch: fetchStationByUserID,
  };
};
