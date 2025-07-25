async function fetchWishlist() {
    try {
        const response = await fetch('/wishlist');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const wishlistItems = await response.json();
        console.log(wishlistItems); // Do something with the wishlist items
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
// Call the function to fetch wishlist items
fetchWishlist();
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', async (event) => {
    // Only proceed if the clicked target is inside a heart-icon within a listing card
    const heart = event.target.closest('.listing-card .heart-icon');
    if (!heart) return;

    event.preventDefault();
    

    const listingCard = heart.closest('.listing-card');
    if (!listingCard) return;

    const listingId = listingCard.getAttribute('data-listing-id');
    const listingName = listingCard.getAttribute('data-listing-name') || 'this item';

    if (!listingId) {
      console.error('Listing ID is missing on listing card.');
      return;
    }

    try {
      // Send POST request to backend wishlist toggle route
      const response = await fetch(`/wishlist/toggle/${listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'same-origin',
      });

      if (response.status === 401) {
        alert('Please log in to modify your wishlist.');
        return;
      }

      if (!response.ok) {
        throw new Error(`Wishlist toggle failed with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.added) {
        // Listing was added to wishlist - activate heart icon
        heart.classList.add('active');
        heart.setAttribute('aria-pressed', 'true');
        heart.title = `Remove "${listingName}" from wishlist`;
      } else if (result.removed) {
        // Listing was removed from wishlist - deactivate heart icon
        heart.classList.remove('active');
        heart.setAttribute('aria-pressed', 'false');
        heart.title = `Add "${listingName}" to wishlist`;
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('An error occurred while updating your wishlist. Please try again.');
    }
  });

  // On page load, initialize each heart icon's aria-pressed and title according to active status
  document.querySelectorAll('.listing-card .heart-icon').forEach(heart => {
    const listingCard = heart.closest('.listing-card');
    const listingName = listingCard ? listingCard.getAttribute('data-listing-name') : 'this item';
    if (heart.classList.contains('active')) {
      heart.setAttribute('aria-pressed', 'true');
      heart.title = `Remove "${listingName}" from wishlist`;
    } else {
      heart.setAttribute('aria-pressed', 'false');
      heart.title = `Add "${listingName}" to wishlist`;
    }
  });
});
