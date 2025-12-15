import axiosClient from "./axiosClient";

const login = async (body) => {
  return await axiosClient.post("/auth/login", body);
};

const logout = async () => {
  return await axiosClient.post("/auth/logout");
};

const refreshToken = async (refreshToken) => {
  return await axiosClient.post("/auth/refresh-token", refreshToken);
};

export default {
  login,
  refreshToken,
  logout,
};
