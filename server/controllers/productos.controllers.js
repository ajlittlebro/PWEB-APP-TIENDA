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
      precio,
      descripcion,
      fecha_lanzamiento,
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
      "INSERT INTO productos(nombre, precio, descripcion, fecha_lanzamiento, id_editora, id_desarrollador, id_plataforma, existencia, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        precio,
        descripcion,
        fecha_lanzamiento,
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
      fecha_lanzamiento,
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
    // Verificar si se ha proporcionado una nueva imagen en la solicitud.
    const nuevaImagen = req.files?.image;

    // Obtener el producto existente
    const [productoExistente] = await pool.query(
      "SELECT imagen FROM productos WHERE id_producto = ?",
      [req.params.id]
    );

    if (productoExistente.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar la imagen anterior de Cloudinary si existe.
    if (nuevaImagen && productoExistente[0].imagen) {
      const imageUrl = productoExistente[0].imagen;
      const publicIdMatch = imageUrl.match(/ImagenesPWEB\/[\w-]+/);
      if (publicIdMatch) {
        const publicId = publicIdMatch[0];
        await deleteImagen(publicId);
      }
    }

    // Subir la nueva imagen a Cloudinary y obtener su URL y public_id
    let imagen = null;
    if (nuevaImagen) {
      const resultado = await uploadImagen(nuevaImagen.tempFilePath);
      await fs.remove(nuevaImagen.tempFilePath);
      imagen = {
        url: resultado.secure_url,
        public_id: resultado.public_id,
      };
    }

    // Actualizar los detalles del producto en la base de datos, incluyendo la URL de la imagen.
    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, fecha_lanzamiento = ?, id_editora = ?, id_desarrollador = ?, id_plataforma = ?, existencia = ?, imagen = ? WHERE id_producto = ?",
      [
        req.body.nombre,
        req.body.precio,
        req.body.descripcion,
        req.body.fecha_lanzamiento,
        req.body.id_editora,
        req.body.id_desarrollador,
        req.body.id_plataforma,
        req.body.existencia,
        imagen ? imagen.url : productoExistente[0].imagen, // Usar la nueva imagen si existe, o la existente si no
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
