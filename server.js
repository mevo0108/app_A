
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const postsRoute = require("./routes/posts_route");  


const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to the database"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", postsRoute);

const initApp = () =>{
    return new Promise( async (resolve, reject) => {
        await mongoose.connect(process.env.DB_CONNECT);
        resolve(app);
    });
};


module.exports = initApp;
