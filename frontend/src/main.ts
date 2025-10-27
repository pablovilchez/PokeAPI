import '../src/style.css'; // Importa los estilos de Tailwind
import Navigo from 'navigo';

// --- Seleccionamos el contenedor principal ---
const appContainer = document.querySelector<HTMLDivElement>('#app');

// --- Comprobación de seguridad ---
if (!appContainer) {
  throw new Error("Error: No se encontró el contenedor principal '#app'");
}

// --- Configuración del Router (Navigo) ---
// Usamos el 'hash' (#) para un enrutamiento simple que funciona sin config de servidor
const router = new Navigo('/', { strategy: 'hash' });

// --- Definición de Páginas (Controladores) ---

/**
 * Renderiza la página principal del generador de Pokémon.
 */
const renderGeneratorPage = () => {
  appContainer.innerHTML = `
    <div class="container mx-auto p-4 max-w-md">
      <header class="text-center my-8">
        <h1 class="text-4xl font-bold text-yellow-400">PokeAPI Generator</h1>
        <p class="text-lg text-gray-300">Crea tu propio Pokémon [cite: 75]</p>
      </header>
      
      <form id="generator-form" class="space-y-4">
        <div>
          <label for="prompt" class="block text-sm font-medium text-gray-300">Describe tu Pokémon:</label>
          <textarea id="prompt" name="prompt" rows="3" class="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 shadow-sm p-2 text-white focus:border-yellow-500 focus:ring-yellow-500"></textarea>
        </div>
        
        <button type="submit" class="w-full bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">
          Generar
        </button>
      </form>
      
      <div id="result-container" class="mt-6">
        </div>
    </div>
  `;
};

/**
 * Renderiza la página que muestra un resultado compartido (usando un ID).
 * @param id El ID del Pokémon generado.
 */
const renderResultPage = (id: string) => {
  appContainer.innerHTML = `
    <div class="container mx-auto p-4 max-w-md text-center">
      <h1 class="text-3xl font-bold mb-4">¡Mira mi Pokémon!</h1>
      <p class="mb-4 text-gray-400">Mostrando Pokémon con ID: ${id}</p>
      
      <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
        <img src="https://via.placeholder.com/300?text=Pokémon+${id}" alt="Pokémon Generado ${id}" class="mx-auto rounded-md" />
      </div>

      <a href="/#" class="inline-block mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-400 transition-colors">
        Crear el mío
      </a>
    </div>
  `;
};

// --- Configuración de Rutas ---
router
  .on({
    '/': renderGeneratorPage, // Ruta raíz
    '/result/:id': (match) => { // Ruta para resultados compartidos
      if (match && match.data) {
        renderResultPage(match.data.id);
      }
    },
  })
  .notFound(() => { // Si no encuentra la ruta
    appContainer.innerHTML = `<h1 class="text-red-500 text-center text-3xl mt-10">404 - Página no encontrada</h1>`;
  })
  .resolve(); // ¡Importante! Inicia el enrutador

console.log('Aplicación inicializada (modo SPA con Hash).');