document.addEventListener("DOMContentLoaded", () => {
  // District center coordinates
  const districtCoords = {
    "Bagalkot": [75.6690, 16.1800],
    "Bangalore Rural": [77.5700, 12.8275],
    "Bangalore Urban": [77.5946, 12.9716],
    "Belgaum": [74.4987, 15.8497],
    "Bellary": [76.9330, 15.1394],
    "Bidar": [77.5167, 17.9139],
    "Chamarajanagar": [77.0000, 11.9170],
    "Chikkaballapur": [77.7299, 13.4360],
    "Chikmagalur": [75.7760, 13.3150],
    "Chitradurga": [76.4026, 14.2310],
    "Dakshina Kannada": [74.8460, 12.9141],
    "Davanagere": [75.9200, 14.4667],
    "Dharwad": [75.1290, 15.4589],
    "Gadag": [75.6250, 15.4333],
    "Gulbarga": [76.8343, 17.3297],
    "Hassan": [76.0970, 13.0050],
    "Haveri": [75.4040, 14.7970],
    "Kodagu": [75.7260, 12.3370],
    "Kolar": [78.1300, 13.1367],
    "Koppal": [76.1630, 15.3450],
    "Mandya": [76.8950, 12.5230],
    "Mysore": [76.6394, 12.2958],
    "Raichur": [77.3403, 16.2089],
    "Ramanagara": [77.2800, 12.7319],
    "Shimoga": [75.5681, 13.9299],
    "Tumkur": [77.1000, 13.3400],
    "Udupi": [74.7421, 13.3409],
    "Uttara Kannada": [74.4277, 14.6160],
    "Vijayapura": [75.7144, 16.8306],
    "Yadgir": [77.1250, 16.7710]
  };

  // Populate district <select> elements
  ['pickupInput', 'dropInput'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    Object.keys(districtCoords).forEach(district => {
      const opt = document.createElement('option');
      opt.value = district;
      opt.textContent = district;
      sel.appendChild(opt);
    });
  });

  // Date input: enforce no past dates
  const dateInput = document.getElementById('rideDate');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  // Element references
  const pickupEl = document.getElementById('pickupInput');
  const dropEl   = document.getElementById('dropInput');
  const distEl   = document.getElementById('distanceInput');
  const fareRes  = document.getElementById('fareResult');
  const fareBtn  = document.getElementById('calculateFare');
  const proceed  = document.getElementById('proceedPayment');
  const form     = document.getElementById('bookingForm');

  // Haversine formula
  function haversine([lng1, lat1], [lng2, lat2]) {
    const toRad = d => d * Math.PI / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2)**2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // Calculate distance & fare
  fareBtn.addEventListener('click', () => {
    const p = pickupEl.value;
    const d = dropEl.value;
    if (!p || !d) return alert('Please select both pickup and drop districts.');
    if (p === d) return alert('Pickup and drop cannot be the same.');
    if (!dateInput.value) return alert('Please choose a ride date.');

    const km = haversine(districtCoords[p], districtCoords[d]).toFixed(2);
    distEl.value = km;

    const fare = 50 + (km * 20);
    fareRes.textContent = `Estimated Fare: ₹${fare.toFixed(2)}`;
    localStorage.setItem('lastFare', fare.toFixed(2));
  });

  // Handle booking submission
  form && form.addEventListener('submit', e => {
    e.preventDefault();
    const p = pickupEl.value;
    const d = dropEl.value;
    const dt = dateInput.value;
    const km = distEl.value;
    const ft = fareRes.textContent;

    if (!p || !d || !km || !dt || !ft.startsWith('Estimated Fare')) {
      return alert('Please complete all fields and calculate fare before booking.');
    }

    const booking = {
      pickup: p,
      drop: d,
      date: dt,
      distance: km,
      fare: ft.replace(/\D/g, ''),
      id: Date.now()
    };

    const arr = JSON.parse(localStorage.getItem('bookings') || '[]');
    arr.push(booking);
    localStorage.setItem('bookings', JSON.stringify(arr));

    alert('Booking successful!');
    form.reset();
    fareRes.textContent = '';
  });

  // Proceed to payment
  proceed && proceed.addEventListener('click', () => {
    const fare = parseFloat(localStorage.getItem('lastFare') || '0');
    if (fare <= 0) return alert('Calculate fare before proceeding to payment.');
    window.location.href = 'payment.html';
  });

  // Unchanged: booking history, passenger profile, and modal logic go below
});