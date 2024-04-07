import express from "express"
import {authenticateJWT} from "./users.js"
import {PropertyModel} from "../models/Properties.js"

const router=express.Router();


const createProperty=async (req,res, next)=>{
    console.log("inside create property")
    try{
        console.log(req.body);
        await PropertyModel.create(req.body);
        const accessToken=req.accessToken;
        return res.status(201).json({accessToken,message:"Successfully added property"});
    }
    catch(err){
        next(err);
        console.log(err);
    }
}

router.post("/add-property/:userId", authenticateJWT,createProperty);
export {router as propertyRouter}