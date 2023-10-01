import mongoose, { Schema } from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model("User", UserSchema)