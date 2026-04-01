function generateTrackingId() {
  return "BRX" + Math.floor(Math.random() * 1000000);
}

document.getElementById("shipmentForm")?.addEventListener("submit", async function(e) {
  e.preventDefault();

  let shipment = {
    sender: sender.value,
    receiver: receiver.value,
    pickup: pickup.value,
    destination: destination.value,
    weight: weight.value,
    trackingId: generateTrackingId(),
    status: "Processing"
  };

  await fetchawait fetch("https://buka-courier.onrender.com/ship", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(shipment)
  });

  alert("Shipment booked! Tracking ID: " + shipment.trackingId);
});

async function trackPackage() {
  let id = document.getElementById("trackingId").value;

  let res = await fetchlet res = await fetch(`https://buka-courier.onrender.com/track/${id}`);
  let data = await res.json();

  document.getElementById("result").innerText =
    data ? `Status: ${data.status}` : "Not found";
}


