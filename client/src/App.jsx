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
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CrudLogin />}></Route>
          <Route path="/crud/login" element={<CrudLogin />}></Route>
          <Route element={<RutaProtegida />}>
            <Route path="/crud/dashboard" element={<Dashboard />}></Route>
            <Route path="/crud/generos" element={<Generos />}></Route>
            <Route path="/crud/imagenes" element={<Imagenes />}></Route>
            <Route path="/crud/noticias" element={<Noticias />}></Route>
            <Route path="/crud/perfil" element={<PerfilEmpleado />}></Route>
            <Route path="/crud/plataformas" element={<Plataformas />}></Route>
            <Route path="/crud/productos" element={<Productos />}></Route>
            <Route path="/crud/usuarios" element={<Usuarios />}></Route>
            <Route path="/crud/ventas" element={<Ventas />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
