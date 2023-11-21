import React, { useEffect, useState } from "react";
import { useProductos } from "../../context/ProductosContext";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function ProductoDetalle() {
  const { id } = useParams();
  const { getProducto } = useProductos();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const productoData = await getProducto(id);
        setProducto(productoData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error al cargar el producto.");
        setLoading(false);
      }
    };

    fetchProducto();
  }, [getProducto, id]);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : producto ? (
        <div>
          <h1>{producto.nombre}</h1>
          <p>Plataforma: {producto.nombre_plataforma}</p>
          <p>Descripción: {producto.descripcion}</p>
          <p>Fecha de Lanzamiento: {dayjs(producto.fecha_lanzamiento).format("DD/MM/YYYY")}</p>
          <p>Editora: {producto.nombre_editora}</p>
          <p>Desarrollador: {producto.nombre_desarrollador}</p>
          <p>Precio: {producto.precio}</p>
          {producto.imagen && <img src={producto.imagen} alt="Imagen del producto" />}
        </div>
      ) : (
        <p>No se encontró el producto.</p>
      )}
    </div>
  );
}

export default ProductoDetalle;
