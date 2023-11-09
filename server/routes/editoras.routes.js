import { Router } from "express";
import {
  getEditora,
  getEditoras,
  updateEditora,
  deleteEditora,
  createEditora,
} from "../controllers/editoras.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/editoras", authRequired, getEditoras);
router.get("/crud/editoras/:id", authRequired, getEditora);
router.post("/crud/editoras", authRequired, createEditora);
router.put("/crud/editoras/:id", authRequired, updateEditora);
router.delete("/crud/editoras/:id", authRequired, deleteEditora);

export default router;
