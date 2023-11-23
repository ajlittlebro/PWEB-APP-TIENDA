import React, { useEffect, useState } from "react";
import { useProductos } from "../../context/ProductosContext";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useWishlist } from "../../context/WishlistContext";
import { useCarrito } from "../../context/CarritoContext";

dayjs.extend(utc);

function ProductoDetalle() {
  const { id } = useParams();
  const { getProducto } = useProductos();
  const { addToWishlistItem } = useWishlist();
  const { addToCarritoItem } = useCarrito();
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
      <div class="bg-gray-800 p-4">
    <nav class="container mx-auto px-6 py-4">
    <ul class="flex space-x-8">
            <li>
                <a href="/tienda/catalogo" class="text-white hover:text-gray-300">Catálogo</a>
            </li>
            <li>
                <a href="/tienda/sobrenosotros" class="text-white hover:text-gray-300">Sobre Nosotros</a>
            </li>
            <li>
                <a href="/tienda/noticias" class="text-white hover:text-gray-300">Noticias</a>
            </li>
            
            <li>
                <a href="/tienda/wishlist" class="text-white hover:text-gray-300">Wishlist</a>
            </li>
            <li>
                <a href="/tienda/carrito" class="text-white hover:text-gray-300">Carrito</a>
            </li>
            <li>
                <a href="/tienda/soporte" class="text-white hover:text-gray-300">Soporte</a>
            </li>
        </ul>
    </nav>
</div>
      <div className="rounded shadow p-6">
      {loading ? (
        <p className="text-lg font-semibold text-white">Cargando...</p>
      ) : error ? (
        <p className="text-lg font-semibold text-white">{error}</p>
      ) : producto ? (
        <div className="flex space-x-4">
          {producto.imagen && (
            <img
              className="w-64 h-64 object-cover rounded-md"
              src={producto.imagen}
              alt="Imagen del producto"
            />
          )}
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold text-white">{producto.nombre}</h1>
            <p className="text-lg text-white">Plataforma: {producto.nombre_plataforma}</p>
            <p className="text-lg text-white">Descripción: {producto.descripcion}</p>
            <p className="text-lg text-white">
              Fecha de Lanzamiento: {dayjs(producto.fecha_lanzamiento).format("DD/MM/YYYY")}
            </p>
            <p className="text-lg text-white">Editora: {producto.nombre_editora}</p>
            <p className="text-lg text-white">Desarrollador: {producto.nombre_desarrollador}</p>
            <p className="text-lg text-white">Precio: ${producto.precio}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => addToCarritoItem(producto.id_producto)}
                className="px-4 py-2 bg-white text-orange-500 rounded text-lg"
              >
                Agregar al Carrito
              </button>
              <button
                onClick={() => addToWishlistItem(producto.id_producto)}
                className="px-4 py-2 bg-orange-500 text-white rounded text-lg"
              >
                Agregar a la Wishlist
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg font-semibold text-white">No se encontró el producto.</p>
      )}
    </div>
    </div>
  );
}

export default ProductoDetalle;
