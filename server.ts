import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

// Simple in-memory state
let isOpen = true;
let lastAutoCloseDate = "";

// Auto-close logic at 22:00
setInterval(() => {
  const now = new Date();
  // Convert to Europe/Berlin timezone string to check hour
  const berlinTimeStr = now.toLocaleString("en-US", { timeZone: "Europe/Berlin", hour12: false });
  const dateObj = new Date(berlinTimeStr);
  
  const currentHour = dateObj.getHours();
  const currentDate = dateObj.toDateString();

  // Close at 22:00 (or later) if we haven't closed today
  if (currentHour >= 22 && lastAutoCloseDate !== currentDate) {
    isOpen = false;
    lastAutoCloseDate = currentDate;
  }
}, 60000); // Check every minute

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/status", (req, res) => {
    res.json({ isOpen });
  });

  app.post("/api/status", (req, res) => {
    const { password, status } = req.body;
    if (password === "vamela") {
      if (typeof status === "boolean") {
        isOpen = status;
        res.json({ success: true, isOpen });
      } else {
        res.status(400).json({ error: "Invalid status" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
