export interface Pokemon {
  name: string;
  animal: string;
  ability: string;
  imageUrl?: string;
}

interface Props {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: Props) {
  return `
    <div class="bg-white shadow rounded p-4 text-center">
      <h2 class="text-xl font-bold">${pokemon.name}</h2>
      <p>${pokemon.animal} + ${pokemon.ability}</p>
      ${pokemon.imageUrl ? `<img class="mt-2 rounded" src="${pokemon.imageUrl}" alt="${pokemon.name}" />` : ""}
    </div>
  `;
}
