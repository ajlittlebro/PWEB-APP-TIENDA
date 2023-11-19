import { createContext, useContext, useState } from "react";
import {
  createProductoGeneroRequest,
  getProductosGenerosRequest,
  deleteProductoGeneroRequest,
  getProductoGeneroRequest,
 // updateProductoGeneroRequest,
} from "../api/prodgen";

const productosGenerosContext = createContext();

export const useProductosGeneros = () => {
  const context = useContext(productosGenerosContext);

  if (!context) {
    throw new Error("useProductosGeneros must be used within a ProductosGenerosProvider");
  }

  return context;
};

export function ProductosGenerosProvider({ children }) {
  const [productosGeneros, setProductosGeneros] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); 
  const getProductosGeneros = async () => {
    try {
      if (!dataLoaded) { 
        const res = await getProductosGenerosRequest();
        setProductosGeneros(res.data);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createProductoGenero = async (productoGenero) => {
    try {
      const res = await createProductoGeneroRequest(productoGenero);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProductoGenero = async (idProducto, idGenero) => {
    try {
      const res = await deleteProductoGeneroRequest(idProducto, idGenero);
      if (res.status === 204) {
        setProductosGeneros((prevProductosGeneros) =>
          prevProductosGeneros.filter(
            (pg) => !(pg.id_producto === idProducto && pg.id_genero === idGenero)
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const getProductoGenero = async (idProducto, idGenero) => {
    try {
      const res = await getProductoGeneroRequest(idProducto, idGenero);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
/*
   const updateProductoGenero = async (id, productoGenero) => {
     try {
       await updateProductoGeneroRequest(id, productoGenero);
     } catch (error) {
       console.error(error);
     }
   };
*/
  return (
    <productosGenerosContext.Provider
      value={{
        productosGeneros,
        getProductosGeneros,
        createProductoGenero,
        deleteProductoGenero,
        getProductoGenero,
        setDataLoaded,
        //updateProductoGenero,
      }}
    >
      {children}
    </productosGenerosContext.Provider>
  );
}
