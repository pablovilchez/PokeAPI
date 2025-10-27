// Simple wrapper para llamar a la API de generación de imágenes
export async function generateImage(prompt: string): Promise<string> {
  const API_URL = "TU_API_URL"; // sustituye con la URL que te dieron
  const API_KEY = import.meta.env.VITE_API_KEY; // key segura en .env

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  return data.image_url; // ajusta según la respuesta de tu API
}
