import { pool } from "../db.js";
import { deleteImagen, uploadImagen } from "../libs/cloudinary.js";
import fs from "fs-extra";
export const getNoticias = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM noticias ORDER BY creadaEn ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNoticia = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM noticias WHERE id_noticia = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNoticia = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, id_usuario } = req.body;
    let imagen = null;

    if (req.files.image) {
      const resultado = await uploadImagen(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      imagen = {
        url: resultado.secure_url,
        public_id: resultado.public_id,
      };
    }

    const [result] = await pool.query(
      "INSERT INTO noticias(titulo, id_usuario, descripcion, fecha, imagen) VALUES (?, ?, ?, ?, ?)",
      [
        titulo,
        id_usuario,
        descripcion,
        fecha,
        imagen !== null ? imagen.url : null,
      ]
    );

    const [registro] = await pool.query(
      "SELECT creadaEn, actualizadoEn FROM noticias WHERE id_noticia = ?",
      [result.insertId]
    );

    console.log(result);
    res.json({
      id: result.insertId,
      titulo,
      descripcion,
      fecha,
      imagen: imagen,
      id_usuario,
      creadaEn: registro[0].creadaEn,
      actualizadoEn: registro[0].actualizadoEn,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteNoticia = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT imagen FROM noticias WHERE id_noticia = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    const imageUrl = result[0].imagen;
    const publicId = imageUrl.match(/ImagenesPWEB\/[\w-]+/)[0];

    await deleteImagen(publicId);

    const [deleteResult] = await pool.query(
      "DELETE FROM noticias WHERE id_noticia = ?",
      [req.params.id]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNoticia = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE noticias SET ? WHERE id_noticia = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Noticia no encontrada" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
