const express = require("express");
const cors = require("cors");

const app = express();

// MIDDLEWARE FIRST
app.use(cors());
app.use(express.json());

let shipments = [];

// Create shipment
app.post("/ship", (req, res) => {
  shipments.push(req.body);
  res.send({ message: "Shipment saved" });
});

// Track shipment
app.get("/api/track/:id", (req, res) => {
  let shipment = shipments.find(s => s.trackingId === req.params.id);
  res.json(shipment || null);
});

// Home route
app.get("/", (req, res) => {
  res.send("Buka Courier API is running ");
});

// USE RENDER PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});