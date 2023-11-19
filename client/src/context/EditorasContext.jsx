import { createContext, useContext, useState } from "react";
import {
  createEditoraRequest,
  getEditoraRequest,
  deleteEditoraRequest,
  getEditorasRequest,
  updateEditoraRequest,
} from "../api/editoras.js";

const editorasContext = createContext();

export const useEditoras = () => {
  const context = useContext(editorasContext);

  if (!context) {
    throw new Error("useEditoras must be used within a EditoraProvider");
  }

  return context;
};

export function EditoraProvider({ children }) {
  const [editoras, setEditoras] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); 

  const getEditoras = async () => {
    try {
      if (!dataLoaded) { 
        const res = await getEditorasRequest();
        setEditoras(res.data);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createEditora = async (editora) => {
    const res = await createEditoraRequest(editora);
    console.log(res);
  };

  const deleteEditora = async (id) => {
    try {
      const res = await deleteEditoraRequest(id);
      if (res.status === 204)
        setEditoras(editoras.filter((editora) => editora.id_editora !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getEditora = async (id) => {
    try {
      const res = await getEditoraRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEditora = async (id, editora) => {
    try {
      await updateEditoraRequest(id, editora);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <editorasContext.Provider
      value={{
        editoras,
        createEditora,
        getEditoras,
        deleteEditora,
        getEditora,
        updateEditora,
      }}
    >
      {children}
    </editorasContext.Provider>
  );
}
