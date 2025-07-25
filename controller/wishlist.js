const Wishlist = require('../models/wishlist');
const Listing = require('../models/listing');

module.exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const listingId = req.params.id;
    console.log("listing id "+listingId);

    let wishlist = await Wishlist.findOne({ owner: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ owner: userId, listings: [] });
    }

    const index = wishlist.listings.findIndex(item => item.equals(listingId));
    console.log(index);

    if (index === -1) {
      // Add listing to wishlist
      wishlist.listings.push(listingId);
      await wishlist.save();
      return res.json({ added: true });
    } else {
      // Remove listing from wishlist
      wishlist.listings.splice(index, 1);
      await wishlist.save();
      return res.json({ removed: true });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to toggle wishlist' });
  }
};

module.exports.getUserWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    let wishlist = await Wishlist.findOne({ owner: userId }).populate('listings');
    const allwishlist=wishlist.listings;
    if (!wishlist) {
      wishlist = new Wishlist({ owner: userId, listings:[] });
      await wishlist.save();
    }
    
    res.render('listings/wishlist.ejs', { allwishlist });
  } catch (e) {
    req.flash('error', 'Unable to fetch wishlist');
    res.redirect('/listings');
  }
};
