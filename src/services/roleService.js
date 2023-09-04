import axios from "../utils/axios";

const createNewRole = (roles) => {
  return axios.post(`/api/v1/post/role`, { ...roles });
};

export { createNewRole };
