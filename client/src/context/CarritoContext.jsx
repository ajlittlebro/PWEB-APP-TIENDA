import { createContext, useContext, useState } from "react";
import {
  getCarrito,
  addToCarrito,
  updateCarrito,
  deleteProductoCarrito,
  clearCarrito,
  addProductoToCarrito,
} from "../api/carrito";

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);

  if (!context) {
    throw new Error("useCarrito must be used within a CarritoProvider");
  }

  return context;
};

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getCarritoData = async () => {
    try {
      if (!dataLoaded) {
        const res = await getCarrito();
        setCarrito(res.data);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCarritoItem = async (id_producto) => {
    try {
      await addToCarrito(id_producto);
      setDataLoaded(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCarritoItem = async (id_producto, cantidad) => {
    try {
      await updateCarrito(id_producto, cantidad);
      setDataLoaded(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCarritoItem = async (id_producto) => {
    try {
      await deleteProductoCarrito(id_producto);
      setCarrito((prevCarrito) =>
        prevCarrito.filter((producto) => producto.id_producto !== id_producto)
      );
      setDataLoaded(false);
    } catch (error) {
      console.error(error);
    }
  };

  const clearCarritoData = async () => {
    try {
      await clearCarrito();
      setDataLoaded(false);
    } catch (error) {
      console.error(error);
    }
  };

  const addProductoToCarritoFromCarrito = async (id_producto) => {
    try {
      await addProductoToCarrito(id_producto);
      setDataLoaded(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        getCarritoData,
        addToCarritoItem,
        updateCarritoItem,
        deleteCarritoItem,
        clearCarritoData,
        addProductoToCarritoFromCarrito,
        setDataLoaded,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
