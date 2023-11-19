import axios from "./axios.js";

export const getProductosRequest = () => axios.get("/crud/productos");

export const getProductoRequest = (id) => axios.get("/crud/productos/" + id);

export const createProductoRequest = (producto) => {
  const form = new FormData();

  for (let key in producto) {
    form.append(key, producto[key]);
  }

  return axios.post("/crud/productos", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProductoRequest = (id, producto) => {
  const form = new FormData();

  form.append("nombre", producto.nombre);
  form.append("descripcion", producto.descripcion);
  form.append("fecha_lanzamiento", producto.fecha_lanzamiento);
  form.append("id_editora", producto.id_editora);
  form.append("id_desarrollador", producto.id_desarrollador);
  form.append("id_plataforma", producto.id_plataforma);
  form.append("precio", producto.precio);
  form.append("existencia", producto.existencia);

  if (producto.image) {
    form.append("image", producto.image);
  }

  return axios.put("/crud/productos/" + id, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProductoRequest = (id) =>
  axios.delete("/crud/productos/" + id);
