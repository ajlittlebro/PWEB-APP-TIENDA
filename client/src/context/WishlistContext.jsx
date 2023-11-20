import { createContext, useContext, useState } from "react";
import {
  getWishlist,
  addToWishlist,
  deleteProductoWishlist,
  deleteWishlist,
  addCarrito,
  addProductoCarrito,
} from "../api/wishlist";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
};

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getWishlistData = async () => {
    try {
      if (!dataLoaded) {
        const res = await getWishlist();
        setWishlist(res.data);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishlistItem = async (id_producto) => {
    try {
      await addToWishlist(id_producto);
      setDataLoaded(false); 
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWishlistItem = async (id_producto) => {
    try {
      await deleteProductoWishlist(id_producto);
      setWishlist((prevWishlist) => prevWishlist.filter((producto) => producto.id_producto !== id_producto));
      setDataLoaded(false);
    } catch (error) {
      console.error(error);
    }
  };

  const clearWishlist = async () => {
    try {
      await deleteWishlist();
      setDataLoaded(false); 
    } catch (error) {
      console.error(error);
    }
  };

  const addToCarritoFromWishlist = async () => {
    try {
      await addCarrito();
      setDataLoaded(false); 
    } catch (error) {
      console.error(error);
    }
  };

  const addProductoToCarrito = async (id_producto) => {
    try {
      await addProductoCarrito(id_producto);
      setDataLoaded(false); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        getWishlistData,
        addToWishlistItem,
        deleteWishlistItem,
        clearWishlist,
        addToCarritoFromWishlist,
        addProductoToCarrito,
        setDataLoaded,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
