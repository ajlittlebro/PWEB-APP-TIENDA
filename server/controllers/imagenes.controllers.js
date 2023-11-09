import { pool } from "../db.js";
import { deleteImagen, uploadImagen } from "../libs/cloudinary.js";
import fs from "fs-extra";
export const getImagenes = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM imagenes ORDER BY creadaEn ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getImagen = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM imagenes WHERE id_imagen = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createImagen = async (req, res) => {
  try {
    const { id_producto } = req.body;
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
      "INSERT INTO imagenes(id_producto, imagen) VALUES (?, ?)",
      [id_producto, imagen !== null ? imagen.url : null]
    );

    const [registro] = await pool.query(
      "SELECT creadaEn, actualizadoEn FROM imagenes WHERE id_imagen = ?",
      [result.insertId]
    );

    console.log(result);
    res.json({
      id: result.insertId,
      imagen: imagen,
      id_producto,
      creadaEn: registro[0].creadaEn,
      actualizadoEn: registro[0].actualizadoEn,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT imagen FROM imagenes WHERE id_imagen = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    const imageUrl = result[0].imagen;
    const publicId = imageUrl.match(/ImagenesPWEB\/[\w-]+/)[0];

    await deleteImagen(publicId);

    const [deleteResult] = await pool.query(
      "DELETE FROM imagenes WHERE id_imagen = ?",
      [req.params.id]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateImagen = async (req, res) => {
  try {
    
    const nuevaImagen = req.files?.image;

    
    const [imagenExistente] = await pool.query(
      "SELECT imagen FROM imagenes WHERE id_imagen = ?",
      [req.params.id]
    );

    if (imagenExistente.length === 0) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    
    if (nuevaImagen && imagenExistente[0].imagen) {
      const imageUrl = imagenExistente[0].imagen;
      const publicIdMatch = imageUrl.match(/ImagenesPWEB\/[\w-]+/);
      if (publicIdMatch) {
        const publicId = publicIdMatch[0];
        await deleteImagen(publicId);
      }
    }

    
    let imagen = null;
    if (nuevaImagen) {
      const resultado = await uploadImagen(nuevaImagen.tempFilePath);
      await fs.remove(nuevaImagen.tempFilePath);
      imagen = {
        url: resultado.secure_url,
        public_id: resultado.public_id,
      };
    }

    
    const [result] = await pool.query(
      "UPDATE imagenes SET id_producto = ?, imagen = ? WHERE id_imagen = ?",
      [
        req.body.id_producto,
        imagen ? imagen.url : imagenExistente[0].imagen, 
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
