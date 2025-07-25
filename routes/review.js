const express=require("express");
const router=express.Router({mergeParams:true});
let WrapAsync=require("../utils/WrapAsync.js");
let Listing=require("../models/listing.js");
let ExpressError=require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
let {reviewSchema}=require("../schema.js");
const { isloggedin,validatereview, isReviewAuthor } = require("../middleware.js");
const reviewcontroller=require("../controller/review.js");

// const validatereview = (req, res, next) => {
//     let { error } = reviewSchema.validate(req.body);
//     if (error) {
//         let errmsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errmsg);
//     }
//     else {
//         next();
//     }

// }

router.post("/",isloggedin, validatereview,reviewcontroller.postreview);

router.delete("/:reviewId",isReviewAuthor, WrapAsync(reviewcontroller.destoryreview))

module.exports=router;