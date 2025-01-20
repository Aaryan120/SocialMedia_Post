const express = require("express");
const router = express.Router();

const {adminLogin,adminDashboard,adminRegister} = require("../controllers/AdminController");

const {auth,isAdmin} = require("../middleware/AuthMiddleware");


router.get("/dashboard",auth,isAdmin,adminDashboard);
router.post("/login",adminLogin);
router.post("/register",adminRegister)


module.exports = router