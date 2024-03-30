import express from "express"
import {authenticateJWT} from "./users.js"
import {PropertyModel} from "../models/Properties.js"

const router=express.Router();


const createProperty=async (req,res, next)=>{
    console.log("inside create property")
    try{
        if(req.userId==null){
            res.json({ message: "User not logged in" });
        }
        else{
            const property=await PropertyModel.create(req.body);
            return res.status(201).json(property);
        }
    }catch(err){
        next(err);
        console.log(err);
    }
}

router.post("/add-property/:userId", authenticateJWT,createProperty);
export {router as propertyRouter}