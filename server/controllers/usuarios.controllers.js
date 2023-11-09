import { pool } from "../db.js";
import bcrypt from "bcryptjs";

export const getUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM usuarios ORDER BY creadaEn ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nombre, rol, correo, contrasena } = req.body;

    const hashContrasena = await bcrypt.hash(contrasena, 10);
    const [result] = await pool.query(
      "INSERT INTO usuarios(nombre, rol, correo, contrasena) VALUES (?, ?, ?, ?)",
      [nombre, rol, correo, hashContrasena]
    );

    console.log(result);
    res.json({
      id: result.insertId,
      nombre,
      rol,
      correo,
      contrasena: hashContrasena,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM usuarios WHERE id_usuario = ?",
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

export const updateUsuario = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE usuarios SET ? WHERE id_usuario = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
