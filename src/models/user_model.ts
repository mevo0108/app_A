
import mongoose from "mongoose";

export interface iUser{
    email: string,
    password: string,
}

const Schema = mongoose.Schema;
const userSchema = new Schema<iUser>({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    
});

const userModel = mongoose.model<iUser>("Users", userSchema);

export default userModel;
