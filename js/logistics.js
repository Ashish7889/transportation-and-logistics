// js/logistics.js

document.addEventListener("DOMContentLoaded", () => {
  // Karnataka districts with approximate [lng, lat]
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

  // Populate district selects
  ['pickupSelect', 'dropSelect'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    Object.keys(districtCoords).forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      sel.appendChild(opt);
    });
  });

  // Enforce no past dates
  const dateInput = document.getElementById('orderDate');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  // Multi-step form controls
  const steps = document.querySelectorAll('.step');
  const nextBtns = document.querySelectorAll('.nextBtn');
  const prevBtns = document.querySelectorAll('.prevBtn');
  let currentStep = 0;

  function showStep(i) {
    steps.forEach((s, idx) => s.classList.toggle('active', idx === i));
    document.querySelectorAll('#progressIndicator .step-indicator')
      .forEach((ind, idx) => ind.classList.toggle('active', idx === i));
  }

  nextBtns.forEach(btn => btn.addEventListener('click', () => {
    if (currentStep === 0) {
      const p = document.getElementById('pickupSelect').value;
      const d = document.getElementById('dropSelect').value;
      if (!p || !d) return alert('Please select both pickup and drop districts.');
      if (p === d) return alert('Pickup and drop cannot be the same.');
      // Calculate distance via haversine
      const [lng1, lat1] = districtCoords[p];
      const [lng2, lat2] = districtCoords[d];
      const toRad = deg => deg * Math.PI/180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2;
      const dist = (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
      document.getElementById('distanceInput').value = dist;
    }
    if (currentStep < steps.length - 1) {
      currentStep++;
      if (currentStep === 2) populateSummary();
      showStep(currentStep);
    }
  }));

  prevBtns.forEach(btn => btn.addEventListener('click', () => {
    if (currentStep > 0) { currentStep--; showStep(currentStep); }
  }));

  showStep(currentStep);

  function calculatePrice(distance, weight, vehicle) {
    const base = 2;
    const wCharge = weight * 0.5;
    const mod = vehicle === 'bike' ? 1 : vehicle === 'van' ? 1.5 : 2;
    return (distance * base + wCharge) * mod;
  }

  function populateSummary() {
    const p = document.getElementById('pickupSelect').value;
    const d = document.getElementById('dropSelect').value;
    const date = document.getElementById('orderDate').value;
    const pkg = document.getElementById('packageDetails').value;
    const w = parseFloat(document.getElementById('packageWeight').value);
    const v = document.querySelector('input[name="vehicleType"]:checked').value;
    const dist = parseFloat(document.getElementById('distanceInput').value);
    const price = calculatePrice(dist, w, v).toFixed(2);
    document.getElementById('priceDisplay').textContent = `Calculated Price: ₹${price}`;
    document.getElementById('orderSummary').innerHTML =
      `<p><strong>Pickup:</strong> ${p}</p><p><strong>Drop:</strong> ${d}</p>`+
      `<p><strong>Date:</strong> ${date}</p><p><strong>Package:</strong> ${pkg}</p>`+
      `<p><strong>Vehicle:</strong> ${v}</p><p><strong>Distance:</strong> ${dist} km</p>`;
  }

  document.getElementById('logisticsForm').addEventListener('submit', e => {
    e.preventDefault();
    const p = document.getElementById('pickupSelect').value;
    const d = document.getElementById('dropSelect').value;
    const date = document.getElementById('orderDate').value;
    const pkg = document.getElementById('packageDetails').value;
    const w = parseFloat(document.getElementById('packageWeight').value);
    const v = document.querySelector('input[name="vehicleType"]:checked').value;
    const dist = parseFloat(document.getElementById('distanceInput').value);
    const price = calculatePrice(dist, w, v).toFixed(2);
    const orders = JSON.parse(localStorage.getItem('logisticsOrders') || '[]');
    orders.push({ pickup: p, drop: d, date, packageDetails: pkg, weight: w, vehicleType: v, distance: dist, price, id: Date.now(), status: 'Pending' });
    localStorage.setItem('logisticsOrders', JSON.stringify(orders));
    const notif = document.getElementById('orderNotification');
    notif.textContent = 'Order placed successfully!'; notif.style.color = 'green';
    document.getElementById('logisticsForm').reset(); currentStep = 0; showStep(0);
    loadLogisticsOrders();
  });

  function loadLogisticsOrders() {
    const div = document.getElementById('logisticsOrders');
    const ord = JSON.parse(localStorage.getItem('logisticsOrders') || '[]');
    div.innerHTML = '<h3>Your Logistics Orders</h3>';
    if (!ord.length) return div.innerHTML += '<p>No orders found.</p>';
    ord.forEach(o => {
      const d = document.createElement('div'); d.className = 'booking-item';
      d.innerHTML = `<p><strong>${o.pickup}</strong> → <strong>${o.drop}</strong> on ${o.date}</p>` +
                    `<p>Dist: ${o.distance} km · Price: ₹${o.price} · Status: ${o.status}</p>` +
                    `<button class="btn cancelOrder" data-id="${o.id}">Cancel</button>`;
      div.appendChild(d);
    });
    document.querySelectorAll('.cancelOrder').forEach(b => b.onclick = () => {
      const id = b.dataset.id; let arr = JSON.parse(localStorage.getItem('logisticsOrders')||'[]');
      arr = arr.filter(x => x.id != id); localStorage.setItem('logisticsOrders', JSON.stringify(arr));
      loadLogisticsOrders();
    });
  }
  loadLogisticsOrders();

  // Reviews unchanged
  loadLogisticsReviews = () => {
    const rl = document.getElementById('reviewsList'); const revs = JSON.parse(localStorage.getItem('logisticsReviews')||'[]');
    rl.innerHTML = revs.length ? revs.map(r => `<div class="review-item"><p>Rating: ${r.rating}/5</p><p>${r.text}</p></div>`).join('') : '<p>No reviews yet.</p>';
  };
  document.getElementById('logisticsReviewForm').addEventListener('submit', e => {
    e.preventDefault(); const rt = document.getElementById('logRating').value; const tx = document.getElementById('logReviewText').value;
    const arr = JSON.parse(localStorage.getItem('logisticsReviews')||'[]'); arr.push({ rating: rt, text: tx }); localStorage.setItem('logisticsReviews', JSON.stringify(arr));
    loadLogisticsReviews(); document.getElementById('logisticsReviewForm').reset();
  });
  loadLogisticsReviews();
});