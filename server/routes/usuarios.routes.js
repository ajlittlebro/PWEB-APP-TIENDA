import { Router } from "express";
import {
  getUsuario,
  getUsuarios,
  updateUsuario,
  createUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/usuarios", authRequired, getUsuarios);
router.get("/crud/usuarios/:id", authRequired, getUsuario);
router.post("/crud/usuarios", authRequired, createUsuario);
router.put("/crud/usuarios/:id", authRequired, updateUsuario);
router.delete("/crud/usuarios/:id", authRequired, deleteUsuario);

export default router;
