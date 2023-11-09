import { pool } from "../db.js";

export const getDesarrolladores = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM desarrolladores ORDER BY id_desarrollador ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDesarrollador = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM desarrolladores WHERE id_desarrollador = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Desarrollador no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDesarrollador = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.query("INSERT INTO desarrolladores(nombre) VALUES (?)", [
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

export const deleteDesarrollador = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM desarrolladores WHERE id_desarrollador = ?",
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

export const updateDesarrollador = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE desarrolladores SET ? WHERE id_desarrollador = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Desarrollador no encontrado" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
