const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected to the database");
    });

const posts_routes = require("./routes/posts_routes");  
app.use("/posts", posts_routes);

app.listen(port, () => {
    console.log(`Exemple app listening at http://localhost:${port}`);
    }
);



