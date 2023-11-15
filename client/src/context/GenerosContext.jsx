import { createContext, useContext, useState } from "react";
import {
  createGeneroRequest,
  getGenerosRequest,
  deleteGeneroRequest,
  getGeneroRequest,
  updateGeneroRequest,
} from "../api/generos.js";

const generosContext = createContext();

export const useGeneros = () => {
  const context = useContext(generosContext);

  if (!context) {
    throw new Error("useGeneros must be used within a GeneroProvider");
  }

  return context;
};

export function GeneroProvider({ children }) {
  const [generos, setGeneros] = useState([]);
  const getGeneros = async () => {
    try {
      const res = await getGenerosRequest();
      setGeneros(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const createGenero = async (genero) => {
    const res = await createGeneroRequest(genero);
    console.log(res);
  };

  const deleteGenero = async (id) => {
    try {
      const res = await deleteGeneroRequest(id);
      if (res.status === 204)
        setGeneros(generos.filter((genero) => genero.id_genero !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getGenero = async (id) => {
    try {
      const res = await getGeneroRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateGenero = async (id, genero) => {
    try {
      await updateGeneroRequest(id, genero);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <generosContext.Provider
      value={{
        generos,
        createGenero,
        getGeneros,
        deleteGenero,
        getGenero,
        updateGenero,
      }}
    >
      {children}
    </generosContext.Provider>
  );
}
