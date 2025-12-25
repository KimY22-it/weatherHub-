import axiosClient from "./axiosClient";

const getUsers = async (page = 0, size = 10) => {
    const response = await axiosClient.get("/users", { params: { page, size } });
    return response.data;
};

const lockUser = async (userId) => {
    const response = await axiosClient.put(`/users/${userId}/lock`);
    return response.data;
};

const unlockUser = async (userId) => {
    const response = await axiosClient.put(`/users/${userId}/unlock`);
    return response.data;
};

export default {
    getUsers,
    lockUser,
    unlockUser,
};
