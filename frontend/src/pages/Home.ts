import { generateImage } from "../api/imageGen";
import { PokemonCard, Pokemon } from "../components/PokemonCard";

const animals = ["Cat", "Dog", "Dragon"];
const abilities = ["Fire", "Ice", "Electric"];
const app = document.getElementById("app")!;

app.innerHTML = `
  <h1 class="text-3xl font-bold text-center mb-4">Create your Pokemon</h1>
  <div class="flex flex-col gap-2 mb-4">
    <select id="animal" class="p-2 border rounded">${animals.map(a => `<option>${a}</option>`).join("")}</select>
    <select id="ability" class="p-2 border rounded">${abilities.map(a => `<option>${a}</option>`).join("")}</select>
    <button id="generateBtn" class="bg-blue-500 text-white p-2 rounded">Generate</button>
  </div>
  <div id="results" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
`;

const generateBtn = document.getElementById("generateBtn")!;
const results = document.getElementById("results")!;

generateBtn.addEventListener("click", async () => {
  const animal = (document.getElementById("animal") as HTMLSelectElement).value;
  const ability = (document.getElementById("ability") as HTMLSelectElement).value;
  const name = `${animal}-${ability}`;

  const pokemon: Pokemon = { name, animal, ability };
  pokemon.imageUrl = await generateImage(`${animal} ${ability} cute illustration`);

  results.innerHTML += PokemonCard({ pokemon });
});
