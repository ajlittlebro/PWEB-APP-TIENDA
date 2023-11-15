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
  const { createPlataforma, getPlataforma, updatePlataforma } =
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
        navigate("/crud/plataformas");
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
        {idPlataforma !== null && (
          <label>ID de la plataforma: {idPlataforma}</label>
        )}

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

export default CUPlataformas;
