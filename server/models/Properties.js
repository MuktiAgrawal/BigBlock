import mongoose from "mongoose";

const PropertySchema=new mongoose.Schema({
    name: {type: String, required: true},
    description:{type:String , required:true},
    address:{type:String , required:true},
    buy_price:{type:Number},
    rent_price:{type:Number},
    area:{type:Number, required:true},
    bathrooms:{type:Number, required: true},
    bedrooms:{type:Number, required: true},
    furnished:{type:Boolean},
    parking:{type:Boolean},
    garden:{type:Boolean},
    theatre:{type:Boolean},
    tennis:{type:Boolean},
    type:{type:String , required:true},
    imageUrls:{type:Array, required:true},
    userRef:{type:String, required:true}
},{timestamps:true});

export const PropertyModel=mongoose.model("Property",PropertySchema);