import { pool } from "../db.js";
import { deleteImagen, uploadImagen } from "../libs/cloudinary.js";
import fs from "fs-extra";
export const getProductos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM productos ORDER BY creadaEn ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProducto = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProducto = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      fecha,
      id_editora,
      id_desarrollador,
      id_plataforma,
      existencia,
    } = req.body;
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
      "INSERT INTO productos(nombre, descripcion, fecha, id_editora, id_desarrollador, id_plataforma, existencia) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        descripcion,
        fecha,
        id_editora,
        id_desarrollador,
        id_plataforma,
        existencia,
        imagen !== null ? imagen.url : null,
      ]
    );

    const [registro] = await pool.query(
      "SELECT creadaEn, actualizadoEn FROM productos WHERE id_producto = ?",
      [result.insertId]
    );

    console.log(result);
    res.json({
      id: result.insertId,
      nombre,
      descripcion,
      fecha,
      imagen: imagen,
      existencia,
      id_desarrollador,
      id_editora,
      id_plataforma,
      creadaEn: registro[0].creadaEn,
      actualizadoEn: registro[0].actualizadoEn,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT imagen FROM productos WHERE id_producto = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const imageUrl = result[0].imagen;
    const publicId = imageUrl.match(/ImagenesPWEB\/[\w-]+/)[0];

    await deleteImagen(publicId);

    const [deleteResult] = await pool.query(
      "DELETE FROM productos WHERE id_producto = ?",
      [req.params.id]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE productos SET ? WHERE id_producto = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
