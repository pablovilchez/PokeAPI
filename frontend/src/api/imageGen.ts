interface PokemonGenerationRequest {
  name: string;
  type: string;
  imageStyle: "realistic" | "cartoon" | "pixel-art" | "3d";
  numberOfImages: 1 | 2 | 3 | 4;
}

interface GeneratedPokemon {
  name: string;
  type: string;
  images: string[];
}

async function generateImages(
  name: string,
  type: string,
  style: string,
  count: number
): Promise<string[]> {
  try {
    console.log("Making request to Stable Diffusion local API...");
    const payload = {
      prompt: `Create a ${style} style image of a ${type}-type Pokémon named ${name}. Make it unique and fitting for its type.`,
      steps: 30,
      n_iter: count,
      batch_size: 1,
      width: 512,
      height: 512,
    };

    console.log("Payload for Stable Diffusion:", payload);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
    // Call the backend proxy which will forward to the Stable Diffusion instance to avoid CORS
    const response = await fetch(`${API_URL}/sd/txt2img`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(
      "Stable Diffusion Response:",
      response.status,
      response.statusText
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Stable Diffusion API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(
        `Stable Diffusion Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    // The SD API returns base64 images in `images` array; map to data URLs
    console.log("Stable Diffusion Response:", data);
    return data.images.map((b64: string) => `data:image/png;base64,${b64}`);
  } catch (error) {
    console.error("Error in generateImages:", error);
    throw error;
  }
}

export async function generatePokemonContent({
  name,
  type,
  imageStyle,
  numberOfImages,
}: PokemonGenerationRequest): Promise<GeneratedPokemon> {
  try {
    const images = await generateImages(name, type, imageStyle, numberOfImages);

    return {
      name,
      type,
      images,
    };
  } catch (error) {
    console.error("Error in generatePokemonContent:", error);
    throw error;
  }
}
