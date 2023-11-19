import { Router } from "express";
import {
  getRol,
  getRoles,
} from "../controllers/roles.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/roles", authRequired, getRoles);
router.get("/crud/roles/:id", authRequired, getRol);

export default router;
