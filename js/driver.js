// js/driver.js
document.addEventListener("DOMContentLoaded", () => {
  const ordersList = document.getElementById("ordersList");
  if (!ordersList) return;

  // Fetch the bookings array from localStorage
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  if (bookings.length === 0) {
    ordersList.innerHTML = "<p>No rides booked yet.</p>";
  } else {
    // Build a list of bookings
    const ul = document.createElement("ul");
    ul.className = "order-list";
    bookings.forEach(b => {
      const li = document.createElement("li");
      li.className = "order-item";
      li.innerHTML = `
        <p><strong>Pickup:</strong> ${b.pickup}</p>
        <p><strong>Drop:</strong> ${b.drop}</p>
        <p><strong>Date:</strong> ${b.date}</p>
        <p><strong>Distance:</strong> ${b.distance} km</p>
        <p><strong>Fare:</strong> ₹${parseFloat(b.fare).toFixed(2)}</p>
      `;
      ul.appendChild(li);
    });
    ordersList.appendChild(ul);
  }
});
