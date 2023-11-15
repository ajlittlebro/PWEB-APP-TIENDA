import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGeneros } from "../../context/GenerosContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CUGeneros() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createGenero, getGenero, updateGenero } = useGeneros();
  const navigate = useNavigate();
  const params = useParams();
  const [idGenero, setIdGenero] = useState(null);

  useEffect(() => {
    async function loadGenero() {
      if (params.id) {
        const genero = await getGenero(params.id);
        
        setValue("id_genero", genero.id_genero);
        setValue("nombre", genero.nombre);
        setIdGenero(genero.id_genero);
        
      }
    }
    loadGenero();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
        ...data}
    

    try {
      if (params.id) {
        await updateGenero(params.id,dataValid);
      } else {
        await createGenero(dataValid);
      }

      const response = { status: 200 };

      if (response.status === 200) {
        navigate("/crud/generos");
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
        {idGenero !== null && <label>ID del género: {idGenero}</label>}

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

export default CUGeneros;
