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
  const { createProducto, getProducto, updateProducto } = useProductos();
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
        navigate("/crud/productos");
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
        {imagenUrl && <img src={imagenUrl} alt="Imagen" />}

        {idProducto !== null && <label>ID del producto: {idProducto}</label>}
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
        />

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
        />
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
        />

        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          autoFocus
        />
        <input
          type="text"
          placeholder="Precio"
          {...register("precio", { required: true })}
          autoFocus
        />
        <input
          type="text"
          placeholder="Existencia"
          {...register("existencia", { required: true })}
          autoFocus
        />
        {errors.nombre && <p>Nombre es requerido</p>}
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
          placeholder="Fecha de lanzamiento"
          {...register("fecha_lanzamiento", { required: true })}
        />
        {errors.fecha && <p>Fecha de lanzamiento es requerida</p>}
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default CUProductos;
