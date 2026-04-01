import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import xss from "xss-clean";
import cors from "cors";

// Simple in-memory state
let lastAutoCloseDate = "";

const DATA_FILE = path.join(process.cwd(), 'data.json');

// Helper to check if currently open based on hours
const getAutoStatus = () => {
  const now = new Date();
  // Convert to Europe/Berlin timezone
  const berlinTimeStr = now.toLocaleString("en-US", { timeZone: "Europe/Berlin", hour12: false });
  const dateObj = new Date(berlinTimeStr);
  
  const day = dateObj.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hour = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const time = hour + minutes / 60;

  // Mo-Do: 14:00 - 22:00 (Days 1-4)
  if (day >= 1 && day <= 4) {
    return time >= 14 && time < 22;
  }
  // Fr-So: 11:30 - 22:00 (Days 5, 6, 0)
  return time >= 11.5 && time < 22;
};

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    foundItems: [
      { id: 1, item: "Schlüsselbund mit rotem Anhänger", date: "Gestern Abend", location: "An der Schänke abgegeben" },
      { id: 2, item: "Kinder-Sonnenbrille (blau)", date: "Vor 2 Tagen", location: "Im Büro hinterlegt" },
      { id: 3, item: "Strickjacke (grau, Gr. M)", date: "Letztes Wochenende", location: "Im Büro hinterlegt" }
    ],
    occupancy: 30,
    showOccupancy: true,
    manualOverride: null
  }, null, 2));
}

let data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

// Initialize state from data file
let manualOverride: boolean | null = data.manualOverride !== undefined ? data.manualOverride : null;
let occupancy = data.occupancy !== undefined ? data.occupancy : 30;
let showOccupancy = data.showOccupancy !== undefined ? data.showOccupancy : true;

function saveData() {
  data.manualOverride = manualOverride;
  data.occupancy = occupancy;
  data.showOccupancy = showOccupancy;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Auto-reset override logic at midnight
setInterval(() => {
  const now = new Date();
  const berlinTimeStr = now.toLocaleString("en-US", { timeZone: "Europe/Berlin", hour12: false });
  const dateObj = new Date(berlinTimeStr);
  
  const currentHour = dateObj.getHours();
  const currentDate = dateObj.toDateString();

  // Reset override at midnight
  if (currentHour === 0 && lastAutoCloseDate !== currentDate) {
    manualOverride = null;
    lastAutoCloseDate = currentDate;
    saveData();
  }
}, 60000);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1-10: Security Headers & Basic Protection
  app.use(helmet({
    contentSecurityPolicy: false, // Handled by Vite in dev, or custom in prod
    crossOriginEmbedderPolicy: false,
  }));
  app.disable('x-powered-by');
  app.use(cors());
  app.use(hpp()); // 11: Prevent HTTP Parameter Pollution
  app.use(xss()); // 12: Data Sanitization against XSS
  app.use(express.json({ limit: '10kb' })); // 13: Limit Body size

  // 14: Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
  });
  app.use("/api/", limiter);

  // API routes FIRST
  app.get("/api/status", (req, res) => {
    const isOpen = manualOverride !== null ? manualOverride : getAutoStatus();
    res.json({ isOpen, isManual: manualOverride !== null, occupancy, showOccupancy });
  });

  app.post("/api/status", (req, res) => {
    const { password, status, newOccupancy, newShowOccupancy } = req.body;
    // 15: Secure Password Check (using env var if possible, fallback to hardcoded for now)
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || "vamela";
    if (password === ADMIN_PASS) {
      if (typeof status === "boolean") {
        manualOverride = status;
      }
      if (typeof newOccupancy === "number") {
        occupancy = newOccupancy;
      }
      if (typeof newShowOccupancy === "boolean") {
        showOccupancy = newShowOccupancy;
      }
      saveData();
      res.json({ success: true, isOpen: manualOverride !== null ? manualOverride : getAutoStatus(), occupancy, showOccupancy });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  });

  app.get("/api/found-items", (req, res) => {
    res.json(data.foundItems || []);
  });

  app.post("/api/found-items", (req, res) => {
    const { password, item, date, location } = req.body;
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || "vamela";
    if (password === ADMIN_PASS) {
      const newItem = {
        id: Date.now(),
        item,
        date,
        location
      };
      if (!data.foundItems) data.foundItems = [];
      data.foundItems.push(newItem);
      saveData();
      res.json({ success: true, item: newItem });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  });

  app.delete("/api/found-items/:id", (req, res) => {
    const { password } = req.body;
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || "vamela";
    if (password === ADMIN_PASS) {
      const id = parseInt(req.params.id);
      if (data.foundItems) {
        data.foundItems = data.foundItems.filter((i: any) => i.id !== id);
        saveData();
      }
      res.json({ success: true });
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
