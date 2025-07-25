const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  listings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
    },
  ],
});

module.exports = mongoose.model('Wishlist', wishlistSchema);

