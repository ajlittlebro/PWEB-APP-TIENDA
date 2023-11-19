import axios from "./axios.js";

export const getProductosGenerosRequest = () => axios.get("/crud/productosgeneros");

export const getProductoGeneroRequest = (idproducto, idgenero) => axios.get("/crud/productosgeneros/" + idproducto + "/" + idgenero);

export const createProductoGeneroRequest = (productogenero) => {
  return axios.post("/crud/productosgeneros", productogenero);
};
/*
export const updateProductoGeneroRequest = (id, productogenero) => {
  return axios.put("/crud/productosgeneros/" + id, productogenero);
};
*/
export const deleteProductoGeneroRequest = (idproducto, idgenero) =>
axios.delete(`/crud/productosgeneros/${idproducto}/${idgenero}`);

