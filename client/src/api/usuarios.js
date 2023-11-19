import axios from "./axios.js";

export const getUsuariosRequest = () => axios.get("/crud/usuarios");

export const getUsuarioRequest = (id) => axios.get("/crud/usuarios/" + id);

export const createUsuarioRequest = (usuario) => {
  const form = new FormData();

  for (let key in usuario) {
    form.append(key, usuario[key]);
  }

  return axios.post("/crud/usuarios", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateUsuarioRequest = (id, usuario) => {
  const form = new FormData();

  form.append("nombre", usuario.nombre);
  form.append("correo", usuario.correo);
  form.append("contrasena", usuario.contrasena);
  form.append("id_rol", usuario.id_rol);

  return axios.put("/crud/usuarios/" + id, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUsuarioRequest = (id) =>
  axios.delete("/crud/usuarios/" + id);
