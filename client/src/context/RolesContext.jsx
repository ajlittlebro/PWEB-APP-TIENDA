import { createContext, useContext, useState } from "react";
import { getRolRequest, getRolesRequest } from "../api/roles.js";

const rolesContext = createContext();

export const useRoles = () => {
  const context = useContext(rolesContext);

  if (!context) {
    throw new Error("useRoles must be used within a RolProvider");
  }

  return context;
};

export function RolProvider({ children }) {
  const [roles, setRoles] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getRoles = async () => {
    try {
      if (!dataLoaded) {
        const res = await getRolesRequest();
        setRoles(res.data);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRol = async (id) => {
    try {
      const res = await getRolRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <rolesContext.Provider
      value={{
        roles,
        getRol,
        getRoles,
        setDataLoaded
      }}
    >
      {children}
    </rolesContext.Provider>
  );
}
