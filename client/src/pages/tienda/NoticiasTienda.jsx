import React, { useEffect, useState } from "react";
import { getNoticiasRequest } from "../../api/noticias";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function NoticiasTienda() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    async function loadNoticias() {
      const response = await getNoticiasRequest();
      setNoticias(response.data);
    }
    loadNoticias();
  }, []);

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
<h1 className="text-4xl font-bold mb-6 text-purple-500">Noticias</h1>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {noticias.map((noticia) => (
        <div key={noticia.id_noticia} className="mb-4 p-4  rounded-lg">
          {noticia.imagen && (
            <img src={noticia.imagen} alt="Imagen" className="w-full h-32 object-cover mb-2 rounded-lg" />
          )}
          <h2 className="text-white font-bold mb-2">{noticia.titulo}</h2>
          <p className="text-white mb-2">{noticia.descripcion}</p>
          <p className="text-white mb-2">Por: {noticia.nombre_usuario}</p>
          <span className="text-white block mb-2">{dayjs(noticia.creadaEn).format("MMM D, YYYY")}</span>
        </div>
      ))}
    </div>
    </div>
  );
}

export default NoticiasTienda;
