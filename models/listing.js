const mongoose=require("mongoose");
let Schema=mongoose.Schema;
const Review=require("./reviews.js");
const { ref } = require("joi");

let listingschema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    Type:String,
    price:Number,
    location:String,
    country:String,
    phone:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }
});



const Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;