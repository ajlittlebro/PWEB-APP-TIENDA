import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDesarrolladores } from "../../context/DesarrolladoresContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CUDesarrolladores() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    createDesarrollador,
    getDesarrollador,
    updateDesarrollador,
    setDataLoaded,
  } = useDesarrolladores();
  const navigate = useNavigate();
  const params = useParams();
  const [idDesarrollador, setIdDesarrollador] = useState(null);

  useEffect(() => {
    async function loadDesarrollador() {
      if (params.id) {
        const desarrollador = await getDesarrollador(params.id);

        setValue("id_desarrollador", desarrollador.id_desarrollador);
        setValue("nombre", desarrollador.nombre);
        setIdDesarrollador(desarrollador.id_desarrollador);
      }
    }
    loadDesarrollador();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
    };

    try {
      if (params.id) {
        await updateDesarrollador(params.id, dataValid);
      } else {
        await createDesarrollador(dataValid);
      }

      const response = { status: 200 };

      if (response.status === 200) {
        setDataLoaded(false);
        navigate("/crud/desarrolladores");
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
        {idDesarrollador !== null && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID del desarrollador: {idDesarrollador}
          </label>
        )}

        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          autoFocus
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs italic">Nombre es requerido</p>
        )}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CUDesarrolladores;
