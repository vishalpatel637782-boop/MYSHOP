const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Log file path
const logFile = path.join(__dirname, "whatsapp_clicks.log");

// ✅ Homepage route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ API to track WhatsApp clicks
app.post("/api/track-whatsapp", (req, res) => {
  const { platform, timestamp, product } = req.body;

  const logEntry = `[${timestamp}] WhatsApp Clicked | Platform: ${platform} | Product: ${product || "General"}\n`;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      return res.status(500).json({ error: "Failed to log click" });
    }
    console.log("Click logged:", logEntry.trim());
    res.status(200).json({ message: "Click tracked successfully" });
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
