import { pool } from "../db.js";

export const getEditoras = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM editoras ORDER BY creadaEn ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEditora = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM editoras WHERE id_editora = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Editora no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEditora = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.query("INSERT INTO editoras(nombre) VALUES (?)", [
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

export const deleteEditora = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM editoras WHERE id_editora = ?",
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

export const updateEditora = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE editoras SET ? WHERE id_editora = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Editora no encontrada" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
