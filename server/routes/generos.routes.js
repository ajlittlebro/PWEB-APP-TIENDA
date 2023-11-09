import { Router } from "express";
import {
  getGenero,
  getGeneros,
  updateGenero,
  deleteGenero,
  createGenero,
} from "../controllers/generos.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/generos", authRequired, getGeneros);
router.get("/crud/generos/:id", authRequired, getGenero);
router.post("/crud/generos", authRequired, createGenero);
router.put("/crud/generos/:id", authRequired, updateGenero);
router.delete("/crud/generos/:id", authRequired, deleteGenero);

export default router;
