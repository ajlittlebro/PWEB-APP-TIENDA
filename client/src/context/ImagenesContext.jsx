import { createContext, useContext, useState } from "react";
import {
  createImagenRequest,
  getImagenesRequest,
  deleteImagenRequest,
  getImagenRequest,
  updateImagenRequest,
} from "../api/imagenes.js";

const imagenesContext = createContext();

export const useImagenes = () => {
  const context = useContext(imagenesContext);

  if (!context) {
    throw new Error("useImagenes must be used within a ImagenProvider");
  }

  return context;
};

export function ImagenProvider({ children }) {
  const [imagenes, setImagenes] = useState([]);
  const getImagenes = async () => {
    try {
      const res = await getImagenesRequest();
      setImagenes(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const createImagen = async (imagen) => {
    const res = await createImagenRequest(imagen);
    console.log(res);
  };

  const deleteImagen = async (id) => {
    try {
      const res = await deleteImagenRequest(id);
      if (res.status === 204)
        setImagenes(imagenes.filter((imagen) => imagen.id_imagen !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getImagen = async (id) => {
    try {
      const res = await getImagenRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateImagen = async (id, imagen) => {
    try {
      await updateImagenRequest(id, imagen);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <imagenesContext.Provider
      value={{
        imagenes,
        createImagen,
        getImagen,
        deleteImagen,
        getImagenes,
        updateImagen,
      }}
    >
      {children}
    </imagenesContext.Provider>
  );
}
