import React, { useEffect, useState } from "react";
import { getProductosRequest } from "../../api/productos";
import { usePlataformas } from "../../context/PlataformasContext";
import { useGeneros } from "../../context/GenerosContext";
import { useProductosGeneros } from "../../context/ProductosGenerosContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCarrito } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import "../../css/Tienda.css";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [filtroPrecioMin, setFiltroPrecioMin] = useState("");
  const [filtroPrecioMax, setFiltroPrecioMax] = useState("");
  const [filtroPlataformas, setFiltroPlataformas] = useState([]);
  const [filtroGeneros, setFiltroGeneros] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroNombrePlataforma, setFiltroNombrePlataforma] = useState("");
  const [ordenSeleccionado, setOrdenSeleccionado] = useState("fechaReciente");
  const { plataformas, getPlataformas } = usePlataformas();
  const { generos, getGeneros } = useGeneros();
  const { getProductosGeneros, productosGeneros } = useProductosGeneros();
  const [filtroNombreGenero, setFiltroNombreGenero] = useState("");
  const { addToWishlistItem } = useWishlist();
  const { addToCarritoItem } = useCarrito();

  useEffect(() => {
    async function loadProductos() {
      const response = await getProductosRequest();
      setProductos(response.data);
    }

    async function loadPlataformas() {
      try {
        await getPlataformas();
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

    async function loadProductosGeneros() {
      try {
        await getProductosGeneros();
      } catch (error) {
        console.error(error);
      }
    }

    loadProductos();
    loadPlataformas();
    loadGeneros();
    loadProductosGeneros();
  }, [getPlataformas, getGeneros, getProductosGeneros]);

  const handlePrecioMinChange = (e) => {
    setFiltroPrecioMin(e.target.value);
  };

  const handlePrecioMaxChange = (e) => {
    setFiltroPrecioMax(e.target.value);
  };

  const handlePlataformaChange = (plataformaId) => {
    const updatedFiltros = [...filtroPlataformas];

    if (updatedFiltros.includes(plataformaId)) {
      updatedFiltros.splice(updatedFiltros.indexOf(plataformaId), 1);
    } else {
      updatedFiltros.push(plataformaId);
    }

    setFiltroPlataformas(updatedFiltros);
  };

  const handleGeneroChange = (generoId) => {
    const updatedFiltros = [...filtroGeneros];

    if (updatedFiltros.includes(generoId)) {
      updatedFiltros.splice(updatedFiltros.indexOf(generoId), 1);
    } else {
      updatedFiltros.push(generoId);
    }

    setFiltroGeneros(updatedFiltros);
  };

  const handleNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  };

  const handleNombrePlataformaChange = (e) => {
    setFiltroNombrePlataforma(e.target.value);
  };

  const handleNombreGeneroChange = (e) => {
    setFiltroNombreGenero(e.target.value);
  };

  const handleOrdenChange = (e) => {
    setOrdenSeleccionado(e.target.value);
  };

  const handleRestablecerFiltros = () => {
    setFiltroPrecioMin("");
    setFiltroPrecioMax("");
    setFiltroPlataformas([]);
    setFiltroGeneros([]);
    setFiltroNombre("");
    setFiltroNombrePlataforma("");
    setFiltroNombreGenero("");
    setOrdenSeleccionado("fechaReciente");
  };

  const handleAddToWishlist = (productoId) => {
    addToWishlistItem(productoId);
  };

  const ordenarProductos = (productos) => {
    switch (ordenSeleccionado) {
      case "precioAsc":
        return productos.slice().sort((a, b) => a.precio - b.precio);
      case "precioDesc":
        return productos.slice().sort((a, b) => b.precio - a.precio);
      case "fechaReciente":
        return productos
          .slice()
          .sort(
            (a, b) =>
              new Date(b.fecha_lanzamiento) - new Date(a.fecha_lanzamiento)
          );
      case "fechaAntigua":
        return productos
          .slice()
          .sort(
            (a, b) =>
              new Date(a.fecha_lanzamiento) - new Date(b.fecha_lanzamiento)
          );
      case "nombreAZ":
        return productos
          .slice()
          .sort((a, b) => a.nombre.localeCompare(b.nombre));
      case "nombreZA":
        return productos
          .slice()
          .sort((a, b) => b.nombre.localeCompare(a.nombre));
      default:
        return productos;
    }
  };

  const filtrarProductos = () => {
    const productosOrdenados = ordenarProductos(productos);

    return productosOrdenados.filter((producto) => {
      const precioMinCondicion =
        filtroPrecioMin === "" ||
        producto.precio >= parseFloat(filtroPrecioMin);

      const precioMaxCondicion =
        filtroPrecioMax === "" ||
        producto.precio <= parseFloat(filtroPrecioMax);

      const plataformaCondicion =
        filtroPlataformas.length === 0 ||
        filtroPlataformas.includes(producto.id_plataforma);

      const nombreCondicion =
        filtroNombre === "" ||
        producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase());

      const nombrePlataformaCondicion =
        filtroNombrePlataforma === "" ||
        producto.nombre_plataforma
          .toLowerCase()
          .includes(filtroNombrePlataforma.toLowerCase());

      const generoCondicion =
        filtroGeneros.length === 0 ||
        productosGeneros
          .filter((pg) => pg.id_producto === producto.id_producto)
          .some((pg) => filtroGeneros.includes(pg.id_genero));

      const nombreGeneroCondicion =
        filtroNombreGenero === "" ||
        productosGeneros
          .filter((pg) => pg.id_producto === producto.id_producto)
          .some((pg) =>
            generos
              .find((genero) => genero.id_genero === pg.id_genero)
              ?.nombre.toLowerCase()
              .includes(filtroNombreGenero.toLowerCase())
          );

      return (
        generoCondicion &&
        precioMinCondicion &&
        precioMaxCondicion &&
        plataformaCondicion &&
        nombreCondicion &&
        nombrePlataformaCondicion &&
        nombreGeneroCondicion
      );
    });
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
      <h1 className="text-4xl font-bold mb-6 text-purple-500">Catálogo</h1>

      <div className="flex">
        <div className="flex ">
          <div className="bg-purple-500 p-4 mr-5 rounded border-white w-[230px] h-[950px]">
            <div className="mb-4">
              <label className="text-white">Nombre de producto:</label>
              <input
                type="text"
                value={filtroNombre}
                onChange={handleNombreChange}
                className="rounded border-white p-2"
              />
            </div>
            <div className="mb-4">
              <label className="text-white">Precio mínimo:</label>
              <input
                type="text"
                value={filtroPrecioMin}
                onChange={handlePrecioMinChange}
                className="rounded border-white p-2"
              />
            </div>
            <div className="mb-4">
              <label className="text-white">Precio máximo:</label>
              <input
                type="text"
                value={filtroPrecioMax}
                onChange={handlePrecioMaxChange}
                className="rounded border-white p-2"
              />
            </div>
            <div className="mb-4">
              <label className="text-white">Nombre de plataforma:</label>
              <input
                type="text"
                value={filtroNombrePlataforma}
                onChange={handleNombrePlataformaChange}
                className="rounded border-white p-2"
              />
            </div>
            <div className="mb-4">
              <label className="text-white">Plataformas:</label>

              {plataformas.map((plataforma) => (
                <div
                  key={plataforma.id_plataforma}
                  className="flex items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id={plataforma.id_plataforma}
                    checked={filtroPlataformas.includes(
                      plataforma.id_plataforma
                    )}
                    onChange={() =>
                      handlePlataformaChange(plataforma.id_plataforma)
                    }
                    className="mr-2"
                  />
                  <label
                    htmlFor={plataforma.id_plataforma}
                    className="text-white"
                  >
                    {plataforma.nombre}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="text-white">Buscar por género:</label>
              <input
                type="text"
                value={filtroNombreGenero}
                onChange={handleNombreGeneroChange}
                className="rounded border-white p-2"
              />
            </div>
            <div className="mb-4">
              <label className="text-white">Géneros:</label>
              {generos.map((genero) => (
                <div key={genero.id_genero} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    id={genero.id_genero}
                    checked={filtroGeneros.includes(genero.id_genero)}
                    onChange={() => handleGeneroChange(genero.id_genero)}
                  />
                  <label htmlFor={genero.id_genero} className="text-white">
                    {genero.nombre}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="text-white">Ordenar por:</label>
              <select
                value={ordenSeleccionado}
                onChange={handleOrdenChange}
                className="rounded border-white p-2"
              >
                <option value="precioAsc">Precio: de bajo a alto</option>
                <option value="precioDesc">Precio: de alto a bajo</option>
                <option value="fechaReciente">Fecha: más reciente</option>
                <option value="fechaAntigua">Fecha: más antigua</option>
                <option value="nombreAZ">Nombre: A a la Z</option>
                <option value="nombreZA">Nombre: Z a la A</option>
              </select>
            </div>
            <div>
              <button
                onClick={handleRestablecerFiltros}
                className="border-white bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
              >
                Restablecer Filtros
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtrarProductos().map((producto) => (
            <div
              key={producto.id_producto}
              className="bg-[#382c2c] rounded-lg shadow-md text-white"
            >
              <Link to={`/tienda/catalogo/producto/${producto.id_producto}`}>
                {producto.imagen && (
                  <img
                    src={producto.imagen}
                    alt="Imagen"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  ${producto.precio}
                </h2>
                <p className="text-gray-500">{producto.nombre}</p>
                <p className="text-gray-500">{producto.nombre_plataforma}</p>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => addToCarritoItem(producto.id_producto)}
                    className="px-2 py-1 bg-white text-orange-500 rounded text-sm"
                  >
                    Agregar al Carrito
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(producto.id_producto)}
                    className="px-2 py-1 bg-orange-500 text-white rounded text-sm"
                  >
                    Agregar a la Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalogo;
