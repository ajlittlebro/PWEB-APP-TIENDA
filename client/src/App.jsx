import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tablas from "./components/Tablas";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import { DesarrolladorProvider } from "./context/DesarrolladoresContext";
import { EditoraProvider } from "./context/EditorasContext";
import { GeneroProvider } from "./context/GenerosContext";
import { ImagenProvider } from "./context/ImagenesContext";
import { PlataformaProvider } from "./context/PlataformasContext";
import { ProductoProvider } from "./context/ProductosContext";
import { ProductosGenerosProvider } from "./context/ProductosGenerosContext";
import { RolProvider } from "./context/RolesContext";
import { UsuarioProvider } from "./context/UsuariosContext";
import { WishlistProvider } from "./context/WishlistContext";
import { NoticiaProvider } from "./context/noticiasContext";
import CUDesarrolladores from "./pages/crud/CUDesarrolladores";
import CUEditoras from "./pages/crud/CUEditoras";
import CUGeneros from "./pages/crud/CUGeneros";
import CUImagenes from "./pages/crud/CUImagenes";
import CUPlataformas from "./pages/crud/CUPlataformas";
import CUProductos from "./pages/crud/CUProductos";
import CUProductosGeneros from "./pages/crud/CUProductosGeneros";
import CUUsuarios from "./pages/crud/CUUsuarios";
import CrudLogin from "./pages/crud/CrudLogin";
import Dashboard from "./pages/crud/Dashboard";
import Desarrolladores from "./pages/crud/Desarrolladores";
import Editoras from "./pages/crud/Editoras";
import Generos from "./pages/crud/Generos";
import Imagenes from "./pages/crud/Imagenes";
import Noticias from "./pages/crud/Noticias";
import PerfilEmpleado from "./pages/crud/PerfilEmpleado";
import Plataformas from "./pages/crud/Plataformas";
import Productos from "./pages/crud/Productos";
import ProductosGeneros from "./pages/crud/ProductosGeneros";
import Usuarios from "./pages/crud/Usuarios";
import Ventas from "./pages/crud/Ventas";
import CUNoticias from "./pages/crud/cuNoticias";
import AboutUs from "./pages/tienda/AboutUs";
import CarritoPage from "./pages/tienda/Carrito";
import Catalogo from "./pages/tienda/Catalogo";
import NoticiasTienda from "./pages/tienda/NoticiasTienda";
import ProductoDetalle from "./pages/tienda/Producto";
import Soporte from "./pages/tienda/Soporte";
import WishlistPage from "./pages/tienda/Wishlist";
import RutaProtegida from "./RutaProtegida";

function App() {
  return (
    <AuthProvider>
      <NoticiaProvider>
      <GeneroProvider>
      <PlataformaProvider>
      <EditoraProvider>
      <DesarrolladorProvider>
      <ProductoProvider>
      <ImagenProvider>
      <UsuarioProvider>
        <RolProvider>
        <ProductosGenerosProvider>
        <WishlistProvider>
        <CarritoProvider>
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
            <Route path="/crud/productosgeneros" element={<ProductosGeneros />}></Route>
            <Route path="/crud/perfil" element={<PerfilEmpleado />}></Route>
            <Route path="/crud/plataformas" element={<Plataformas />}></Route>
            <Route path="/crud/desarrolladores" element={<Desarrolladores />}></Route>
            <Route path="/crud/editoras" element={<Editoras />}></Route>
            <Route path="/crud/productos" element={<Productos />}></Route>
            <Route path="/crud/usuarios" element={<Usuarios />}></Route>
            <Route path="/crud/ventas" element={<Ventas />}></Route>
            <Route path="/crud/noticias/:id" element={<CUNoticias />}></Route>
            <Route path="/crud/generos/:id" element={<CUGeneros />}></Route>
            <Route path="/crud/plataformas/:id" element={<CUPlataformas />}></Route>
            <Route path="/crud/editoras/:id" element={<CUEditoras />}></Route>
            <Route path="/crud/desarrolladores/:id" element={<CUDesarrolladores />}></Route>
            <Route path="/crud/productos/:id" element={<CUProductos />}></Route>
            <Route path="/crud/imagenes/:id" element={<CUImagenes />}></Route>
            <Route path="/crud/usuarios/:id" element={<CUUsuarios />}></Route>
            <Route path="/crud/productosgeneros/:id/:id" element={<CUProductosGeneros />}></Route>
            <Route path="/crud/productosgeneros/crear" element={<CUProductosGeneros />}></Route>
            <Route path="/crud/usuarios/crear" element={<CUUsuarios />}></Route>
            <Route path="/crud/imagenes/crear" element={<CUImagenes />}></Route>
            <Route path="/crud/productos/crear" element={<CUProductos />}></Route>
            <Route path="/crud/noticias/crear" element={<CUNoticias />}></Route>
            <Route path="/crud/desarrolladores/crear" element={<CUDesarrolladores />}></Route>
            <Route path="/crud/editoras/crear" element={<CUEditoras />}></Route>
            <Route path="/crud/plataformas/crear" element={<CUPlataformas />}></Route>
            <Route path="/crud/generos/crear" element={<CUGeneros />}></Route>
            {/*PAGINAS DE FRONT*/}
            <Route path="/tienda/noticias" element={<NoticiasTienda />}></Route>
            <Route path="/tienda/catalogo" element={<Catalogo />}></Route>
            <Route path="/tienda/wishlist" element={<WishlistPage />}></Route>
            <Route path="/tienda/carrito" element={<CarritoPage />}></Route>
            <Route path="/tienda/catalogo/producto/:id" element={<ProductoDetalle />}></Route>
            <Route path="/tienda/sobrenosotros" element={<AboutUs />}></Route>
            <Route path="/tienda/soporte" element={<Soporte />}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
        </CarritoProvider>
        </WishlistProvider>
        </ProductosGenerosProvider>
        </RolProvider>
      </UsuarioProvider>
      </ImagenProvider>
      </ProductoProvider>
      </DesarrolladorProvider>
      </EditoraProvider>
      </PlataformaProvider>
      </GeneroProvider>
      </NoticiaProvider>
    </AuthProvider>
  );
}

export default App;
