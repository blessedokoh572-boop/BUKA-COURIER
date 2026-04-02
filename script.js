function trackPackage() {
  const trackingNumber = document.getElementById("trackingInput").value;

  fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ trackingNumber })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerHTML = `
        <h3>Status: ${data.status}</h3>
        <p>Location: ${data.location}</p>
        <p>Delivery: ${data.estimatedDelivery}</p>
      `;
    })
    .catch(err => {
      document.getElementById("result").innerHTML = "Error tracking package";
    });
}