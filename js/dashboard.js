document.addEventListener("DOMContentLoaded", function() {
  const ctx = document.getElementById('rideChart').getContext('2d');
  const rideChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Number of Rides',
        data: [12, 19, 3, 5, 2, 3, 7],  // Replace with dynamic data if needed.
        backgroundColor: 'rgba(255,87,34,0.6)',
        borderColor: 'rgba(255,87,34,1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
