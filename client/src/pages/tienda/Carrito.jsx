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
      <h1>Carrito</h1>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((producto) => (
            <div key={producto.id_producto}>
              {producto.imagen && <img src={producto.imagen} alt="Imagen" />}
              <h2>{producto.precio}</h2>
              <p>{producto.nombre}</p>
              <p>{producto.nombre_plataforma}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <label>Cantidad:</label>
              <div>
                <button
                  onClick={() =>
                    handleUpdateCarritoItem(producto.id_producto, producto.cantidad + 1)
                  }
                >
                  +
                </button>
                <span>{producto.cantidad}</span>
                <button
                  onClick={() =>
                    handleUpdateCarritoItem(producto.id_producto, producto.cantidad - 1)
                  }
                  disabled={producto.cantidad <= 1}
                >
                  -
                </button>
              </div>
              <button onClick={() => handleDeleteCarritoItem(producto.id_producto)}>
                Eliminar del Carrito
              </button>
            </div>
          ))}
          <div>
            <p>Precio Total: ${calcularPrecioTotal()}</p>
            <Link to={"/tienda/catalogo"}>
              <button onClick={handleClearCarrito}>Vaciar Carrito</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoPage;
