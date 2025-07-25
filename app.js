require('dotenv').config();
console.log(process.env)
const express=require("express");
const app=express();
const mongoose=require("mongoose");
let path=require("path");
let methodOverride=require("method-override");
let ejsMate = require('ejs-mate');
let ExpressError=require("./utils/ExpressError.js");
const port=8080;

//structuring and destructuring
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const wishlistRouter = require('./routes/wishlist.js');

const session=require("express-session");
const flash=require("connect-flash");

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User = require("./models/user.js");

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
// main().then(()=>{
//     console.log("connected DB");
// })
// .catch((err)=>{
//     console.log(err);
// })
// async function main(){
//     await mongoose.connect(MONGO_URL);
    
// }
const dburl=process.env.ATLASDB_URL;
// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }
mongoose.connect(dburl);


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

//Cookies
let sessionOption={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
   expires:Date.now()+ 7*24*60*60*1000,
   maxAge:7*24*60*60*1000,
   httpOnly:true,
  }
}
app.use(session(sessionOption));//creating session

app.use(flash());//alert message

//authentication of data
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(port,()=>{
    console.log(`The server has started at port number ${port}`);
});
 
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

// app.get("/demo",async(req,res)=>{
//     let fakeUser=new User({
//         email:"rohitverma@gmail.com",
//         username:"rohitverma"
//     })
//  let registerUser=await User.register(fakeUser,"helloworld");
//     console.log(registerUser);
//     res.send(registerUser)
// })

//Structuring and destructuring
app.get("/",(req,res)=>{
    res.redirect("/listings");
})
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use('/wishlist', wishlistRouter);
app.use("/",userRouter);




//Handles errors
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
    console.log(statusCode,message);
    res.status(statusCode).render("error.ejs",{err});
})

  

// app.get("/testlisting",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute , Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("testing successful"); 
// })