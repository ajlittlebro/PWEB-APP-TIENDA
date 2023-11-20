import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, getWishlistData, deleteWishlistItem, clearWishlist, addProductoToCarrito } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    getWishlistData();
  }, [getWishlistData]);

  const handleDeleteFromWishlist = (productoId) => {
    deleteWishlistItem(productoId);
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  const handleAddToCarrito = (productoId) => {
    addProductoToCarrito(productoId);
    handleDeleteFromWishlist(productoId);
  };

  const handleAddAllToCarrito = () => {
    wishlist.forEach((producto) => {
      addProductoToCarrito(producto.id_producto);
    });

    clearWishlist();
  };

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Tu wishlist está vacía.</p>
      ) : (
        <div>
          <Link to={"/tienda/catalogo"}>
            <button onClick={handleClearWishlist}>
              Borrar Todo de la Wishlist
            </button>
          </Link>
          {wishlist.map((producto) => (
            <div key={producto.id_producto}>
              {producto.imagen && <img src={producto.imagen} alt="Imagen" />}
              <h2>{producto.precio}</h2>
              <p>{producto.nombre}</p>
              <p>{producto.plataforma}</p>
              <button onClick={() => handleDeleteFromWishlist(producto.id_producto)}>
                Borrar de la Wishlist
              </button>
              <button onClick={() => handleAddToCarrito(producto.id_producto)}>
                Agregar al Carrito
              </button>
            </div>
          ))}
          <Link to={"/tienda/carrito"}>
          <button onClick={handleAddAllToCarrito}>
            Agregar Todos al Carrito
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
