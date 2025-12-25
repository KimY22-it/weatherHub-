import stationsService from "@/apis/services/stationsService";
import userService from "@/apis/services/userService";
import { useState, useEffect } from "react";

// Custom hook to get dashboard stats
export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    stationStats: { total: 0, activated: 0, inactive: 0 },
    userStats: { total: 0, active: 0, disabled: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const stationResponse = await stationsService.getStations(0, 100);
        const formattedData = stationResponse.data.map((station) => ({
          id: station.id,
          active: station.active,
        }));
        const activeStations = formattedData.filter((s) => s.active);
        const inactiveStations = formattedData.filter((s) => !s.active);

        const userResponse = await userService.getUsers(0, 100);
        const formattedUserData = userResponse.data.map((user) => ({
          id: user.id,
          active: user.active,
        }));
        const activeUsers = formattedUserData.filter((u) => u.active);
        const disabledUsers = formattedUserData.filter((u) => !u.active);

        setStats({
          stationStats: {
            total: activeStations.length + inactiveStations.length,
            activated: activeStations.length,
            inactive: inactiveStations.length,
          },
          userStats: {
            total: activeUsers.length + disabledUsers.length,
            active: activeUsers.length,
            disabled: disabledUsers.length,
          },
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
