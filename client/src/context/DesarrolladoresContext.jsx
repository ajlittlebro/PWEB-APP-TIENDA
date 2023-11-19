import { createContext, useContext, useState } from "react";
import {
  createDesarrolladorRequest,
  getDesarrolladorRequest,
  deleteDesarrolladorRequest,
  getDesarrolladoresRequest,
  updateDesarrolladorRequest,
} from "../api/desarrolladores.js";

const desarrolladoresContext = createContext();

export const useDesarrolladores = () => {
  const context = useContext(desarrolladoresContext);

  if (!context) {
    throw new Error(
      "useDesarrolladores must be used within a DesarrolladorProvider"
    );
  }

  return context;
};

export function DesarrolladorProvider({ children }) {
  const [desarrolladores, setDesarrolladores] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); 



  const getDesarrolladores = async () => {
    try {
      if (!dataLoaded) { 
        const res = await getDesarrolladoresRequest();
        setDesarrolladores(res.data);
        setDataLoaded(true); 
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createDesarrollador = async (desarrollador) => {
    const res = await createDesarrolladorRequest(desarrollador);
    console.log(res);
  };

  const deleteDesarrollador = async (id) => {
    try {
      const res = await deleteDesarrolladorRequest(id);
      if (res.status === 204)
        setDesarrolladores(
          desarrolladores.filter(
            (desarrollador) => desarrollador.id_desarrollador !== id
          )
        );
    } catch (error) {
      console.error(error);
    }
  };

  const getDesarrollador = async (id) => {
    try {
      const res = await getDesarrolladorRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateDesarrollador = async (id, desarrollador) => {
    try {
      await updateDesarrolladorRequest(id, desarrollador);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <desarrolladoresContext.Provider
      value={{
        setDataLoaded,
        desarrolladores,
        createDesarrollador,
        getDesarrollador,
        deleteDesarrollador,
        getDesarrolladores,
        updateDesarrollador,
      }}
    >
      {children}
    </desarrolladoresContext.Provider>
  );
}
