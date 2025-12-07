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
                // Fetch stations from API
                const stationResponse = await fetch("https://jsonplaceholder.typicode.com/users");
                const stationData = await stationResponse.json();

                // Get locally activated stations
                const localActivated = JSON.parse(localStorage.getItem("activatedStations") || "[]");
                // Get inactive stations
                const inactiveStations = JSON.parse(localStorage.getItem("inactiveStations") || "[]");

                // Calculate station stats
                const activatedCount = stationData.length + localActivated.length;
                const inactiveCount = inactiveStations.length;
                const totalStations = activatedCount + inactiveCount;

                // Fetch users from API
                const userResponse = await fetch("https://jsonplaceholder.typicode.com/users");
                const userData = await userResponse.json();

                // Get user statuses from localStorage
                const userStatus = JSON.parse(localStorage.getItem("userStatus") || "{}");

                // Count active and disabled users
                let activeCount = 0;
                let disabledCount = 0;
                userData.forEach((user) => {
                    if (userStatus[user.id]?.isActive === false) {
                        disabledCount++;
                    } else {
                        activeCount++;
                    }
                });

                setStats({
                    stationStats: {
                        total: totalStations,
                        activated: activatedCount,
                        inactive: inactiveCount,
                    },
                    userStats: {
                        total: userData.length,
                        active: activeCount,
                        disabled: disabledCount,
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
