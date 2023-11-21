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
  const { createUsuario, getUsuario, updateUsuario, setDataLoaded } =
    useUsuarios();
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
          setIdUsuario(usuario.id_usuario);
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
    loadUsuario();
  }, [params.id, setValue, getRoles, getUsuario]);

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
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {idUsuario !== null && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID de usuario: {idUsuario}
          </label>
        )}
        <h3 className="block text-gray-700 text-sm font-bold mb-2">Rol</h3>
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
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <h3 className="block text-gray-700 text-sm font-bold mb-2">Nombre</h3>
        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <h3 className="block text-gray-700 text-sm font-bold mb-2">Correo</h3>
        <input
          type="text"
          placeholder="Correo"
          {...register("correo", { required: true })}
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <h3 className="block text-gray-700 text-sm font-bold mb-2">
          Contraseña
        </h3>
        <input
          type="text"
          placeholder="Contrasena"
          {...register("contrasena", { required: true })}
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.nombre && <p>Nombre es requerido</p>}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CUUsuarios;
