import axios from "./axios.js";

export const getEditorasRequest = () => axios.get("/crud/editoras");

export const getEditoraRequest = (id) => axios.get("/crud/editoras/" + id);

export const createEditoraRequest = (editora) => {
  return axios.post("/crud/editoras", editora);
};

export const updateEditoraRequest = (id, editora) => {
  return axios.put("/crud/editoras/" + id, editora);
};

export const deleteEditoraRequest = (id) =>
  axios.delete("/crud/editoras/" + id);