document.addEventListener("DOMContentLoaded", function() {
  // Login functionality
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;
      const storedUser = JSON.parse(localStorage.getItem(username));
      if (storedUser && storedUser.password === password) {
        // Set the current user flag for protected features
        localStorage.setItem("currentUser", username);
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid username or password!");
      }
    });
  }
  
  // Registration functionality with password validation
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const username = document.getElementById("registerUsername").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      
      // Validate: password must be at least 8 characters long and contain at least one special character
      const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
      if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and contain at least one special character!");
        return;
      }
      
      const userData = { username, email, password };
      localStorage.setItem(username, JSON.stringify(userData));
      alert("Registration successful! Please login.");
      window.location.href = "login.html";
    });
  }
});
