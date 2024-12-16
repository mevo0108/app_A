
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    _id:{
        type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    owner:{
        type: String,
        required: true,
    },
    
    postId:{
        type: String,
        required: true,
    }
});

const commentModel = mongoose.model("Comments", commentSchema);

export default commentModel;
