import axios from "../utils/axios";

const fetchAllRole = () => {
  return axios.get(`/api/v1/get/roles`);
};

const createNewRole = (roles) => {
  return axios.post(`/api/v1/post/role`, { ...roles });
};

const deleteRole = (roleId) => {
  return axios.delete(`/api/v1/delete/role`, {
    data: { roleId },
  });
};

export { createNewRole, fetchAllRole, deleteRole };
