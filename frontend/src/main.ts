import "./style.css";
import { generatePokemonContent } from "./api/imageGen";
import { PokemonCard } from "./components/PokemonCard";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pokemonForm") as HTMLFormElement;
  const resultDiv = document.getElementById("result") as HTMLDivElement;

  if (!form || !resultDiv) {
    console.error("Required elements not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const typeSelect = document.getElementById("type") as HTMLSelectElement;
    const imageStyleSelect = document.getElementById(
      "imageStyle"
    ) as HTMLSelectElement;
    const numberOfImagesSelect = document.getElementById(
      "numberOfImages"
    ) as HTMLSelectElement;

    const submitButton = form.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    submitButton.disabled = true;
    submitButton.textContent = "Generating...";

    try {
      const pokemonData = await generatePokemonContent({
        name: nameInput.value,
        type: typeSelect.value,
        imageStyle: imageStyleSelect.value as
          | "realistic"
          | "cartoon"
          | "pixel-art"
          | "3d",
        numberOfImages: parseInt(numberOfImagesSelect.value) as 1 | 2 | 3 | 4,
      });

      resultDiv.innerHTML = PokemonCard({ pokemon: pokemonData });
    } catch (error) {
      console.error("Error:", error);
      resultDiv.innerHTML = `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Failed to generate Pokémon. Please try again.
        </div>
      `;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Generate Pokémon";
    }
  });
});
