import express from "express";
import cors from "cors";
import sqlite3pkg from "sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const sqlite3 = sqlite3pkg.verbose();
const dbPath = path.join(__dirname, "..", "portfolio.db");
const db = new sqlite3.Database(dbPath);
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, row) {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const defaultContentPath = path.join(__dirname, "content-default.json");

app.use(express.json({ limit: "2mb" }));
app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, true);
    }
  })
);

app.use("/uploads", express.static(uploadsDir));

await run(
  "CREATE TABLE IF NOT EXISTS admin_users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL)"
);
await run(
  "CREATE TABLE IF NOT EXISTS content(id INTEGER PRIMARY KEY, data TEXT NOT NULL)"
);

const existingAdmin = await get("SELECT id FROM admin_users WHERE username = ?", ["admin"]);
if (!existingAdmin) {
  const passwordHash = await bcrypt.hash("admin123", 10);
  await run("INSERT INTO admin_users(username, password_hash) VALUES (?, ?)", ["admin", passwordHash]);
}

const existingContent = await get("SELECT id, data FROM content WHERE id = 1");
if (!existingContent) {
  const raw = fs.readFileSync(defaultContentPath, "utf-8");
  await run("INSERT INTO content(id, data) VALUES (1, ?)", [raw]);
}

function createToken(userId) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "1d" });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const parts = authHeader.split(" ");
  const token = parts.length === 2 ? parts[1] : null;
  if (!token) {
    res.status(401).json({ error: "Missing token" });
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}


app.put("/api/auth/password", authMiddleware, async (req, res) => {
  try {
    const body = req.body || {};
    const currentPassword = body.currentPassword || "";
    const newPassword = body.newPassword || "";
    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }
    const row = await get("SELECT id, password_hash FROM admin_users WHERE id = ?", [req.userId]);
    if (!row) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const ok = await bcrypt.compare(currentPassword, row.password_hash);
    if (!ok) {
      res.status(400).json({ error: "Current password incorrect" });
      return;
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await run("UPDATE admin_users SET password_hash = ? WHERE id = ?", [hash, req.userId]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to change password" });
  }
});
app.post("/api/auth/login", (req, res) => {
  const body = req.body || {};
  const username = body.username;
  const password = body.password;
  if (!username || !password) {
    res.status(400).json({ error: "Missing credentials" });
    return;
  }
  db.get(
    "SELECT id, password_hash FROM admin_users WHERE username = ?",
    [username],
    async (err, row) => {
      if (err) {
        res.status(500).json({ error: "Database error" });
        return;
      }
      if (!row) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      const ok = await bcrypt.compare(password, row.password_hash);
      if (!ok) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      const token = createToken(row.id);
      res.json({ token });
    }
  );
});

app.get("/api/content", async (req, res) => {
  try {
    const row = await get("SELECT data FROM content WHERE id = 1");
    if (!row) {
      res.status(404).json({ error: "No content" });
      return;
    }
    const data = JSON.parse(row.data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load content" });
  }
});

app.put("/api/content", authMiddleware, async (req, res) => {
  try {
    const data = req.body;
    const json = JSON.stringify(data);
    await run("UPDATE content SET data = ? WHERE id = 1", [json]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save content" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, name);
  }
});

const upload = multer({ storage });

app.post("/api/upload", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  const url = "/uploads/" + req.file.filename;
  res.json({ url });
});

const distDir = path.join(__dirname, "..", "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
