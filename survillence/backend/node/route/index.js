const express = require("express");
const UserRouter = require("./user");
const { accountRouter } = require("./account");

const MainRouter = express.Router();

// Mount UserRouter under "/user" path
MainRouter.use("/user", (req, res, next) => {
    console.log("Middleware in MainRouter...");
    next();
}, UserRouter);

// Mount accountRouter under "/account" path
MainRouter.use("/account", accountRouter);

module.exports = MainRouter;
