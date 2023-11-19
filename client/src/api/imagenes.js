import axios from "./axios.js";

export const getImagenesRequest = () => axios.get("/crud/imagenes");

export const getImagenRequest = (id) => axios.get("/crud/imagenes/" + id);

export const createImagenRequest = (imagen) => {
  const form = new FormData();

  for (let key in imagen) {
    form.append(key, imagen[key]);
  }

  return axios.post("/crud/imagenes", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateImagenRequest = (id, imagen) => {
  const form = new FormData();

  form.append("id_producto", imagen.id_producto);

  if (imagen.image) {
    form.append("image", imagen.image);
  }

  return axios.put("/crud/imagenes/" + id, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteImagenRequest = (id) =>
  axios.delete("/crud/imagenes/" + id);
