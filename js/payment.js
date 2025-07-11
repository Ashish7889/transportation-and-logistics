document.addEventListener("DOMContentLoaded", () => {
  const form         = document.getElementById("paymentForm");
  const err          = document.getElementById("paymentError");
  const finalFareEl  = document.getElementById("finalFare");

  // Display last fare
  const lastFareRaw = localStorage.getItem("lastFare") || "0.00";
  const lastFare    = parseFloat(lastFareRaw).toFixed(2);
  finalFareEl.textContent = lastFare;

  form.addEventListener("submit", e => {
    e.preventDefault();
    err.textContent = "";

    const nameField   = document.getElementById("name").value.trim();
    const cardField   = document.getElementById("card-number").value.trim();
    const cvvField    = document.getElementById("cvv").value.trim();

    // Check if fare was calculated
    if (parseFloat(lastFare) <= 0) {
      err.textContent = "Please calculate your fare before making a payment.";
      return;
    }

    // Empty fields
    if (!nameField || !cardField || !cvvField) {
      err.textContent = "All fields are required.";
      return;
    }

    // Name validation (letters and space only)
    if (!/^[a-zA-Z ]{2,50}$/.test(nameField)) {
      err.textContent = "Enter a valid cardholder name (letters and spaces only).";
      return;
    }

    // Card number: exactly 16 digits
    if (!/^\d{16}$/.test(cardField)) {
      err.textContent = "Card number must be 16 digits.";
      return;
    }

    // CVV: exactly 3 digits
    if (!/^\d{3}$/.test(cvvField)) {
      err.textContent = "CVV must be 3 digits.";
      return;
    }

    // --- Record the payment ---
    const payments = JSON.parse(localStorage.getItem("payments") || "[]");
    payments.push({
      id: Date.now(),
      amount: lastFare,
      cardHolder: nameField,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("payments", JSON.stringify(payments));

    // Prevent double submission by clearing fare
    localStorage.removeItem("lastFare");

    alert("Payment Successful!");
    window.location.href = "index.html";
  });
});
