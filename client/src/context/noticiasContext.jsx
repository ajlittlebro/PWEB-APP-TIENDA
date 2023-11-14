import { createContext, useContext, useState } from "react";
import {
  createNoticiaRequest,
  getNoticiasRequest,
  deleteNoticiaRequest,
  getNoticiaRequest,
  updateNoticiaRequest,
} from "../api/noticias.js";

const noticiasContext = createContext();

export const useNoticias = () => {
  const context = useContext(noticiasContext);

  if (!context) {
    throw new Error("useNoticias must be used within a NoticiaProvider");
  }

  return context;
};

export function NoticiaProvider({ children }) {
  const [noticias, setNoticias] = useState([]);
  const getNoticias = async () => {
    try {
      const res = await getNoticiasRequest();
      setNoticias(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const createNoticia = async (noticia) => {
    const res = await createNoticiaRequest(noticia);
    console.log(res);
  };

  const deleteNoticia = async (id) => {
    try {
      const res = await deleteNoticiaRequest(id);
      if (res.status === 204)
        setNoticias(noticias.filter((noticia) => noticia.id_noticia !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getNoticia = async (id) => {
    try {
      const res = await getNoticiaRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateNoticia = async (id, noticia) => {
    try {
      await updateNoticiaRequest(id, noticia);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <noticiasContext.Provider
      value={{
        noticias,
        createNoticia,
        getNoticias,
        deleteNoticia,
        getNoticia,
        updateNoticia,
      }}
    >
      {children}
    </noticiasContext.Provider>
  );
}
