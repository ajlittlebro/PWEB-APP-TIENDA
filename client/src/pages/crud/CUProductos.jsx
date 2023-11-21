import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useDesarrolladores } from "../../context/DesarrolladoresContext";
import { useEditoras } from "../../context/EditorasContext";
import { useProductos } from "../../context/ProductosContext";
import { usePlataformas } from "../../context/PlataformasContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CUProductos() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createProducto, getProducto, updateProducto, setDataLoaded } =
    useProductos();
  const { plataformas, getPlataformas } = usePlataformas();
  const { editoras, getEditoras } = useEditoras();
  const { desarrolladores, getDesarrolladores } = useDesarrolladores();
  const navigate = useNavigate();
  const params = useParams();
  const [imagenUrl, setImagenUrl] = useState("");
  const [idProducto, setIdProducto] = useState(null);
  const [selectedPlataforma, setSelectedPlataforma] = useState(null);
  const [selectedDesarrollador, setSelectedDesarrollador] = useState(null);
  const [selectedEditora, setSelectedEditora] = useState(null);

  useEffect(() => {
    async function loadProducto() {
      if (params.id) {
        const producto = await getProducto(params.id);
        const formattedFecha = dayjs(
          producto.fecha_lanzamiento,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
        if (producto) {
          setValue("id_plataforma", producto.id_plataforma || "");
          setValue("id_editora", producto.id_editora || "");
          setValue("id_desarrollador", producto.id_desarrollador || "");
          setValue("id_producto", producto.id_producto);
          setValue("nombre", producto.nombre);
          setValue("descripcion", producto.descripcion);
          setValue("existencia", producto.existencia);
          setValue("precio", producto.precio);
          setValue("fecha_lanzamiento", formattedFecha);
          setIdProducto(producto.id_producto);
          setImagenUrl(producto.imagen);
          setSelectedPlataforma({
            value: producto.id_plataforma,
            label: producto.nombre_plataforma,
          });
          setSelectedDesarrollador({
            value: producto.id_desarrollador,
            label: producto.nombre_desarrollador,
          });
          setSelectedEditora({
            value: producto.id_editora,
            label: producto.nombre_editora,
          });
        }
      }
    }
    async function loadPlataformas() {
      try {
        await getPlataformas();
      } catch (error) {
        console.error(error);
      }
    }
    async function loadDesarrolladores() {
      try {
        await getDesarrolladores();
      } catch (error) {
        console.error(error);
      }
    }
    async function loadEditoras() {
      try {
        await getEditoras();
      } catch (error) {
        console.error(error);
      }
    }
    loadProducto();
    loadPlataformas();
    loadDesarrolladores();
    loadEditoras();
  }, [
    params.id,
    setValue,
    getPlataformas,
    getProducto,
    getEditoras,
    getDesarrolladores,
  ]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
    setImagenUrl(URL.createObjectURL(file));
  };

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
      fecha_lanzamiento: data.fecha_lanzamiento
        ? dayjs(data.fecha_lanzamiento, "DD/MM/YYYY").format("YYYY/MM/DD")
        : dayjs.utc().format("YYYY/MM/DD"),
    };

    try {
      if (params.id) {
        await updateProducto(params.id, dataValid);
      } else {
        await createProducto(dataValid);
      }

      const response = { status: 200 };

      if (response.status === 200) {
        setDataLoaded(false);
        navigate("/crud/productos");
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

        {idProducto !== null && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID del producto: {idProducto}
          </label>
        )}
        <h3 className="block text-gray-700 text-sm font-bold mb-2">
          Plataforma
        </h3>
        <Select
          {...register("id_plataforma", { required: true })}
          value={selectedPlataforma}
          onChange={(selectedOption) => {
            setSelectedPlataforma(selectedOption);
            setValue("id_plataforma", selectedOption.value);
          }}
          options={plataformas.map((plataforma) => ({
            value: plataforma.id_plataforma,
            label: plataforma.nombre,
          }))}
          isSearchable
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <h3 className="block text-gray-700 text-sm font-bold mb-2">
          Desarrollador
        </h3>
        <Select
          {...register("id_desarrollador", { required: true })}
          value={selectedDesarrollador}
          onChange={(selectedOption) => {
            setSelectedDesarrollador(selectedOption);
            setValue("id_desarrollador", selectedOption.value);
          }}
          options={desarrolladores.map((desarrollador) => ({
            value: desarrollador.id_desarrollador,
            label: desarrollador.nombre,
          }))}
          isSearchable
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <h3 className="block text-gray-700 text-sm font-bold mb-2">Editora</h3>
        <Select
          {...register("id_editora", { required: true })}
          value={selectedEditora}
          onChange={(selectedOption) => {
            setSelectedEditora(selectedOption);
            setValue("id_editora", selectedOption.value);
          }}
          options={editoras.map((editora) => ({
            value: editora.id_editora,
            label: editora.nombre,
          }))}
          isSearchable
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <h3 className="block text-gray-700 text-sm font-bold mb-2">Nombre</h3>
        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <h3 className="block text-gray-700 text-sm font-bold mb-2">Precio</h3>
        <input
          type="text"
          placeholder="Precio"
          {...register("precio", { required: true })}
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <h3 className="block text-gray-700 text-sm font-bold mb-2">
          Existencia
        </h3>
        <input
          type="text"
          placeholder="Existencia"
          {...register("existencia", { required: true })}
          autoFocus
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.nombre && <p>Nombre es requerido</p>}
        <h3 className="block text-gray-700 text-sm font-bold mb-2">
          Descripcion
        </h3>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="3"
          placeholder="Descripción"
          {...register("descripcion", { required: true })}
        ></textarea>
        {errors.descripcion && <p>Descripción es requerida</p>}
        <input
          type="file"
          onChange={onFileChange}
          className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-4"
        />
        {errors.imagen && <p>Imagen es requerida</p>}
        <input
          type="date"
          placeholder="Fecha de lanzamiento"
          {...register("fecha_lanzamiento", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.fecha && <p>Fecha de lanzamiento es requerida</p>}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CUProductos;
