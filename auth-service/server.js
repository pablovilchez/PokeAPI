import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USERS = [{ id: 1, username: "ash", password: "pikachu" }];
const SECRET = "super_secret_poke_key";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ access_token: token });
});

app.get("/verify", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(auth.split(" ")[1], SECRET);
    res.json(decoded);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Proxy endpoint to forward image generation requests to the project's Stable Diffusion instance
app.post("/sd/txt2img", async (req, res) => {
  try {
    // Forward the JSON body to the stable-diffusion server
    const sdRes = await fetch(
      "http://stable-diffusion.42malaga.com:7860/sdapi/v1/txt2img",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const data = await sdRes.json().catch(() => null);
    // Mirror status and return JSON data (or error)
    return res.status(sdRes.status).json(data ?? { error: "No JSON from SD" });
  } catch (err) {
    console.error("Stable Diffusion proxy error:", err);
    return res
      .status(502)
      .json({ error: "Stable Diffusion proxy error", message: String(err) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Auth service on http://localhost:${PORT}`)
);
