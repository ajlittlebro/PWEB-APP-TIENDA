import { pool } from "../db.js";

export const getCarrito = async (req, res) => {
  try {
    const userId = req.usuario.id;

    const carritoQuery = `
      SELECT c.cantidad, p.id_producto, p.nombre AS nombre, p.precio, p.imagen AS imagen, pl.nombre AS nombre 
      FROM carrito c
      INNER JOIN productos p ON c.id_producto = p.id_producto
      INNER JOIN plataformas pl ON p.id_plataforma = pl.id_plataforma
      WHERE c.id_usuario = ?
    `;

    const [carritoResult] = await pool.query(carritoQuery, [userId]);

    if (carritoResult.length === 0) {
      return res.status(404).json({ message: "Carrito vacío" });
    }

    res.json(carritoResult);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const postCarrito = async (req, res) => {
  try {
    const { id_producto } = req.body;
    const userId = req.usuario.id;

    const [productoExistente] = await pool.query(
      "SELECT * FROM carrito WHERE id_usuario = ? AND id_producto = ?",
      [userId, id_producto]
    );

    if (productoExistente.length === 0) {
      await pool.query(
        "INSERT INTO carrito (id_usuario, id_producto, cantidad) VALUES (?, ?, 1)",
        [userId, id_producto]
      );
    }

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCarrito = async (req, res) => {
  try {
    const { id_producto, cantidad } = req.body;
    const userId = req.usuario.id;

    const [productoEnCarrito] = await pool.query(
      "SELECT * FROM carrito WHERE id_usuario = ? AND id_producto = ?",
      [userId, id_producto]
    );

    if (productoEnCarrito.length === 0) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    await pool.query(
      "UPDATE carrito SET cantidad = ? WHERE id_usuario = ? AND id_producto = ?",
      [cantidad, userId, id_producto]
    );

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProductoCarrito = async (req, res) => {
  try {
    const { id_producto } = req.body;
    const userId = req.usuario.id;

    const [productoEnCarrito] = await pool.query(
      "SELECT * FROM carrito WHERE id_usuario = ? AND id_producto = ?",
      [userId, id_producto]
    );

    if (productoEnCarrito.length === 0) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    await pool.query(
      "DELETE FROM carrito WHERE id_usuario = ? AND id_producto = ?",
      [userId, id_producto]
    );

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCarrito = async (req, res) => {
  try {
    const userId = req.usuario.id;

    await pool.query("DELETE FROM carrito WHERE id_usuario = ?", [userId]);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
