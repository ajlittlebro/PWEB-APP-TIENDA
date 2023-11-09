import { Router } from "express";
import {
  getProducto,
  getProductos,
  updateProducto,
  deleteProducto,
  createProducto,
} from "../controllers/productos.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/productos", authRequired, getProductos);
router.get("/crud/productos/:id", authRequired, getProducto);
router.post("/crud/productos", authRequired, createProducto);
router.put("/crud/productos/:id", authRequired, updateProducto);
router.delete("/crud/productos/:id", authRequired, deleteProducto);

export default router;
