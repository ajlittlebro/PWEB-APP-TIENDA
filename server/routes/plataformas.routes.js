import { Router } from "express";
import {
  getPlataforma,
  getPlataformas,
  updatePlataforma,
  deletePlataforma,
  createPlataforma,
} from "../controllers/plataformas.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/plataformas", authRequired, getPlataformas);
router.get("/crud/plataformas/:id", authRequired, getPlataforma);
router.post("/crud/plataformas", authRequired, createPlataforma);
router.put("/crud/plataformas/:id", authRequired, updatePlataforma);
router.delete("/crud/plataformas/:id", authRequired, deletePlataforma);

export default router;
