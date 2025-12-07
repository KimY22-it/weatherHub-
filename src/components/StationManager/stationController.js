import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

// Custom hook to fetch all stations (API + locally activated)
export const useAllStations = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllStations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Lỗi xảy ra khi truy xuất dữ liệu!!");
      }
      const data = await response.json();

      // Get saved API station statuses
      const apiStationStatus = JSON.parse(localStorage.getItem("apiStationStatus") || "{}");

      const apiStations = data.map((station) => ({
        id: station.id,
        name: station.name,
        token: `${Math.random().toString(36).substring(2, 8)}...`, // Fake token
        owner: station.username,
        connectionStatus: apiStationStatus[station.id] || "open", // Get saved status or default to open
      }));

      // Get locally activated stations
      const localActivated = JSON.parse(localStorage.getItem("activatedStations") || "[]");

      // Combine API stations with locally activated stations
      setStations([...localActivated, ...apiStations]);
    } catch (error) {
      setError(error.message);
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStations();
  }, []); // Fetch data on initial render

  // Toggle connection status (open/locked) for a station
  const toggleConnectionStatus = (stationId) => {
    // Check if it's a locally activated station
    const localActivated = JSON.parse(localStorage.getItem("activatedStations") || "[]");
    const isLocalStation = localActivated.some((s) => s.id === stationId);

    if (isLocalStation) {
      // Update in localStorage for locally activated stations
      const updatedLocal = localActivated.map((s) => {
        if (s.id === stationId) {
          return {
            ...s,
            connectionStatus: s.connectionStatus === "open" ? "locked" : "open",
          };
        }
        return s;
      });
      localStorage.setItem("activatedStations", JSON.stringify(updatedLocal));
    } else {
      // For API stations, save status to separate localStorage
      const apiStationStatus = JSON.parse(localStorage.getItem("apiStationStatus") || "{}");
      const currentStatus = apiStationStatus[stationId] || "open";
      apiStationStatus[stationId] = currentStatus === "open" ? "locked" : "open";
      localStorage.setItem("apiStationStatus", JSON.stringify(apiStationStatus));
    }

    // Update state
    setStations((prev) =>
      prev.map((s) => {
        if (s.id === stationId) {
          const currentStatus = s.connectionStatus || "open";
          const newStatus = currentStatus === "open" ? "locked" : "open";
          toast.success(newStatus === "open" ? "Đã mở trạm!" : "Đã khóa trạm!");
          return { ...s, connectionStatus: newStatus };
        }
        return s;
      })
    );
  };

  // Delete an activated station
  const deleteActivatedStation = (stationId) => {
    // Remove from localStorage
    const localActivated = JSON.parse(localStorage.getItem("activatedStations") || "[]");
    const updatedLocal = localActivated.filter((s) => s.id !== stationId);
    localStorage.setItem("activatedStations", JSON.stringify(updatedLocal));

    // Update state (only for locally activated, API stations can't be deleted)
    setStations((prev) => prev.filter((s) => s.id !== stationId));
    toast.success("Đã xóa trạm thành công!");
  };

  return {
    stations,
    loading,
    error,
    refetch: fetchAllStations,
    toggleConnectionStatus,
    deleteActivatedStation,
  };
};

// Custom hook to fetch a single station by its ID
export const useStationById = (id) => {
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStationById = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const formattedData = {
        id: data.id,
        name: data.name,
        token: `${Math.random().toString(36).substring(2, 8)}...`, // Fake token
        location: `${data.address.street}, ${data.address.city}`,
        activationStatus: "Đã kích hoạt",
        connectionStatus: "Online",
        createdAt: "01/11/2025",
        lastUpdatedAt: "9:40, 10/11/2025",
        owner: data.username,
      };
      setStation(formattedData);
    } catch (err) {
      setError(err.message);
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchStationById();
  }, [fetchStationById]);

  return { station, loading, error, refetch: fetchStationById };
};

// Function to create new stations
export const createStations = async (quantity) => {
  try {
    const createdStations = [];

    for (let i = 0; i < quantity; i++) {
      // Generate random token
      const token = `${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 10)}`;

      // Generate station name
      const stationName = `Trạm mới ${Date.now()}-${i + 1}`;

      // Call API to create station (using JSONPlaceholder POST)
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: stationName,
          token: token,
          username: "Admin", // Default owner
        }),
      });

      if (!response.ok) {
        throw new Error(`Lỗi khi tạo trạm ${i + 1}`);
      }

      const data = await response.json();
      const newStation = {
        id: `inactive-${Date.now()}-${i}`,
        name: stationName,
        token: token,
        owner: "Admin",
        isActivated: false,
        createdAt: new Date().toISOString(),
      };
      createdStations.push(newStation);
    }

    // Save to localStorage
    const existingInactive = JSON.parse(localStorage.getItem("inactiveStations") || "[]");
    const updatedInactive = [...existingInactive, ...createdStations];
    localStorage.setItem("inactiveStations", JSON.stringify(updatedInactive));

    return { success: true, stations: createdStations };
  } catch (error) {
    console.error("Error creating stations:", error);
    return { success: false, error: error.message };
  }
};

// Custom hook to get inactive stations from localStorage
export const useInactiveStations = () => {
  const [inactiveStations, setInactiveStations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInactiveStations = useCallback(() => {
    setLoading(true);
    try {
      const stored = JSON.parse(localStorage.getItem("inactiveStations") || "[]");
      setInactiveStations(stored);
    } catch (error) {
      console.error("Error loading inactive stations:", error);
      setInactiveStations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInactiveStations();
  }, [fetchInactiveStations]);

  // Activate a station (move from inactive to active)
  const activateStation = (stationId) => {
    // Find the station to activate
    const stationToActivate = inactiveStations.find((s) => s.id === stationId);

    if (stationToActivate) {
      // Update the station's activation status with default connectionStatus
      const activatedStation = {
        ...stationToActivate,
        isActivated: true,
        connectionStatus: "open", // Default to open when activated
      };

      // Add to activated stations in localStorage
      const existingActivated = JSON.parse(localStorage.getItem("activatedStations") || "[]");
      localStorage.setItem("activatedStations", JSON.stringify([...existingActivated, activatedStation]));
    }

    // Remove from inactive stations
    const updated = inactiveStations.filter((s) => s.id !== stationId);
    localStorage.setItem("inactiveStations", JSON.stringify(updated));
    setInactiveStations(updated);
    toast.success("Đã kích hoạt trạm thành công!");
  };

  // Delete an inactive station
  const deleteInactiveStation = (stationId) => {
    const updated = inactiveStations.filter((s) => s.id !== stationId);
    localStorage.setItem("inactiveStations", JSON.stringify(updated));
    setInactiveStations(updated);
    toast.success("Đã xóa trạm thành công!");
  };

  return {
    inactiveStations,
    loading,
    refetch: fetchInactiveStations,
    activateStation,
    deleteInactiveStation,
  };
};