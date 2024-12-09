const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the database"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postsRoutes = require("./routes/posts_routes");  
app.use("/posts", postsRoutes);

app.listen(port, () => {
    console.log(`Exemple app listening at http://localhost:${port}`);
    }
);



