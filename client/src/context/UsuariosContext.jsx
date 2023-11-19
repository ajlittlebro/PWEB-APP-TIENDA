import { createContext, useContext, useState } from "react";
import {
  createUsuarioRequest,
  getUsuarioRequest,
  deleteUsuarioRequest,
  getUsuariosRequest,
  updateUsuarioRequest,
} from "../api/usuarios.js";

const usuariosContext = createContext();

export const useUsuarios = () => {
  const context = useContext(usuariosContext);

  if (!context) {
    throw new Error("useUsuarios must be used within a UsuarioProvider");
  }

  return context;
};

export function UsuarioProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getUsuarios = async () => {
    try {
      if (!dataLoaded) {
        const res = await getUsuariosRequest();
        setUsuarios(res.data);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createUsuario = async (usuario) => {
    const res = await createUsuarioRequest(usuario);
    console.log(res);
  };

  const deleteUsuario = async (id) => {
    try {
      const res = await deleteUsuarioRequest(id);
      if (res.status === 204)
        setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getUsuario = async (id) => {
    try {
      const res = await getUsuarioRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUsuario = async (id, usuario) => {
    try {
      await updateUsuarioRequest(id, usuario);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <usuariosContext.Provider
      value={{
        usuarios,
        createUsuario,
        getUsuario,
        deleteUsuario,
        getUsuarios,
        updateUsuario,
        setDataLoaded
      }}
    >
      {children}
    </usuariosContext.Provider>
  );
}
