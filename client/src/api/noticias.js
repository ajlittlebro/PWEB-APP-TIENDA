import axios from "./axios.js";

export const getNoticiasRequest = () => axios.get("/crud/noticias");

export const getNoticiaRequest = (id) => axios.get("/crud/noticias/" + id);

export const createNoticiaRequest = (noticia) =>
  axios.post("/crud/noticias", noticia);

export const updateNoticiaRequest = (id, noticia) =>
  axios.put("/crud/noticias/" + id, noticia);

export const deleteNoticiaRequest = (id) => axios.delete("/crud/noticias/" + id);
