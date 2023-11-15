import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrudLogin from "./pages/crud/CrudLogin";
import Dashboard from "./pages/crud/Dashboard";
import Generos from "./pages/crud/Generos";
import Imagenes from "./pages/crud/Imagenes";
import Noticias from "./pages/crud/Noticias";
import PerfilEmpleado from "./pages/crud/PerfilEmpleado";
import Plataformas from "./pages/crud/Plataformas";
import Productos from "./pages/crud/Productos";
import Usuarios from "./pages/crud/Usuarios";
import Ventas from "./pages/crud/Ventas";
import RutaProtegida from "./RutaProtegida";
import CUNoticias from "./pages/crud/cuNoticias";
import { AuthProvider } from "./context/AuthContext";
import Tablas from "./components/Tablas";
import { NoticiaProvider } from "./context/noticiasContext";
import { GeneroProvider } from "./context/GenerosContext";
import CUGeneros from "./pages/crud/CUGeneros";
import { PlataformaProvider } from "./context/PlataformasContext";
import CUPlataformas from "./pages/crud/CUPlataformas";

function App() {
  return (
    <AuthProvider>
      <NoticiaProvider>
      <GeneroProvider>
      <PlataformaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CrudLogin />}></Route>
          <Route path="/crud/login" element={<CrudLogin />}></Route>
          <Route element={<RutaProtegida />}>
            <Route path="/crud/tablas" element={<Tablas />}></Route>
            <Route path="/crud/dashboard" element={<Dashboard />}></Route>
            <Route path="/crud/generos" element={<Generos />}></Route>
            <Route path="/crud/imagenes" element={<Imagenes />}></Route>
            <Route path="/crud/noticias" element={<Noticias />}></Route>
            <Route path="/crud/perfil" element={<PerfilEmpleado />}></Route>
            <Route path="/crud/plataformas" element={<Plataformas />}></Route>
            <Route path="/crud/productos" element={<Productos />}></Route>
            <Route path="/crud/usuarios" element={<Usuarios />}></Route>
            <Route path="/crud/ventas" element={<Ventas />}></Route>
            <Route path="/crud/noticias/:id" element={<CUNoticias />}></Route>
            <Route path="/crud/generos/:id" element={<CUGeneros />}></Route>
            <Route path="/crud/plataformas/:id" element={<CUPlataformas />}></Route>
            <Route path="/crud/noticias/crear" element={<CUNoticias />}></Route>
            <Route path="/crud/plataformas/crear" element={<CUPlataformas />}></Route>
            <Route path="/crud/generos/crear" element={<CUGeneros />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </PlataformaProvider>
      </GeneroProvider>
      </NoticiaProvider>
    </AuthProvider>
  );
}

export default App;
