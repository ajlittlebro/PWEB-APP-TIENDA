import axios from "./axios.js";

export const getCarrito = () => {
  return axios.get("/tienda/carrito");
};

export const addToCarrito = (id_producto) => {
  return axios.post("/tienda/carrito/agregar", { id_producto });
};

export const updateCarrito = (id_producto, cantidad) => {
  return axios.put("/tienda/carrito/actualizar", { id_producto, cantidad });
};

export const deleteProductoCarrito = (id_producto) => {
  return axios.delete("/tienda/carrito/eliminarProducto", { data: { id_producto } });
};

export const clearCarrito = () => {
  return axios.delete("/tienda/carrito/eliminarCarrito");
};

export const addProductoToCarrito = (id_producto) => {
  return axios.post("/tienda/carrito/addtocarrito", { id_producto });
};
