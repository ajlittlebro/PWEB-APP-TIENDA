import { pool } from "../db.js";

export const getGeneros = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM generos ORDER BY creadaEn ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getGenero = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM generos WHERE id_generos = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Genero no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createGenero = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.query("INSERT INTO generos(nombre) VALUES (?)", [
      nombre,
    ]);
    console.log(result);
    res.json({
      id: result.insertId,
      nombre,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteGenero = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM generos WHERE id_generos = ?",
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

export const updateGenero = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE generos SET ? WHERE id_generos = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Genero no encontrado" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
