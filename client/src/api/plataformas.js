import axios from "./axios.js";

export const getPlataformasRequest = () => axios.get("/crud/plataformas");

export const getPlataformaRequest = (id) => axios.get("/crud/plataformas/" + id);

export const createPlataformaRequest = (plataforma) => {
  return axios.post("/crud/plataformas", plataforma);
};

export const updatePlataformaRequest = (id, plataforma) => {
  return axios.put("/crud/plataformas/" + id, plataforma);
};

export const deletePlataformaRequest = (id) =>
  axios.delete("/crud/plataformas/" + id);