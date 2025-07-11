document.addEventListener("DOMContentLoaded", function() {
  console.log("Admin panel loaded. You can add additional admin features here.");

  // Example: Dummy user data (replace with real data or fetch via API)
  const users = [
    { id: 1, username: "john_doe", email: "john@example.com" },
    { id: 2, username: "jane_smith", email: "jane@example.com" }
  ];

  // Get reference to the table body in admin.html (assuming it has <tbody> inside a table with id="adminTable")
  const adminTableBody = document.querySelector("#adminTable tbody");
  
  // Clear existing rows (if any)
  adminTableBody.innerHTML = "";

  // Populate the table with user data
  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.id}</td><td>${user.username}</td><td>${user.email}</td>`;
    adminTableBody.appendChild(row);
  });

  // Additional admin features can be added here, for example:
  // - Sorting the table
  // - Filtering users
  // - Showing stats or charts using a library like Chart.js

  // Example: Log the total number of users
  console.log("Total users:", users.length);
});
