import { Router } from "express";
import {
  getWishlist,
  addToWishlist,
  deleteProductoWishlist,
  deleteWishlist,
  addCarrito,
  addProductoCarrito,
} from "../controllers/wishlist.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/tienda/wishlist", authRequired, getWishlist);
router.post("/tienda/wishlist/agregar", authRequired, addToWishlist);
router.post("/tienda/wishlist/carrito", authRequired, addCarrito);
router.post("/tienda/wishlist/addtocarrito", authRequired, addProductoCarrito);
router.delete(
  "/tienda/wishlist/eliminarProducto",
  authRequired,
  deleteProductoWishlist
);
router.delete(
  "/tienda/wishlist/eliminarWishlist",
  authRequired,
  deleteWishlist
);

export default router;
