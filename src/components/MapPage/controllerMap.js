import stationsService from "@/apis/stationsService";
import { useEffect, useState } from "react";

export const useAllLocations = () => {
  const [stations, setStations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocation = async () => {
    try {
      const response = await stationsService.getStations(0, 100);
      const stations = response.data.filter((station) => station.latitude && station.longitude);
      const formattedStation = stations.map((station) => ({
        id: station.id,
        name: station.name,
        marker: {
          lat: parseFloat(station.latitude),
          lng: parseFloat(station.longitude),
        },
        location: station.location,
        isPublic: station.isPublic,
      }));
      console.log(stations);
      setStations(formattedStation);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  return {
    stations,
    loading,
    error,
    refetch: fetchLocation,
  };
};
