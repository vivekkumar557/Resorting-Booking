let User=require("../models/user");

module.exports.signupform=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({username,email});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welecome to Wanderlust");
            res.redirect("/listings");
        })
        
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.loginform=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome Back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    //res.redirect(res.locals.redirectUrl);
    console.log(redirectUrl);
    res.redirect(redirectUrl);

}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are succesfully logged out!")
        res.redirect("/listings");
    })
}