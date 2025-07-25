const express=require("express");
const router=express.Router();
let User=require("../models/user.js");
let WrapAsync=require("../utils/WrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const Usercontroller=require("../controller/user.js")

router.route("/signup")
.get(Usercontroller.signupform)
.post(WrapAsync(Usercontroller.signup));

//router.get("/signup",Usercontroller.signupform);
//router.post("/signup",WrapAsync(Usercontroller.signup));

router.route("/login")
.get(Usercontroller.loginform)
.post(saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/login' , failureFlash:true }),Usercontroller.login);

// router.get("/login",Usercontroller.loginform);
// router.post("/login",saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/login' , failureFlash:true }),Usercontroller.login);

router.get("/logout",Usercontroller.logout);
module.exports=router;