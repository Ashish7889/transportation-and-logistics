document.addEventListener("DOMContentLoaded", function() {
    const reviewForm = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");
    
    function loadReviews() {
      let reviews = JSON.parse(localStorage.getItem("driver_reviews")) || [];
      reviewsList.innerHTML = "";
      if (reviews.length === 0) {
        reviewsList.innerHTML = "<p>No reviews yet.</p>";
      } else {
        reviews.forEach(function(review) {
          let reviewItem = document.createElement("div");
          reviewItem.className = "review-item";
          reviewItem.innerHTML = `<p><strong>Rating:</strong> ${review.rating} / 5</p>
                                  <p>${review.text}</p>`;
          reviewsList.appendChild(reviewItem);
        });
      }
    }
    
    loadReviews();
    
    if (reviewForm) {
      reviewForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const rating = document.getElementById("rating").value;
        const reviewText = document.getElementById("reviewText").value;
        let reviews = JSON.parse(localStorage.getItem("driver_reviews")) || [];
        reviews.push({ rating, text: reviewText });
        localStorage.setItem("driver_reviews", JSON.stringify(reviews));
        loadReviews();
        reviewForm.reset();
      });
    }
  });
  