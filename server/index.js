const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

// importing routes 
const userRoutes = require("./routes/User");
const adminRoutes = require("./routes/Admin");

const database = require("./config/database");
const cors = require("cors");
const cloudinaryConnect = require("./config/cloudinary");
require('dotenv').config();

const http = require("http");
const {Server} = require("socket.io")
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            const allowedOrigins = [
                "https://social-media-post-seven.vercel.app/",
                "https://social-media-post-raj-aryans-projects-9e1bf71a.vercel.app/",
                "https://social-media-post-git-main-raj-aryans-projects-9e1bf71a.vercel.app/",
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Origin not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"], 
    },
});
PORT = process.env.PORT || 4000;



database.dbConnect();

app.use(express.json());
app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "https://social-media-post-seven.vercel.app/",
                "https://social-media-post-raj-aryans-projects-9e1bf71a.vercel.app/",
                "https://social-media-post-git-main-raj-aryans-projects-9e1bf71a.vercel.app/",
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials:true,
    })
)
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

cloudinaryConnect();

app.use("/api/v1/user",userRoutes(io));
app.use("/api/v1/admin",adminRoutes);


app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"Your server is up and running",
    })
})

io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);

    socket.on("newSubmission",(data)=>{
        console.log("New submission received",data);
        io.emit("updateDashboard",data);
    })
})

module.exports = { io };

server.listen(PORT, () =>{
    console.log(`App is running at ${PORT}`);
})