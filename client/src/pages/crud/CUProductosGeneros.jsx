import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useProductos } from "../../context/ProductosContext";
import { useProductosGeneros } from "../../context/ProductosGenerosContext";
import { useGeneros } from "../../context/GenerosContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CUProductosGeneros() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createProductoGenero, getProductoGenero } = useProductosGeneros();
  const { productos, getProductos } = useProductos();
  const { generos, getGeneros } = useGeneros();
  const navigate = useNavigate();
  const params = useParams();
  const [idProducto, setIdProducto] = useState(null);
  const [idGenero, setIdGenero] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [selectedGenero, setSelectedGenero] = useState(null);

  useEffect(() => {
    async function loadProductoGenero() {
      if (params.id) {
        const productogenero = await getProductoGenero(params.id);
        if (productogenero) {
          setValue("id_genero", productogenero.id_genero || "");
          setValue("id_producto", productogenero.id_producto);
          setIdProducto(productogenero.id_producto);
          setIdGenero(productogenero.id_genero);
          setSelectedGenero({
            value: productogenero.id_genero,
            label: productogenero.nombre_genero,
          });
          setSelectedProducto({
            value: productogenero.id_producto,
            label: productogenero.nombre_producto,
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
    async function loadGeneros() {
      try {
        await getGeneros();
      } catch (error) {
        console.error(error);
      }
    }
    loadProductos();
    loadGeneros();
    loadProductoGenero();
  }, [params.id, setValue, getProductos, getProductoGenero, getGeneros]);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
    };

    try {
      await createProductoGenero(dataValid);

      const response = { status: 200 };

      if (response.status === 200) {
        //setDataLoaded(false);
        navigate("/crud/productosgeneros");
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
        <h3 className="block text-gray-700 text-sm font-bold mb-2">Género</h3>
        <Select
          {...register("id_genero", { required: true })}
          value={selectedGenero}
          onChange={(selectedOption) => {
            setSelectedGenero(selectedOption);
            setValue("id_genero", selectedOption.value);
          }}
          options={generos.map((genero) => ({
            value: genero.id_genero,
            label: genero.nombre,
          }))}
          isSearchable
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <h3 className="block text-gray-700 text-sm font-bold mb-2">Producto</h3>
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CUProductosGeneros;
