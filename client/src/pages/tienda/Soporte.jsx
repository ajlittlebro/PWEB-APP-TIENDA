import React from 'react';

function Soporte() {
  const toggleDropdown = (id) => {
    var dropdown = document.getElementById(id);
    dropdown.classList.toggle('hidden');
  };

  return (
    <html lang="es">
    <body className=" text-white p-4">
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
      <h1 className="text-4xl font-bold mb-6 text-purple-500">Soporte</h1>
        <p className="text-lg text-white mb-4 text-right">Contáctanos o lee las preguntas frecuentes de la comunidad abajo</p>

        <header className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    
                    <div className="flex items-center">
                        <p className="text-5xl text-orange-500 font-bold mr-2">¿Necesitas ayuda técnica?</p>
                        <div className="border-l-4 border-orange-500 h-12"></div>
                    </div>
                </div>
                <div className="text-right ml-4">
                    <p className="text-lg text-white mb-1">Correo: soporte@tienda.com</p>
                    <p className="text-md text-white mb-0">Calle, No. Casa, Colonia, Ciudad, Provincia, CP, México</p>
                </div>
            </div>
        </header>

        <section className="mb-8">
            <h2 className="text-2xl text-white font-bold mb-4">Preguntas Frecuentes</h2>
            <ul className="list-disc pl-4">
                <li className="mb-4">
                    <button className="focus:outline-none border-b-2 border-purple-500 py-2 text-white rounded-md shadow-md" onClick={() => toggleDropdown('dropdown1')}>
                        <span className="text-orange-500">¿Cómo realizo una devolución?</span>
                    </button>
                    <div id="dropdown1" className="hidden mt-2 text-white">
                        <p className="border-l-2 border-orange-500 pl-4 py-2">Pregunta 1: Para realizar una devolución, por favor sigue los siguientes pasos...</p>
                    </div>
                </li>
                <li className="mb-4">
                    <button className="focus:outline-none border-b-2 border-purple-500 py-2 text-white rounded-md shadow-md" onClick={() => toggleDropdown('dropdown2')}>
                        <span className="text-orange-500">¿Cómo cambio mi contraseña?</span>
                    </button>
                    <div id="dropdown2" className="hidden mt-2 text-white">
                        <p className="border-l-2 border-orange-500 pl-4 py-2">Pregunta 2: Para cambiar tu contraseña, sigue estos pasos...</p>
                    </div>
                </li>
                <li className="mb-4">
                    <button className="focus:outline-none border-b-2 border-purple-500 py-2 text-white rounded-md shadow-md" onClick={() => toggleDropdown('dropdown3')}>
                        <span className="text-orange-500">¿Cómo contacto al servicio al cliente?</span>
                    </button>
                    <div id="dropdown3" className="hidden mt-2 text-white">
                        <p className="border-l-2 border-orange-500 pl-4 py-2">Pregunta 3: Puedes contactar a nuestro servicio al cliente llamando al número...</p>
                    </div>
                </li>
                <li className="mb-4">
                    <button className="focus:outline-none border-b-2 border-purple-500 py-2 text-white rounded-md shadow-md" onClick={() => toggleDropdown('dropdown4')}>
                        <span className="text-orange-500">¿Cómo rastreo mi pedido?</span>
                    </button>
                    <div id="dropdown4" className="hidden mt-2 text-white">
                        <p className="border-l-2 border-orange-500 pl-4 py-2">Pregunta 4: Para rastrear tu pedido, inicia sesión en tu cuenta y ve a la sección de...</p>
                    </div>
                </li>
            </ul>
        </section>

        

    </body>

    </html>
  );
}

export default Soporte;