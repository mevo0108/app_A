
import express, {Express} from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postsRoute from "./routes/posts_route";
import commentsRoute from "./routes/comments_route";
import authRoute from "./routes/auth_route";

const initApp = ():Promise<Express> => {
    return new Promise<Express>((resolve, reject) => {
        const db = mongoose.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", function () {
            console.log("Connected to Database");
        });
        mongoose
        .connect(process.env.DB_CONNECT)
        .then(() => {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use("/posts", postsRoute);
            app.use("/comments", commentsRoute);
            app.use("/auth", authRoute);

            resolve(app);
    })
    .catch((err) => {
          reject(err);
        });
    });
};






export default initApp;