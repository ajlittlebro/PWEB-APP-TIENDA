import Jwt from "jsonwebtoken";
import { DB_TOKEN } from "../config.js";
export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  Jwt.verify(token, DB_TOKEN, (err, usuario) => {
    if (err)
      return res.status(403).json({
        message: "Invalid Token",
      });
      req.usuario = usuario;
    next();
  });
};
