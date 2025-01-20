const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

module.exports = (io) => {
    router.post("/add", (req, res) => UserController.addImages(req, res, io));
    return router;
};
