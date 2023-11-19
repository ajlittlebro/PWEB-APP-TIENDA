import { pool } from "../db.js";

export const getRoles = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM roles ORDER BY id_rol ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRol = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM roles WHERE id_rol = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};