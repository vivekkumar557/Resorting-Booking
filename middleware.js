const Listing=require("./models/listing");
let ExpressError=require("./utils/ExpressError.js");
let {listingSchema}=require("./schema.js");
let {reviewSchema}=require("./schema.js");
let Review=require("./models/reviews");
const reviews = require("./models/reviews");

module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must logged in to create listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
   if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
   }
   next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser.id)){
        req.flash("error","You don't have the permission to alter the listing");
        return res.redirect(`/listings/${id}`);
      }
      next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id , reviewId}=req.params;
    let review= await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You do't have the access to delete this review");
        return res.redirect(`/listings/${id}`);
      }
      next();
}

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errmsg);
    }
    else{
      next();
    } 
}

module.exports.validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    }
    else {
        next();
    }

}