import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNoticias } from "../../context/noticiasContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CUNoticias() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createNoticia, getNoticia, updateNoticia } = useNoticias();
  const navigate = useNavigate();
  const params = useParams();
  const [imagenUrl, setImagenUrl] = useState("");
  const [idNoticia, setIdNoticia] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState(null);

  useEffect(() => {
    async function loadNoticia() {
      if (params.id) {
        const noticia = await getNoticia(params.id);
        const formattedFecha = dayjs(noticia.fecha, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        );
        setValue("id_noticia", noticia.id_noticia);
        setValue("nombre_usuario", noticia.nombre_usuario);
        setValue("titulo", noticia.titulo);
        setIdNoticia(noticia.id_noticia);
        setNombreUsuario(noticia.nombre_usuario);
        setValue("descripcion", noticia.descripcion);
        setValue("fecha", formattedFecha);
        setImagenUrl(noticia.imagen);
      }
    }
    loadNoticia();
  }, [params.id, setValue]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
    setImagenUrl(URL.createObjectURL(file));
  };

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
      fecha: data.fecha
        ? dayjs(data.fecha, "DD/MM/YYYY").format("YYYY/MM/DD")
        : dayjs.utc().format("YYYY/MM/DD"),
    };

    try {
      if (params.id) {
        await updateNoticia(params.id, dataValid);
      } else {
        await createNoticia(dataValid);
      }

      const response = { status: 200 };

      if (response.status === 200) {
        navigate("/crud/noticias");
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
        {imagenUrl && <img src={imagenUrl} alt="Imagen" />}
        {idNoticia !== null && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID de la Noticia: {idNoticia}
          </label>
        )}
        {nombreUsuario !== null && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre de Usuario: {nombreUsuario}
          </label>
        )}
        <h3 className="block text-gray-700 text-sm font-bold mb-2">Título</h3>
        <input
          type="text"
          placeholder="Titulo"
          {...register("titulo", { required: true })}
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.titulo && <p>Título es requerido</p>}
        <h3 className="block text-gray-700 text-sm font-bold mb-2">
          Descripción
        </h3>
        <textarea
          rows="3"
          placeholder="Descripción"
          {...register("descripcion", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
        {errors.descripcion && <p>Descripción es requerida</p>}
        <input
          type="file"
          onChange={onFileChange}
          className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-4"
        />
        {errors.imagen && (
          <p className="text-red-500 text-xs italic mt-2">
            Imagen es requerida
          </p>
        )}
        <h3 className="block text-gray-700 text-sm font-bold mb-2">Fecha</h3>
        <input
          type="date"
          placeholder="Fecha"
          {...register("fecha", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.fecha && <p>Fecha es requerida</p>}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CUNoticias;
