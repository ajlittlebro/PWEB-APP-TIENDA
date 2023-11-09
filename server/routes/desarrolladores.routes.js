import { Router } from "express";
import {
  getDesarrollador,
  getDesarrolladores,
  updateDesarrollador,
  deleteDesarrollador,
  createDesarrollador,
} from "../controllers/desarrolladores.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/desarrolladores", authRequired, getDesarrolladores);
router.get("/crud/desarrolladores/:id", authRequired, getDesarrollador);
router.post("/crud/desarrolladores", authRequired, createDesarrollador);
router.put("/crud/desarrolladores/:id", authRequired, updateDesarrollador);
router.delete("/crud/desarrolladores/:id", authRequired, deleteDesarrollador);

export default router;
