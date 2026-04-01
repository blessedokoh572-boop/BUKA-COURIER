// Create shipment
async function createShipment() {
  let shipment = {
    trackingId: Math.random().toString(36).substring(7),
    status: "Processing"
  };

  await fetch("https://buka-courier.onrender.com/ship", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(shipment)
  });

  alert("Shipment booked! Tracking ID: " + shipment.trackingId);
}


// Track shipment
async function trackPackage() {
  let id = document.getElementById("trackingId").value;

  let res = await fetch(`https://buka-courier.onrender.com/api/track/${id}`);
  let data = await res.json();

  document.getElementById("result").innerText =
    data ? `Status: ${data.status}` : "Not found";
}