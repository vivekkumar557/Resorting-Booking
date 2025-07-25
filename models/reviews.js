const mongoose=require("mongoose");
let Schema=mongoose.Schema;

let reviewsSchema=new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createAt:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports=mongoose.model("Review",reviewsSchema);