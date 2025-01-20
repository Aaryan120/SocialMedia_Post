// const { io } = require("../index");
const User = require("../models/User");
const imageUploader = require("../utils/imageUploader");
require("dotenv").config();


exports.addImages = async (req,res,io) =>{
    try {
        // console.log("PRINTING REQ FILES",req.files)
        const {name,handle} = req.body;
        const images = Object.values(req.files).map(file => file);
        // console.log(name);
        // console.log(handle);
        // console.log(images);
        // validate the data
        if(
            !name ||
            !handle || 
            !images
        ){
            return res.status(404).json({
                success:false,
                message:"All fields are mandatory",
            })
        }

        // upload image to cloudinary
        const imageResult = await imageUploader(images,process.env.FOLDER_NAME);
        // console.log("PRINTING THE IMAGE RESULT");

        const imageLinks = imageResult.map((image) =>{
            return image.secure_url
        })
        // create the entry in user database
        const userDetails = await User.create({
            name,
            handle,
            images: imageLinks,
        })

        // console.log("Io:",io);
        io.emit("newSubmission",userDetails)


        return res.status(200).json({
            success:true,
            message:"Details Uploaded Successfully",
            data:userDetails,
        })
    } catch (error) {
        console.log("Error uploading the details,Please try again later",error);
        return res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR"
        })
    }
}