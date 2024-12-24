
import mongoose from "mongoose";

export interface iPost{
    _id: string,
    title: string,
    content: string,
    owner: string,
}
const Schema = mongoose.Schema;
const postSchema = new Schema<iPost>({
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

const postModel = mongoose.model<iPost>("Posts", postSchema);

export default postModel;
