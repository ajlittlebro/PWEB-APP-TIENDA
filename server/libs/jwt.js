import Jwt from "jsonwebtoken";
import { DB_TOKEN } from "../config.js";
function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    Jwt.sign(
      payload,
      DB_TOKEN,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

export default createAccessToken;
