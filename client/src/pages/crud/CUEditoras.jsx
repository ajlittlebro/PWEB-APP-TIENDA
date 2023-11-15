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
  const { createEditora, getEditora, updateEditora } = useEditoras();
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
        navigate("/crud/editoras");
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
        {idEditora !== null && <label>ID de la editora: {idEditora}</label>}

        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          autoFocus
        />
        {errors.nombre && <p>Nombre es requerido</p>}
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default CUEditoras;
