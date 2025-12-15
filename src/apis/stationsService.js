import axiosClient from "./axiosClient";

const getStations = async (page = 0, size = 10) => {
  const res = await axiosClient.get("/stations/all", {
    params: { page, size },
  });
  return res.data;
};
const deleteStation = async (id) => {
  const res = await axiosClient.delete(`/stations/${id}`);
  return res.data;
};
const connectionStatus = async (id) => {
  const res = await axiosClient.put(`/stations/${id}/sharing`);
  return res.data;
};

const getStationById = async (id) => {
  const res = await axiosClient.get(`/stations/${id}`);
  return res.data;
};
const createStations = async (quantity) => {
  const res = await axiosClient.post("/stations/batch?n=" + quantity);
  return res.data;
};
const getStationsByIdUser = async (id) => {
  const res = await axiosClient.get(`/stations/users/${id}`);
  return res.data;
};
export default {
  getStations,
  deleteStation,
  connectionStatus,
  getStationById,
  createStations,
  getStationsByIdUser,
};
