import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import stationsService from "../../apis/services/stationsService";

export const useAllStations = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeStations, setActiveStations] = useState([]);
  const [inactiveStations, setInactiveStations] = useState([]);

  const fetchAllStations = async (silent = false) => {
    if (!silent) {
      setLoading(true);
    }
    setError(null);
    try {
      const response = await stationsService.getStations(0, 100);

      const stations = response.data.map((station) => ({
        id: station.id,
        name: station.name,
        token: station.apiKey,
        owner: station.ownerName,
        isActivated: station.active,
        connectionStatus: station.isPublic ? "Public" : "Private",
      }));

      // Sort stations by ID ascending
      stations.sort((a, b) => a.id - b.id);

      setStations(stations);

      const activeStations = stations.filter((s) => s.isActivated);
      const inactiveStations = stations.filter((s) => !s.isActivated);

      setInactiveStations(inactiveStations);
      setActiveStations(activeStations);
    } catch (error) {
      setError(error.message);
      console.error(error);
      toast.error(error.message);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAllStations();
  }, []);

  const deleteStation = async (stationId) => {
    try {
      await stationsService.deleteStation(stationId);
      toast.success("Đã xóa trạm thành công!");
      await fetchAllStations(true);
    } catch (error) {
      setError(error.message);
      console.error(error);
      toast.error(error.message);
    }
  };

  return {
    stations,
    loading,
    error,
    activeStations,
    inactiveStations,
    refetch: fetchAllStations,
    deleteStation,
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
      const response = await stationsService.getStationById(id);
      const formattedData = {
        id: response.id,
        name: response.name,
        token: response.apiKey,
        location: response.location,
        activationStatus: response.active ? "Đã kích hoạt" : "Chưa kích hoạt",
        connectionStatus: response.isPublic ? "Public" : "Private",
        createdAt: response.createdAt,
        lastUpdatedAt: response.updatedAt,
        owner: response.ownerName,
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
    const createdStations = await stationsService.createStations(quantity);
    toast.success("Đã tạo trạm thành công!");
    return createdStations;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return null;
  }
};
