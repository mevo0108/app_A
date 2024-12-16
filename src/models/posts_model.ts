
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postSchema = new Schema({
    _id:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    content: String,
    owner:{
        type: String,
        required: true,
    },
});

const postModel = mongoose.model("Posts", postSchema);

export default postModel;
