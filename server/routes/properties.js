import express from "express"
import {authenticateJWT} from "./users"
import {PropertyModel} from "../models/Properties.js"

const router=express.Router();

router.post("/create", authenticateJWT,createProperty);

const createProperty=async (req,res, next)=>{
    try{
        if(req.userId==null){
            return res.status(401).json({message:"User not logged in"});
        }
        else{
            const property=await PropertyModel.create({});
            return res.status(201).json(property);
        }
    }catch(err){
        next(err);
        console.log(err);
    }
}

export {router as propertyRouter}