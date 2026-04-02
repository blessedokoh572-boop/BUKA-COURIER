// Wake backend
fetch("https://buka-courier.onrender.com");

// SCROLL
function scrollToTrack() {
  document.getElementById("track").scrollIntoView({
    behavior: "smooth"
  });
}

// CREATE SHIPMENT
async function createShipment() {
  const shipment = {
    trackingId: Math.random().toString(36).substring(2, 10),
    sender: document.getElementById("sender").value,
    receiver: document.getElementById("receiver").value,
    pickup: document.getElementById("pickup").value,
    destination: document.getElementById("destination").value,
    weight: document.getElementById("weight").value,
    status: "Processing"
  };

  const res = await fetch("https://buka-courier.onrender.com/ship", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(shipment)
  });

  const data = await res.json();
  alert("Tracking ID: " + data.trackingId);
}

// TRACK SHIPMENT
async function trackShipment() {
  const id = document.getElementById("trackId").value;

  const res = await fetch(`https://buka-courier.onrender.com/track/${id}`);
  const data = await res.json();

  if (data.error) {
    document.getElementById("result").innerHTML = "❌ Shipment not found";
  } else {
    document.getElementById("result").innerHTML = `
      <strong>Sender:</strong> ${data.sender}<br>
      <strong>Receiver:</strong> ${data.receiver}<br>
      <strong>From:</strong> ${data.pickup}<br>
      <strong>To:</strong> ${data.destination}<br>
      <strong>Status:</strong> 
      <span style="color:green;font-weight:bold;">
        ${data.status}
      </span>
    `;
  }
}