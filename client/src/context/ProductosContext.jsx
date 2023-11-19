import { createContext, useContext, useState } from "react";
import {
  createProductoRequest,
  getProductosRequest,
  deleteProductoRequest,
  getProductoRequest,
  updateProductoRequest,
} from "../api/productos.js";

const productosContext = createContext();

export const useProductos = () => {
  const context = useContext(productosContext);

  if (!context) {
    throw new Error("useProductos must be used within a ProductoProvider");
  }

  return context;
};

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const getProductos = async () => {
    try {
      const res = await getProductosRequest();
      setProductos(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const createProducto = async (producto) => {
    const res = await createProductoRequest(producto);
    console.log(res);
  };

  const deleteProducto = async (id) => {
    try {
      const res = await deleteProductoRequest(id);
      if (res.status === 204)
        setProductos(
          productos.filter((producto) => producto.id_producto !== id)
        );
    } catch (error) {
      console.error(error);
    }
  };

  const getProducto = async (id) => {
    try {
      const res = await getProductoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProducto = async (id, producto) => {
    try {
      await updateProductoRequest(id, producto);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <productosContext.Provider
      value={{
        productos,
        createProducto,
        getProducto,
        deleteProducto,
        getProductos,
        updateProducto,
      }}
    >
      {children}
    </productosContext.Provider>
  );
}
