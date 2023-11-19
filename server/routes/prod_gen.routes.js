import { Router } from "express";
import {
  getProductoGenero,
  getProductosGeneros,
//updateProductoGenero,
  deleteProductoGenero,
  createProductoGenero,
} from "../controllers/prod_gen.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/productosgeneros", authRequired, getProductosGeneros);
router.get("/crud/productosgeneros/:id_producto/:id_genero", authRequired, getProductoGenero);
router.post("/crud/productosgeneros", authRequired, createProductoGenero);
/*router.put("/crud/productosgeneros/:id_producto/:id_genero", authRequired, updateProductoGenero);*/
router.delete("/crud/productosgeneros/:id_producto/:id_genero", authRequired, deleteProductoGenero);

export default router;
