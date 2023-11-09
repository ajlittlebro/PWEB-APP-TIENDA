import { Router } from "express";
import {
  getNoticia,
  getNoticias,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} from "../controllers/noticias.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/noticias", authRequired, getNoticias);
router.get("/crud/noticias/:id", authRequired, getNoticia);
router.post("/crud/noticias", authRequired, createNoticia);
router.put("/crud/noticias/:id", authRequired, updateNoticia);
router.delete("/crud/noticias/:id", authRequired, deleteNoticia);

export default router;
