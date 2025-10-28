export interface Pokemon {
  name: string;
  type: string;
  images: string[];
}

interface Props {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: Props) {
  return `
    <div class="bg-white shadow rounded p-4">
      <h2 class="text-xl font-bold text-center mb-2">${pokemon.name}</h2>
      <div class="text-sm text-gray-600 mb-4">
        <span class="bg-gray-200 px-2 py-1 rounded">${pokemon.type} type</span>
      </div>
      <div class="grid grid-cols-${pokemon.images.length} gap-2">
        ${pokemon.images
          .map(
            (url) => `
          <img class="w-full h-auto rounded shadow-sm" 
               src="${url}" 
               alt="${pokemon.name}"
               loading="lazy" />
        `
          )
          .join("")}
      </div>
    </div>
  `;
}
