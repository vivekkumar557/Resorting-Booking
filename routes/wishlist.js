const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlist');
const { isloggedin } = require('../middleware.js');

// Toggle listing in wishlist
router.post('/toggle/:id', isloggedin, wishlistController.toggleWishlist);

// View user's wishlist
router.get('/wish', isloggedin, wishlistController.getUserWishlist);

module.exports = router;
