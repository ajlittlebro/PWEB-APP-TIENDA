import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEditoras } from "../../context/EditorasContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CUEditoras() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createEditora, getEditora, updateEditora, setDataLoaded } =
    useEditoras();
  const navigate = useNavigate();
  const params = useParams();
  const [idEditora, setIdEditora] = useState(null);

  useEffect(() => {
    async function loadEditora() {
      if (params.id) {
        const editora = await getEditora(params.id);

        setValue("id_editora", editora.id_editora);
        setValue("nombre", editora.nombre);
        setIdEditora(editora.id_editora);
      }
    }
    loadEditora();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
    };

    try {
      if (params.id) {
        await updateEditora(params.id, dataValid);
      } else {
        await createEditora(dataValid);
      }

      const response = { status: 200 };

      if (response.status === 200) {
        setDataLoaded(false);
        navigate("/crud/editoras");
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
        {idEditora !== null && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID de la editora: {idEditora}
          </label>
        )}

        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

export default CUEditoras;
