const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//  Connect to MongoDB safely
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(" MongoDB Connected"))
.catch(err => console.log(" DB Error:", err));

// Schema
const shipmentSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  location: String,
  weight: String,
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Courier API running...");
});

app.post("/book", async (req, res) => {
  try {
    const shipment = new Shipment(req.body);
    await shipment.save();
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ error: "Failed to save shipment" });
  }
});

// IMPORTANT: use Render port
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(" Server running on port " + PORT);
});