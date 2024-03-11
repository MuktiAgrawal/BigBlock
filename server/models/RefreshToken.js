import mongoose from "mongoose";

const RefreshSchema=new mongoose.Schema({
    refreshToken:{type:String,unique:true}
});
export const RefreshModel=mongoose.model("refresh",RefreshSchema);