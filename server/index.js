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
import noticiasRoutes from "./routes/noticias.routes.js";
import plataformasRoutes from "./routes/plataformas.routes.js";
import editorasRoutes from "./routes/editoras.routes.js";
import desarrolladoresRoutes from "./routes/desarrolladores.routes.js";
import imagenesRoutes from "./routes/imagenes.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import productosgenerosRoutes from "./routes/prod_gen.routes.js"
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", indexRoutes);
app.use("/api", generosRoutes);
app.use("/api", usuariosRoutes);
app.use("/api", noticiasRoutes);
app.use("/api", desarrolladoresRoutes);
app.use("/api", editorasRoutes);
app.use("/api", plataformasRoutes);
app.use("/api", imagenesRoutes);
app.use("/api", productosRoutes);
app.use("/api", carritoRoutes);
app.use("/api", wishlistRoutes);
app.use("/api", productosgenerosRoutes);
app.listen(PORT);
console.log("Server is listening on port " + PORT);
