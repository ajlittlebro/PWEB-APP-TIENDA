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
  const { createDesarrollador, getDesarrollador, updateDesarrollador } =
    useDesarrolladores();
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
        navigate("/crud/desarrolladores");
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
        {idDesarrollador !== null && (
          <label>ID del desarrollador: {idDesarrollador}</label>
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

export default CUDesarrolladores;
