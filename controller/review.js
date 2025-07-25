const Listing=require("../models/listing");
const Review=require("../models/reviews");

module.exports.postreview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    console.log(req.body);
    let newreview = new Review(req.body.review);
    newreview.author=req.user._id;
    console.log(newreview)
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destoryreview=async (req, res) => {
    let { id, reviewId } = req.params;
    console.log(id, reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findById(reviewId);
    res.redirect(`/listings/${id}`);
}