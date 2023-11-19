import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useUsuarios } from "../../context/UsuariosContext";
import { useRoles } from "../../context/RolesContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CUUsuarios() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createUsuario, getUsuario, updateUsuario,  setDataLoaded } = useUsuarios();
  const { roles, getRoles } = useRoles();
  const navigate = useNavigate();
  const params = useParams();
  const [idUsuario, setIdUsuario] = useState(null);
  const [selectedRol, setSelectedRol] = useState(null);

  useEffect(() => {
    async function loadUsuario() {
      if (params.id) {
        const usuario = await getUsuario(params.id);
        if (usuario) {
          setValue("id_rol", usuario.id_rol || "");
          setValue("id_usuario", usuario.id_usuario);
          setValue("nombre", usuario.nombre);
          setValue("correo", usuario.correo);
          setValue("contrasena", usuario.contrasena);
          setIdUsuario(usuario.id_usuario)
          setSelectedRol({
            value: usuario.id_rol,
            label: usuario.rol,
          });
        }
      }
    }


    async function loadRoles() {
      try {
       
        await getRoles();
      } catch (error) {
        console.error(error);
      }
    }
    loadRoles();
    loadUsuario()
  }, [
    params.id,
    setValue,
    getRoles,
    getUsuario,
  ]);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
    };

    try {
      if (params.id) {
        setDataLoaded(false);
        await updateUsuario(params.id, dataValid);
      } else {
        await createUsuario(dataValid);
      }

      const response = { status: 200 };

      if (response.status === 200) {
        navigate("/crud/usuarios");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit}>

        {idUsuario !== null && <label>ID de usuario: {idUsuario}</label>}
        <Select
          {...register("id_rol", { required: true })}
          value={selectedRol}
          onChange={(selectedOption) => {
            setSelectedRol(selectedOption);
            setValue("id_rol", selectedOption.value);
          }}
          options={roles.map((rol) => ({
            value: rol.id_rol,
            label: rol.rol,
          }))}
          isSearchable
        />

        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          autoFocus
        />
        <input
          type="text"
          placeholder="Correo"
          {...register("correo", { required: true })}
          autoFocus
        />
        <input
          type="text"
          placeholder="Contrasena"
          {...register("contrasena", { required: true })}
          autoFocus
        />
        {errors.nombre && <p>Nombre es requerido</p>}
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default CUUsuarios;
