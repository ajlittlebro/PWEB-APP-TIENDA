import React from 'react';

const AboutUs = () => {
  return (
    <div className="text-white font-sans">
      <div class="bg-gray-800 p-4">
    <nav class="container mx-auto px-6 py-4">
    <ul class="flex space-x-8">
            <li>
                <a href="/tienda/catalogo" class="text-white hover:text-gray-300">Catálogo</a>
            </li>
            <li>
                <a href="/tienda/sobrenosotros" class="text-white hover:text-gray-300">Sobre Nosotros</a>
            </li>
            <li>
                <a href="/tienda/noticias" class="text-white hover:text-gray-300">Noticias</a>
            </li>
            
            <li>
                <a href="/tienda/wishlist" class="text-white hover:text-gray-300">Wishlist</a>
            </li>
            <li>
                <a href="/tienda/carrito" class="text-white hover:text-gray-300">Carrito</a>
            </li>
            <li>
                <a href="/tienda/soporte" class="text-white hover:text-gray-300">Soporte</a>
            </li>
        </ul>
    </nav>
</div>
      <div className="container mx-auto flex justify-between items-center px-8">
        <div className="w-1/2">
          <h3 className="text-white text-xl"></h3>
          <h1 className="text-purple-600 text-4xl font-bold mt-2">Nuestra Historia</h1>
          <p className="mt-4 text-lg">
            Una tienda de videojuegos creada por estudiantes con el fin de fomentar la venta de estos de manera eficiente.
            Nos esforzamos por ofrecer una amplia gama de títulos y proporcionar un servicio excepcional para nuestros clientes.
            En nuestra búsqueda por inspirar a los jugadores, hemos creado un espacio donde los sueños se encuentran con la realidad digital,
            donde cada clic es una nueva aventura y cada título un mundo por descubrir. ¡Bienvenidos a nuestra tienda de sueños y aventuras!
          </p>
        </div>
        <div className="w-1/2 flex justify-end py-10">
          <img
            src="../../../upload/imagen.jpg"
            className="rounded-full border-4 border-purple-600"
            alt="Imagen de videojuegos"
            style={{ width: '300px', height: '300px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;