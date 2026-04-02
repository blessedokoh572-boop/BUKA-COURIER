export default function handler(req, res) {
  if (req.method === "POST") {
    const { trackingNumber } = req.body;

    if (!trackingNumber) {
      return res.status(400).json({ message: "Tracking number required" });
    }

    // Simulated tracking system
    return res.status(200).json({
      status: "In Transit",
      location: "Lagos, Nigeria",
      estimatedDelivery: "2-3 Days"
    });
  }

  res.status(405).json({ message: "Method Not Allowed" });
}