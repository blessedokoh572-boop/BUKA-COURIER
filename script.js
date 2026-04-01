// Wake server automatically
fetch("https://buka-courier.onrender.com");

// CREATE SHIPMENT
async function createShipment() {
  try {
    let shipment = {
      trackingId: Math.random().toString(36).substring(7),
      sender: document.getElementById("sender").value,
      receiver: document.getElementById("receiver").value,
      pickup: document.getElementById("pickup").value,
      destination: document.getElementById("destination").value,
      weight: document.getElementById("weight").value,
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

  } catch (error) {
    alert("Error booking shipment");
    console.error(error);
  }
}


// TRACK SHIPMENT
async function track() {
  const id = document.getElementById("trackID").value;
  const result = document.getElementById("trackResult");
  const timeline = document.getElementById("timeline");

  result.innerHTML = " Checking...";
  timeline.style.display = "none";

  try {
    const res = await fetch(`https://buka-courier.onrender.com/api/track/${id}`);

    if (res.status === 404) {
      result.innerHTML = " Tracking ID not found";
      return;
    }

    const data = await res.json();

    result.innerHTML = `
       Sender: ${data.sender} <br>
       Receiver: ${data.receiver} <br>
       Address: ${data.address} <br>
       Status: ${data.status}
    `;

    timeline.style.display = "block";

    // Reset all
    document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));

    if (data.status === "Pending") {
      step1.classList.add("active");
    } else if (data.status === "In Transit") {
      step1.classList.add("active");
      step2.classList.add("active");
    } else if (data.status === "Out for Delivery") {
      step1.classList.add("active");
      step2.classList.add("active");
      step3.classList.add("active");
    } else if (data.status === "Delivered") {
      step1.classList.add("active");
      step2.classList.add("active");
      step3.classList.add("active");
      step4.classList.add("active");
    }

  } catch {
    result.innerHTML = " Try again...";
  }
}