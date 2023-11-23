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
      <h1 className="text-4xl font-bold mb-6 text-purple-500">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Tu wishlist está vacía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {wishlist.map((producto) => (
            <div key={producto.id_producto}
            className="bg-[#382c2c] rounded-lg shadow-md text-white">
              {producto.imagen && <img src={producto.imagen} alt="Imagen" className="w-full h-48 object-cover rounded-t-lg"/>}
              <h2 className="text-xl font-semibold mb-2">${producto.precio}</h2>
              <p className="text-gray-500">{producto.nombre}</p>
              <p className="text-gray-500">{producto.plataforma}</p>
              <button onClick={() => handleDeleteFromWishlist(producto.id_producto)} className="px-2 py-1 bg-white text-orange-500 rounded text-sm">
                Borrar de la Wishlist
              </button>
              <button onClick={() => handleAddToCarrito(producto.id_producto)} className="px-2 py-1 bg-orange-500 text-white rounded text-sm">
                Agregar al Carrito
              </button>
            </div>
          ))}
          
        </div>
        
      )}
      <div className="p-10">
      <Link to={"/tienda/carrito"}>
          <button onClick={handleAddAllToCarrito} className="px-4 py-2 bg-orange-500 text-white rounded text-lg">
            Agregar Todos al Carrito
          </button>
          </Link>
      <Link to={"/tienda/catalogo"}>
            <button onClick={handleClearWishlist} className="px-4 py-2 bg-white text-orange-500 rounded text-lg">
              Borrar Todo de la Wishlist
            </button>
          </Link>
      </div>
    </div>
  );
};

export default WishlistPage;
