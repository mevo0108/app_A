
import mongoose from "mongoose";

export interface iComment  {
    _id: string,
    comment: string,
    owner: string,
    postId: string,
}

const Schema = mongoose.Schema<iComment>;
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
