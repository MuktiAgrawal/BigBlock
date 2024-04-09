import express from "express"
import {authenticateJWT} from "./users.js"
import {PropertyModel} from "../models/Properties.js"

const router=express.Router();


const createProperty=async (req,res, next)=>{
    console.log("inside create property")
    try{
        console.log(req.body);
        const property=await PropertyModel.create(req.body);
        const accessToken=req.accessToken;
        return res.status(201).json({accessToken,property,message:"Successfully added property"});
    }
    catch(err){
        next(err);
        console.log(err);
    }
}
const getProperty=async(req,res)=>{
    const propertyId = req.params.propertyId;
    if(propertyId){
        try{
            const property=await PropertyModel.findOne({_id:propertyId});
            if(property==null){
                return res.status(404).json({message:"Property not found"})
            }
            else{
                return res.status(200).json({property});
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    else{
        return res.status(400).json({ message: "Invalid property id" });
    }
}
router.post("/add-property/:userId", authenticateJWT,createProperty);
router.get("/each/:propertyId",getProperty);

export {router as propertyRouter}