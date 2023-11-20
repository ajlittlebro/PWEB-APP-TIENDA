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
      <h1>Noticias</h1>
      {noticias.map((noticia) => (
        <div key={noticia.id_noticia}>
          {noticia.imagen && <img src={noticia.imagen} alt="Imagen" />}
          <h2>{noticia.titulo}</h2>
          <p>{noticia.descripcion}</p>
          <p>{noticia.nombre_usuario}</p>
          <span>{dayjs(noticia.creadaEn).format("MMM D, YYYY")}</span>
        </div>
      ))}
    </div>
  );
}

export default NoticiasTienda;
