const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = async (req,res,next) =>{
    try {
        const token = req.body.token ||
                    req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }

        // verify the token
        try {
            const decode = await jwt.verify(token,process.env.JWT_SECRET);

            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Error,Invalid Token",
            })
        }
        next()

    } catch (error) {
        console.log("ERROR WHILE VALIDATING TOKEN...",error);
        return res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR",
        })
    }
}


exports.isAdmin = async(req,res,next) =>{
    try {
        if(req?.user?.role !== 'admin'){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admins",
            })
        }
        next();
    } catch (error) {
        console.log("ERROR AT IS ADMIN",error);
        return res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR",
        })
    }
}