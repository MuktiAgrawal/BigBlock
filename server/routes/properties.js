import express from "express"
import {authenticateJWT} from "./users.js"
import {PropertyModel} from "../models/Properties.js"
import cloudinary from "../cloudinaryConfig.js" // Import Cloudinary
import multer from 'multer';

const router=express.Router();
const upload = multer({ dest: 'uploads/' });

const createProperty=async (req,res, next)=>{
    try{
        req.body.userRef=req.userId;
        const property=await PropertyModel.create(req.body);
        const accessToken=req.accessToken;
        return res.status(201).json({accessToken,property,message:"Successfully added property"});
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

router.post('/upload-images', upload.array('images'), async (req, res) => {
    try {
        const imageUrls = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            imageUrls.push(result.secure_url);
        }

        res.json({ success: true, imageUrls });
        } catch (error) {
            console.error('Error uploading images to Cloudinary:', error);
            res.status(500).json({ success: false, message: 'Failed to upload images' });
        }
    });

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
            // console.log(err.name);
            console.log("error",err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    else{
        return res.status(400).json({ message: "Invalid property id" });
    }
}
const getPageProperties = async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 1; // Extract page number from request query parameters
        const propertiesPerPage = parseInt(req.query.perPage) || 20; // Extract properties per page from request query parameters
        const count = await PropertyModel.countDocuments();
        const properties = await PropertyModel.find()
            .skip((pageNumber - 1) * propertiesPerPage)
            .limit(propertiesPerPage);
        // console.log(properties[0]);
        // console.log(count);
        return res.status(200).json({ properties ,count});
    } catch (error) {
        console.error('Error fetching page properties:', error);
        return res.status(500).json({ message: 'Failed to fetch page properties' });
    }
};
router.post("/add-property/:userId", authenticateJWT,createProperty);
router.get("/each/:propertyId",getProperty);
router.get("/",getPageProperties);
export {router as propertyRouter}