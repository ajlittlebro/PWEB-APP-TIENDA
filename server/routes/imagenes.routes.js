import { Router } from "express";
import {
  getImagen,
  getImagenes,
  updateImagen,
  deleteImage,
  createImagen,
} from "../controllers/imagenes.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/imagenes", authRequired, getImagenes);
router.get("/crud/imagenes/:id", authRequired, getImagen);
router.post("/crud/imagenes", authRequired, createImagen);
router.put("/crud/imagenes/:id", authRequired, updateImagen);
router.delete("/crud/imagenes/:id", authRequired, deleteImage);

export default router;
