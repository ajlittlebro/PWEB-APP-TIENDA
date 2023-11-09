import express from "express";
import fileUpload from "express-fileupload";
import { PORT } from "./config.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";
import generosRoutes from "./routes/generos.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import noticiasRoutes from "./routes/noticias.routes.js"
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./upload"
}))
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api",indexRoutes);
app.use("/api",generosRoutes);
app.use("/api",usuariosRoutes);
app.use("/api",noticiasRoutes);
app.listen(PORT);
console.log("Server is listening on port " + PORT);