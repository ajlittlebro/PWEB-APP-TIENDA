import axios from "./axios.js";

export const getGenerosRequest = () => axios.get("/crud/generos");

export const getGeneroRequest = (id) => axios.get("/crud/generos/" + id);

export const createGeneroRequest = (genero) => {
  return axios.post("/crud/generos", genero);
};

export const updateGeneroRequest = (id, genero) => {
  return axios.put("/crud/generos/" + id, genero);
};

export const deleteGeneroRequest = (id) =>
  axios.delete("/crud/generos/" + id);
