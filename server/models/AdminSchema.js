const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})


module.exports = mongoose.model("Admin",adminSchema);
