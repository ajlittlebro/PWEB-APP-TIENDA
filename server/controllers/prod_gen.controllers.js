import { pool } from "../db.js";

export const getProductosGeneros = async (req, res) => {
  try {
    const productosQuery = `
        SELECT pg.id_genero, pg.id_producto, pg.creadaEn, pg.actualizadoEn, p.nombre AS nombre_producto, g.nombre AS nombre_genero
        FROM productos_generos pg
        INNER JOIN productos p ON pg.id_producto = p.id_producto
        INNER JOIN generos g ON pg.id_genero = g.id_genero
      `;

    const [result] = await pool.query(productosQuery);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductoGenero = async (req, res) => {
  try {
    const productoQuery = `
        SELECT pg.id_genero, pg.id_producto, pg.creadaEn, pg.actualizadoEn, p.nombre AS nombre_producto, g.nombre AS nombre_genero
        FROM productos_generos pg
        INNER JOIN productos p ON pg.id_producto = p.id_producto
        INNER JOIN generos g ON pg.id_genero = g.id_genero
        WHERE p.id_producto = ?
      `;

    const [result] = await pool.query(productoQuery, [req.params.id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProductoGenero = async (req, res) => {
  try {
    const { id_producto, id_genero } = req.body;

 
    const [productoInfo] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id_producto]
    );

    const [generoInfo] = await pool.query(
      "SELECT * FROM generos WHERE id_genero = ?",
      [id_genero]
    );

    if (productoInfo.length === 0 || generoInfo.length === 0) {
      return res
        .status(404)
        .json({ message: "Producto o género no encontrado" });
    }

    
    const [relacionExistente] = await pool.query(
      "SELECT * FROM productos_generos WHERE id_producto = ? AND id_genero = ?",
      [id_producto, id_genero]
    );

    if (relacionExistente.length > 0) {
      return res.status(400).json({ message: "La relación ya existe" });
    }

    
    await pool.query(
      "INSERT INTO productos_generos(id_producto, id_genero) VALUES (?, ?)",
      [id_producto, id_genero]
    );

 
    const [producto] = await pool.query(
      "SELECT nombre FROM productos WHERE id_producto = ?",
      [id_producto]
    );

    const [genero] = await pool.query(
      "SELECT nombre FROM generos WHERE id_genero = ?",
      [id_genero]
    );

    
    return res.json({
      id_producto,
      id_genero,
      nombre_producto: producto[0].nombre,
      nombre_genero: genero[0].nombre,
      creadaEn: new Date(), 
      actualizadoEn: new Date(), 
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProductoGenero = async (req, res) => {
  try {
    const { id_producto, id_genero } = req.body;

    const [productoInfo] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id_producto]
    );

    const [generoInfo] = await pool.query(
      "SELECT * FROM generos WHERE id_genero = ?",
      [id_genero]
    );

    if (productoInfo.length === 0 || generoInfo.length === 0) {
      return res
        .status(404)
        .json({ message: "Producto o género no encontrado" });
    }

    const [relacionExistente] = await pool.query(
      "SELECT * FROM productos_generos WHERE id_producto = ? AND id_genero = ?",
      [id_producto, id_genero]
    );

    if (relacionExistente.length === 0) {
      return res.status(404).json({ message: "La relación no existe" });
    }

    await pool.query(
      "DELETE FROM productos_generos WHERE id_producto = ? AND id_genero = ?",
      [id_producto, id_genero]
    );

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/*
export const updateProductoGenero = async (req, res) => {
  try {
    const { id_producto, id_genero } = req.body;

    
    const [productoInfo] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id_producto]
    );

    const [generoInfo] = await pool.query(
      "SELECT * FROM generos WHERE id_genero = ?",
      [id_genero]
    );

    if (productoInfo.length === 0 || generoInfo.length === 0) {
      return res
        .status(404)
        .json({ message: "Producto o género no encontrado" });
    }

    
    const [existingRelation] = await pool.query(
      "SELECT * FROM productos_generos WHERE id_producto = ? AND id_genero = ?",
      [id_producto, id_genero]
    );

    if (existingRelation.length === 0) {
      return res.status(404).json({ message: "La relación no existe" });
    }

    

    await pool.query(
      "UPDATE productos_generos SET ? WHERE id_producto = ? AND id_genero = ?",
      [req.body, id_producto, id_genero]
    );

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
*/
