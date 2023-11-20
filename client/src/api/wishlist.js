import axios from "./axios.js";

export const getWishlist = () => {
  return axios.get("/tienda/wishlist");
}

export const addToWishlist = (id_producto) => {
  return axios.post("/tienda/wishlist/agregar", { id_producto });
};

export const deleteProductoWishlist = (id_producto) => {
  return axios.delete("/tienda/wishlist/eliminarProducto", { data: { id_producto } });
};

export const deleteWishlist = () => {
  return axios.delete("/tienda/wishlist/eliminarWishlist");
};

export const addCarrito = () => {
  return axios.post("/tienda/wishlist/carrito");
};

export const addProductoCarrito = (id_producto) => {
  return axios.post("/tienda/wishlist/addtocarrito", { id_producto });
};
