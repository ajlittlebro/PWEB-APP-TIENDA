import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePlataformas } from "../../context/PlataformasContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CUPlataformas() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createPlataforma, getPlataforma, updatePlataforma, setDataLoaded } =
    usePlataformas();
  const navigate = useNavigate();
  const params = useParams();
  const [idPlataforma, setIdPlataforma] = useState(null);

  useEffect(() => {
    async function loadPlataforma() {
      if (params.id) {
        const plataforma = await getPlataforma(params.id);

        setValue("id_plataforma", plataforma.id_plataforma);
        setValue("nombre", plataforma.nombre);
        setIdPlataforma(plataforma.id_plataforma);
      }
    }
    loadPlataforma();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
    };

    try {
      if (params.id) {
        await updatePlataforma(params.id, dataValid);
      } else {
        await createPlataforma(dataValid);
      }

      const response = { status: 200 };

      if (response.status === 200) {
        setDataLoaded(false);
        navigate("/crud/plataformas");
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
        {idPlataforma !== null && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID de la plataforma: {idPlataforma}
          </label>
        )}

        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.nombre && <p>Nombre es requerido</p>}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CUPlataformas;
