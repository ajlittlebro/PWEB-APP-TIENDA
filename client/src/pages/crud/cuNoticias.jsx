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
  const [imagenUrl, setImagenUrl] = useState(""); // Estado para almacenar la URL de la imagen
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
    setImagenUrl(URL.createObjectURL(file)); // Update the image URL state
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
    <div>
      <form onSubmit={onSubmit}>
        {/* Mostrar la imagen si hay una URL */}
        {imagenUrl && <img src={imagenUrl} alt="Imagen" />}

        {/* Mostrar el ID de la noticia si no es null */}
        {idNoticia !== null && <label>ID de la Noticia: {idNoticia}</label>}

        {/* Mostrar el Nombre de Usuario si no es null */}
        {nombreUsuario !== null && (
          <label>Nombre de Usuario: {nombreUsuario}</label>
        )}
        <input
          type="text"
          placeholder="Titulo"
          {...register("titulo", { required: true })}
          autoFocus
        />
        {errors.titulo && <p>Título es requerido</p>}
        <textarea
          rows="3"
          placeholder="Descripción"
          {...register("descripcion", { required: true })}
        ></textarea>
        {errors.descripcion && <p>Descripción es requerida</p>}
        <input type="file" onChange={onFileChange} />
        {errors.imagen && <p>Imagen es requerida</p>}
        <input
          type="date"
          placeholder="Fecha"
          {...register("fecha", { required: true })}
        />
        {errors.fecha && <p>Fecha es requerida</p>}
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default CUNoticias;
