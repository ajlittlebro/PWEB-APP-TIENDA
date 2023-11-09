import { pool } from "../db.js";

export const getPlataformas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM plataformas ORDER BY id_plataforma ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPlataforma = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM plataformas WHERE id_plataforma = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Plataforma no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPlataforma = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.query("INSERT INTO plataformas(nombre) VALUES (?)", [
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

export const deletePlataforma = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM plataformas WHERE id_plataforma = ?",
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

export const updatePlataforma = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE plataformas SET ? WHERE id_plataforma = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Plataforma no encontrada" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
