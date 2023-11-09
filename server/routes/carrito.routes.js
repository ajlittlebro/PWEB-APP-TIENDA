import { Router } from "express";
import {
  getCarrito,
  postCarrito,
  updateCarrito,
  deleteProductoCarrito,
  deleteCarrito,
} from "../controllers/carrito.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/tienda/carrito", authRequired, getCarrito);
router.post("/tienda/carrito/agregar", authRequired, postCarrito);
router.put("/tienda/carrito/actualizar", authRequired, updateCarrito);
router.delete(
  "/tienda/carrito/eliminarProducto",
  authRequired,
  deleteProductoCarrito
);
router.delete("/tienda/carrito/eliminarCarrito", authRequired, deleteCarrito);

export default router;
