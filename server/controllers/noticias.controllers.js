import { pool } from "../db.js";

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
    const { titulo, descripcion, fecha,usuario/*, imagen */} = req.body;
    const [result] = await pool.query(
      /*"INSERT INTO noticias(titulo, id_usuario, descripcion, fecha, imagen) VALUES (?, ?, ?, ?)",*/
      "INSERT INTO noticias(titulo, id_usuario, descripcion, fecha) VALUES (?, ?, ?, ?)",
      [titulo,usuario,  descripcion, fecha/*imagen*/]
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
      /*imagen*/
      usuario,
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
      "DELETE FROM noticias WHERE id_noticia = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: error.message });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
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
