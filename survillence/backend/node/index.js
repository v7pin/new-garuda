const express = require("express");
const cors = require("cors");
const router = require('./route/upload');
const MainRouter = require("./route/index");

const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Custom middleware function to log requests
function check(req, res, next) {
    console.log("Logging request in check middleware...");
    next();
}

// Mount MainRouter under "/api/v1" path
app.use("/api/v1", check, MainRouter);
app.use('/api/', router);
app.listen(3000);


