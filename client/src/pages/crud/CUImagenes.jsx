import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useImagenes } from "../../context/ImagenesContext";
import { useProductos } from "../../context/ProductosContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CUImagenes() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createImagen, getImagen, updateImagen } = useImagenes();
  const { productos, getProductos } = useProductos();
  const navigate = useNavigate();
  const params = useParams();
  const [imagenUrl, setImagenUrl] = useState("");
  const [idImagen, setIdImagen] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    async function loadImagen() {
      if (params.id) {
        const imagen = await getImagen(params.id);
        if (imagen) {
          setValue("id_producto", imagen.id_producto || "");
          setValue("id_imagen", imagen.id_imagen);
          setImagenUrl(imagen.imagen);
          setIdImagen(imagen.id_imagen);
          setSelectedProducto({
            value: imagen.id_producto,
            label: imagen.nombre_producto,
          });
        }
      }
    }
    async function loadProductos() {
      try {
        await getProductos();
      } catch (error) {
        console.error(error);
      }
    }
    loadProductos();
    loadImagen();
  }, [params.id, setValue, getProductos, getImagen]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
    setImagenUrl(URL.createObjectURL(file));
  };

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
    };

    try {
      if (params.id) {
        await updateImagen(params.id, dataValid);
      } else {
        await createImagen(dataValid);
      }

      const response = { status: 200 };

      if (response.status === 200) {
        navigate("/crud/imagenes");
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

        {idImagen !== null && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID de la imagen: {idImagen}
          </label>
        )}
        <Select
          {...register("id_producto", { required: true })}
          value={selectedProducto}
          onChange={(selectedOption) => {
            setSelectedProducto(selectedOption);
            setValue("id_producto", selectedOption.value);
          }}
          options={productos.map((producto) => ({
            value: producto.id_producto,
            label: producto.nombre,
          }))}
          isSearchable
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
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

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CUImagenes;
