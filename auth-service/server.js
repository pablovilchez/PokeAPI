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
  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "1h" });
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

app.listen(8080, () => console.log("✅ Auth service on http://localhost:8080"));
