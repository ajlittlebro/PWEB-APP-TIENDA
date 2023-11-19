import axios from "./axios.js";

export const getDesarrolladoresRequest = () =>
  {
    return axios.get("/crud/desarrolladores");
  }

export const getDesarrolladorRequest = (id) =>
  axios.get("/crud/desarrolladores/" + id);

export const createDesarrolladorRequest = (desarrollador) => {
  return axios.post("/crud/desarrolladores", desarrollador);
};

export const updateDesarrolladorRequest = (id, desarrollador) => {
  return axios.put("/crud/desarrolladores/" + id, desarrollador);
};

export const deleteDesarrolladorRequest = (id) =>
  axios.delete("/crud/desarrolladores/" + id);
