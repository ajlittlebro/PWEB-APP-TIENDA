import axios from "./axios.js";

export const getNoticiasRequest = () => axios.get("/crud/noticias");

export const getNoticiaRequest = (id) => axios.get("/crud/noticias/" + id);

export const createNoticiaRequest = (noticia) => {
  const form = new FormData();

  for (let key in noticia) {
    form.append(key, noticia[key]);
  }

  return axios.post("/crud/noticias", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateNoticiaRequest = (id, noticia) => {
  const form = new FormData();

  form.append("titulo", noticia.titulo);
  form.append("descripcion", noticia.descripcion);
  form.append("fecha", noticia.fecha);

  if (noticia.image) {
    form.append("image", noticia.image);
  }

  return axios.put("/crud/noticias/" + id, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteNoticiaRequest = (id) =>
  axios.delete("/crud/noticias/" + id);
