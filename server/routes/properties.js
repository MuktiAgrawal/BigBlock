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
        // console.log(req.body);
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
        console.log("here")
        const properties1=await getProperties(req);
        const pageNumber = parseInt(req.query.page) || 1; // Extract page number from request query parameters
        const propertiesPerPage = parseInt(req.query.perPage) || 20; // Extract properties per page from request query parameters
        const count=properties1.length;
        const startIndex=(pageNumber - 1) * propertiesPerPage;
        const endIndex=Math.min(startIndex + propertiesPerPage, count);
        const properties = [];
        for (let i = startIndex; i < endIndex; i++) {
            properties.push(properties1[i]);
        }
        // console.log(properties[0]);
        //     .limit(propertiesPerPage);
        // const count = await PropertyModel.countDocuments();
        // const properties = await PropertyModel.find()
        //     .skip((pageNumber - 1) * propertiesPerPage)
        //     .limit(propertiesPerPage);
        // console.log(count);
        // console.log(properties.length)
        return res.status(200).json({ properties ,count});
    } catch (error) {
        console.error('Error fetching page properties:', error);
        return res.status(500).json({ message: 'Failed to fetch page properties' });
    }
};

const getProperties=async(req,res)=>{
    try{
        // console.log("here")
        let furnished=req.query.furnished;
        if(furnished===undefined || furnished==='false'){
            furnished={$in:[false,true]};
        }
        let garden=req.query.garden;
        if(garden===undefined || garden==='false'){
            garden={$in:[false,true]};
        }
        let tennis=req.query.tennis;
        if(tennis===undefined || tennis==='false'){
            tennis={$in:[false,true]};
        }
        let theatre=req.query.theatre;
        if(theatre===undefined || theatre==='false'){
            theatre={$in:[false,true]};
        }
        let parking=req.query.parking;
        if(parking===undefined || parking==='false'){
            parking={$in:[false,true]};
        }
        let type=req.query.type;
        if(type===undefined || type==='all'){
            type={$in:['sell','rent']}
        }
        else if(type==='rent'){
            type={$in:['rent']}
        }
        else{
            type={$in:['sell']}
        }
        const searchTerm=req.query.searchTerm || "";
        const sort=req.query.sort || "createdAt"
        const order=req.query.order || "desc";
        const properties=await PropertyModel.find({
            name:{$regex:searchTerm, $options:"i"},
            type,
            theatre,
            garden,
            parking,
            furnished,
            tennis
        }).sort(
            {
                [sort]:order
            }
        )
        // console.log(properties)
        return properties;
    }
    catch(err){
        console.log(err);
        return res.json({message:"Error fetching properties"})
    }
}

const getMyProperties=async(req,res)=>{
    try{
        const userId=req.params.userId;
        const properties=await PropertyModel.find({"userRef":userId});
        // console.log(properties);
        return res.status(200).json({message:"User properties retrieved successfully",properties});
    }
    catch(err){
        console.log("Error retrieving my properties from database");
        return res.status(500).json({message:"Failed to fetch user properties"})
    }
}
const deleteProperty=async(req,res)=>{
    try{
        const propertyId=req.params.propertyId;
        await PropertyModel.deleteOne({_id:propertyId});
        return res.status(200).json({message:"Property deleted successfully"});
    }
    catch(err){
        console.log("Error deleting property from database");
        return res.status(500).json({message:"Failed to delete property"})
    }
}
const updateProperty=async(req,res)=>{
    try{
        const prop=await PropertyModel.findById(req.params.propertyId);
        if(!prop){
            return res.status(404).json({message:"Property not found"});
        }
        if(prop.userRef !==req.userId){
            return res.status(401).json({message:"You can only update your own properties."})
        }
        const updatedProperty=await PropertyModel.findByIdAndUpdate(
            req.params.propertyId,
            req.body,
            {new:true}
        );
        return res.status(201).json({message:"Successfully updated",updatedProperty})
    }
    catch(err){
        console.log(err);
        
    }
}

router.post("/add-property/:userId", authenticateJWT,createProperty);
router.get("/each/:propertyId",getProperty);
router.get("/",getPageProperties);
router.get("/my-property/:userId",authenticateJWT,getMyProperties);
router.delete("/my-property/deleteProperty/:propertyId",authenticateJWT,deleteProperty)
router.post("/my-property/updateProperty/:propertyId",authenticateJWT,updateProperty)

export {router as propertyRouter}