import { createContext, useContext, useState } from "react";
import {
  createPlataformaRequest,
  getPlataformasRequest,
  deletePlataformaRequest,
  getPlataformaRequest,
  updatePlataformaRequest,
} from "../api/plataformas.js";

const plataformasContext = createContext();

export const usePlataformas = () => {
  const context = useContext(plataformasContext);

  if (!context) {
    throw new Error("usePlataformas must be used within a PlataformaProvider");
  }

  return context;
};

export function PlataformaProvider({ children }) {
  const [plataformas, setPlataformas] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getPlataformas = async () => {
    try {
      if (!dataLoaded) { 
        const res = await getPlataformasRequest();
        setPlataformas(res.data);
        setDataLoaded(true); 
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createPlataforma = async (plataforma) => {
    const res = await createPlataformaRequest(plataforma);
    console.log(res);
  };

  const deletePlataforma = async (id) => {
    try {
      const res = await deletePlataformaRequest(id);
      if (res.status === 204)
        setPlataformas(plataformas.filter((plataforma) => plataforma.id_plataforma !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getPlataforma = async (id) => {
    try {
      const res = await getPlataformaRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePlataforma = async (id, plataforma) => {
    try {
      await updatePlataformaRequest(id, plataforma);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <plataformasContext.Provider
      value={{
        plataformas,
        createPlataforma,
        getPlataformas,
        deletePlataforma,
        getPlataforma,
        updatePlataforma,
      }}
    >
      {children}
    </plataformasContext.Provider>
  );
}
