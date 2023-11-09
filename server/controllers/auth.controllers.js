import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import createAccessToken from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { DB_TOKEN } from "../config.js";

export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE correo= ?",
      [correo]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const usuario = result[0];
    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    const token = await createAccessToken({
      id: usuario.id_usuario,
    });
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });
    const [registro] = await pool.query(
      "SELECT creadaEn, actualizadoEn FROM usuarios WHERE correo = ?",
      [correo]
    );

    res.cookie("token", token);
    console.log(result);
    res.json({
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      id_rol: usuario.id_rol,
      correo: usuario.correo,
      creadaEn: registro[0].creadaEn,
      actualizadoEn: registro[0].actualizadoEn,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { nombre, id_rol, correo, contrasena } = req.body;

    const [email] = await pool.query("SELECT * FROM usuarios WHERE correo= ?", [
      correo,
    ]);
    if (email.length > 0) {
      return res.status(404).json(["El correo ya está en uso"]);
    }

    const hashContrasena = await bcrypt.hash(contrasena, 10);
    const [result] = await pool.query(
      "INSERT INTO usuarios(nombre, id_rol, correo, contrasena) VALUES (?, ?, ?, ?)",
      [nombre, id_rol, correo, hashContrasena]
    );
    const [registro] = await pool.query(
      "SELECT creadaEn, actualizadoEn FROM usuarios WHERE id_usuario = ?",
      [result.insertId]
    );

    const token = await createAccessToken({ id: result.insertId });
    res.cookie("token", token);
    console.log(result);
    res.json({
      id: result.insertId,
      nombre,
      id_rol,
      correo,
      creadaEn: registro[0].creadaEn,
      actualizadoEn: registro[0].actualizadoEn,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const { id } = req.usuario;

  try {
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const [registro] = await pool.query(
      "SELECT creadaEn, actualizadoEn FROM usuarios WHERE id_usuario = ?",
      [id]
    );

    const usuario = result[0];
    res.json({
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      id_rol: usuario.id_rol,
      correo: usuario.correo,
      creadaEn: registro[0].creadaEn,
      actualizadoEn: registro[0].actualizadoEn,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, DB_TOKEN);

    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [user.id]
    );

    if (result.length === 0) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const usuario = result[0];
    res.json({
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      id_rol: usuario.id_rol,
      correo: usuario.correo,
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
