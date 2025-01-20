const AdminSchema = require("../models/AdminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.adminRegister = async (req,res) =>{
    try {
        // fetch the data from req body
        const {username,password} = req.body;
        // validate the data
        if(
            !username ||
            !password
        ){
            return res.status(404).json({
                success:false,
                message:"All fields are mandatory"
            })
        }
        // validate if user already exists
        const userExists = await AdminSchema.find({username:username});
        if(userExists.length > 0){
            return res.status(401).json({
                success:false,
                message:"User already exists with the username",
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const adminDetails = await AdminSchema.create({
            username,
            password:hashedPassword,
        })
        return res.status(200).json({
            success:true,
            message:"Admin registered Successfully",
            data:adminDetails
        })
    } catch (error) {
        console.log("Error registering admin",error);
        return res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR"
        })
    }
}
exports.adminLogin = async(req,res) =>{
    try {
        // fetch the details from request body
        const {username,password} = req.body;
        console.log("PRINTING REQUEST BODY",req.body);
        // validate the data
        if(
            !username || 
            !password
        ){
            return res.status(404).json({
                success:false,
                message:"All fields are mandatory",
            })
        }
        // fetch the admin details(based on username as primary key)
        const adminDetails = await AdminSchema.findOne({username:username});

        if(!adminDetails){
            return res.status(401).json({
                success:false,
                message:"No admin exists with given username",
            })
        }
        // match the passwords
        if(await bcrypt.compare(password,adminDetails.password)){
            // password matched
            const payload = {
                username:username,
                id:adminDetails._id,
                role:"admin",
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h"
            })

            res.status(200).json({
                success:true,
                message:"logged in successfully",
                token,
            })
        }
        else{
            return res.status(401).json({
                success:true,
                message:"Password is incorrect",
            })
        }
    } catch (error) {
        console.log("Error while logging in",error);
        return res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR",
        })
    }
}
exports.adminDashboard = async (req,res) =>{
    try {
        // fetch the details of users
        const userDetails = await User.find();
        return res.status(200).json({
            success:true,
            message:"User Details Found",
            data: userDetails,
        })
    } catch (error) {
        console.log("Error In admin dashboard",error);
        return res.status(500).json({
            success:false,
            message:"Error fetching user details",
        })
    }
}