const express = require("express");
const router = require("./src/routes/api");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");


//? app configuration
const app = express();
app.use(express.json());
app.use(cors());

//? database configuration
const uri = process.env.DATABASE_URI;
const databaseConfig = {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS
}

mongoose.set("strictQuery", true);
mongoose.connect(uri, databaseConfig)
    .then(() => console.log("database connected"))
    .catch((error) => console.log(error))

//? handle routes
app.use("/api/v1", router);

//? handle undefined routes
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route was not found!"
    })
})

module.exports = app;