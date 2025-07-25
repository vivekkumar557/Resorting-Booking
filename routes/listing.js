const express=require("express");
const router=express.Router();
let WrapAsync=require("../utils/WrapAsync.js");
// let Listing=require("../models/listing.js");
// let ExpressError=require("../utils/ExpressError.js");
// let {listingSchema}=require("../schema.js");
let {isloggedin, isOwner,validateListing}=require("../middleware.js");
let listingcontroller=require("../controller/listing.js");
const multer  = require('multer');
const {storage}=require("../CloudConfig.js");
const upload = multer({storage});


// const validateListing=(req,res,next)=>{
//     let {error}=listingSchema.validate(req.body);
//     if(error){
//       let errmsg=error.details.map((el)=>el.message).join(",");
//       throw new ExpressError(400,errmsg);
//     }
//     else{
//       next();
//     }
  
// }

router.route("/")
.get(WrapAsync(listingcontroller.index))
.post(isloggedin,upload.single('listing[image]'),validateListing, WrapAsync(listingcontroller.createlisting));

router.get("/new",isloggedin,WrapAsync(listingcontroller.renderform));

router.route("/:id")
.get(isloggedin,WrapAsync(listingcontroller.showlisting))
.put(isloggedin,isOwner,upload.single('listing[image]'),validateListing,WrapAsync(listingcontroller.updatelisting))
.delete(isOwner,isloggedin,WrapAsync(listingcontroller.destorylisting));
//router.get("/",WrapAsync(listingcontroller.index));
//router.get("/:id",isloggedin,WrapAsync(listingcontroller.showlisting));
//router.post("/",validateListing, WrapAsync(listingcontroller.createlisting));
router.get("/:id/edit",isOwner,isloggedin,WrapAsync(listingcontroller.editlistings))
//router.put("/:id",isOwner,isloggedin,validateListing,WrapAsync(listingcontroller.updatelisting));
//router.delete("/:id",isOwner,isloggedin,WrapAsync(listingcontroller.destorylisting));
router.post("/search",WrapAsync(listingcontroller.searchlisting));
module.exports=router;