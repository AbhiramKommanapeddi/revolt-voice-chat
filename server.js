const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server running");
});

// /voice endpoint
app.post("/voice", (req, res) => {
  const { audioInput, conversationId } = req.body;

  console.log("Received audio input:", audioInput);
  console.log("Conversation ID:", conversationId);

  // Save audio to a .wav file
  if (audioInput) {
    try {
      const base64Data = audioInput.split(",")[1]; // remove "data:audio/wav;base64," prefix
      const fileName = `recorded_${Date.now()}.wav`;
      fs.writeFileSync(fileName, base64Data, "base64");
      console.log(`Saved audio file: ${fileName}`);
    } catch (err) {
      console.error("Error saving audio file:", err);
      return res.status(500).json({ error: "Failed to save audio" });
    }
  }

  res.json({
    message: "Audio received and saved successfully!",
    conversationId: conversationId || "1234",
  });
});

// Fallback route for invalid endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
