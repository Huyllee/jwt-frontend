import axios from "../utils/axios";

const registerNewUser = (email, phone, username, password) => {
  return axios.post("/api/v1/register", {
    email,
    phone,
    username,
    password,
  });
};

const loginUser = (valueLogin, password) => {
  return axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const fetchAllUser = (page, limit) => {
  return axios.get(`/api/v1/get/users?page=${page}&limit=${limit}`);
};

const deleteUser = (userId) => {
  return axios.delete(`/api/v1/delete/user`, {
    data: { userId },
  });
};

const fetchAllGroup = () => {
  return axios.get(`/api/v1/get/groups`);
};

const createNewUser = (userData) => {
  return axios.post(`/api/v1/post/user`, { ...userData });
};

const updateUser = (userData) => {
  return axios.put(`/api/v1/put/user`, { ...userData });
};

const fetchUserAccount = () => {
  return axios.get(`/api/v1/account`);
};

export {
  registerNewUser,
  loginUser,
  fetchAllUser,
  deleteUser,
  fetchAllGroup,
  createNewUser,
  updateUser,
  fetchUserAccount,
};
