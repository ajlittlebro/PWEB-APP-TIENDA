import React, { useEffect, useState } from "react";
import { useCarrito } from "../../context/CarritoContext";
import { Link } from "react-router-dom";

const CarritoPage = () => {
  const {
    carrito,
    getCarritoData,
    updateCarritoItem,
    deleteCarritoItem,
    clearCarritoData,
  } = useCarrito();

  useEffect(() => {
    getCarritoData();
  }, [getCarritoData]);

  const handleUpdateCarritoItem = async (id_producto, nuevaCantidad) => {
    await updateCarritoItem(id_producto, nuevaCantidad);
  };

  const handleDeleteCarritoItem = async (id_producto) => {
    await deleteCarritoItem(id_producto);
  };

  const handleClearCarrito = async () => {
    await clearCarritoData();
  };

  const calcularPrecioTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  return (
    <div>
      <div class="bg-gray-800 p-4">
    <nav class="container mx-auto px-6 py-4">
        <ul class="flex space-x-8">
            <li>
                <a href="/tienda/noticias" class="text-white hover:text-gray-300">Noticias</a>
            </li>
            <li>
                <a href="/tienda/catalogo" class="text-white hover:text-gray-300">Catálogo</a>
            </li>
            <li>
                <a href="/tienda/wishlist" class="text-white hover:text-gray-300">Wishlist</a>
            </li>
            <li>
                <a href="/tienda/carrito" class="text-white hover:text-gray-300">Carrito</a>
            </li>
        </ul>
    </nav>
</div>
      <div className="p-4">
      
      <h1 className="text-4xl font-bold mb-6 text-purple-500">Carrito</h1>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((producto) => (
            <div key={producto.id_producto} className="mb-4 p-4 border border-gray-300 rounded">
              {producto.imagen && (
                <img src={producto.imagen} alt="Imagen del producto" className="w-24 h-24 object-cover mb-2 rounded" />
              )}
              <h2 className="text-xl font-bold mb-2 text-white">${producto.precio}</h2>
              <p className="text-white mb-2">{producto.nombre}</p>
              <p className="text-white mb-2">{producto.nombre_plataforma}</p>
              <p className="text-white mb-2">Cantidad: {producto.cantidad}</p>
              <div className="mb-2 flex items-center">
                <label className="mr-2 text-white">Cantidad:</label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleUpdateCarritoItem(producto.id_producto, producto.cantidad + 1)}
                    className="bg-purple-500 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <span className="text-white mx-2">{producto.cantidad}</span>
                  <button
                    onClick={() => handleUpdateCarritoItem(producto.id_producto, producto.cantidad - 1)}
                    disabled={producto.cantidad <= 1}
                    className={`bg-purple-500 text-white px-2 py-1 rounded ${producto.cantidad <= 1 && 'opacity-50 cursor-not-allowed'}`}
                  >
                    -
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleDeleteCarritoItem(producto.id_producto)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Eliminar del Carrito
              </button>
            </div>
          ))}
          <div className="mb-4 p-4 border border-gray-300 rounded">
            <p className="text-white font-semibold mb-2">Precio Total: ${calcularPrecioTotal()}</p>
            <Link to={"/tienda/catalogo"}>
              <button
                onClick={handleClearCarrito}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Vaciar Carrito
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default CarritoPage;
