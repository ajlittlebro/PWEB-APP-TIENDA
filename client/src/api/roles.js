import axios from "./axios.js";

export const getRolesRequest = () =>
  {
    return axios.get("/crud/roles");
  }

export const getRolRequest = (id) =>
  axios.get("/crud/roles/" + id);

