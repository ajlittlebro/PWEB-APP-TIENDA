import { pool } from "../db.js";

export const getWishlist = async (req, res) => {
  try {
    const userId = req.usuario.id;

    const wishlistQuery = `
        SELECT w.id_producto, p.nombre AS nombre, p.precio, p.imagen AS imagen, pl.nombre AS plataforma
        FROM wishlist w
        INNER JOIN productos p ON w.id_producto = p.id_producto
        INNER JOIN plataformas pl ON p.id_plataforma = pl.id_plataforma
        WHERE w.id_usuario = ?
      `;

    const [wishlistResult] = await pool.query(wishlistQuery, [userId]);

    if (wishlistResult.length === 0) {
      return res.status(404).json({ message: "Wishlist vacía" });
    }

    res.json(wishlistResult);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { id_producto } = req.body;
    const userId = req.usuario.id;

    const [productoExistente] = await pool.query(
      "SELECT * FROM wishlist WHERE id_usuario = ? AND id_producto = ?",
      [userId, id_producto]
    );

    if (productoExistente.length === 0) {
      await pool.query(
        "INSERT INTO wishlist (id_usuario, id_producto) VALUES (?, ?)",
        [userId, id_producto]
      );
    }

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProductoWishlist = async (req, res) => {
  try {
    const { id_producto } = req.body;
    const userId = req.usuario.id;

    const [productoEnWishlist] = await pool.query(
      "SELECT * FROM wishlist WHERE id_usuario = ? AND id_producto = ?",
      [userId, id_producto]
    );

    if (productoEnWishlist.length === 0) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en la wishlist" });
    }

    await pool.query(
      "DELETE FROM wishlist WHERE id_usuario = ? AND id_producto = ?",
      [userId, id_producto]
    );

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteWishlist = async (req, res) => {
  try {
    const userId = req.usuario.id;

    await pool.query("DELETE FROM wishlist WHERE id_usuario = ?", [userId]);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addCarrito = async (req, res) => {
  try {
    const userId = req.usuario.id;

    const [wishlistProductos] = await pool.query(
      "SELECT id_producto FROM wishlist WHERE id_usuario = ?",
      [userId]
    );

    for (const producto of wishlistProductos) {
      const [ProductosEnCarrito] = await pool.query(
        "SELECT id_producto FROM carrito WHERE id_usuario = ? AND id_producto = ?",
        [userId, producto.id_producto]
      );

      if (ProductosEnCarrito.length === 0) {
        await pool.query(
          "INSERT INTO carrito (id_usuario, id_producto, cantidad) VALUES (?, ?, 1)",
          [userId, producto.id_producto]
        );
      }
    }

    await pool.query("DELETE FROM wishlist WHERE id_usuario = ?", [userId]);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addProductoCarrito = async (req, res) => {
  try {
    const userId = req.usuario.id;
    const productoId = req.body.id_producto;

    const [ProductosEnCarrito] = await pool.query(
      "SELECT id_producto FROM carrito WHERE id_usuario = ? AND id_producto = ?",
      [userId, productoId]
    );

    if (ProductosEnCarrito.length === 0) {
      await pool.query(
        "INSERT INTO carrito (id_usuario, id_producto, cantidad) VALUES (?, ?, 1)",
        [userId, productoId]
      );
    }

    await pool.query(
      "DELETE FROM wishlist WHERE id_usuario = ? AND id_producto = ?",
      [userId, productoId]
    );

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
