const express = require("express");
const app = express();

app.use(express.json());

let shipments = [];

app.post("/ship", (req, res) => {
  shipments.push(req.body);
  res.send({ message: "Shipment saved" });
});

app.get("/track/:id", (req, res) => {
  let shipment = shipments.find(s => s.trackingId === req.params.id);
  res.json(shipment || null);
});

app.listen(3000, () => console.log("Server running on port 3000"));

const cors = require("cors");
app.use(cors());