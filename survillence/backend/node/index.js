const express = require("express");
const UserModel = require("./database/db");
const mongoose = require("mongoose");
const router = require('./routes/upload');
const cors = require("cors");
const { Userroute }=require("./routes/User");


const app = express();


// Allow requests from specific origin with credentials
app.use(cors({ origin: "http://localhost:5173", credentials: true }));



// const jwtSign = util.promisify(jwt.sign);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hi");
});
app.use('/api/', router);
app.use("/api/",Userroute);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
