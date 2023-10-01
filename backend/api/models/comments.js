import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    answer:{
        type:[{user_id: String, answer: String}],
        required: true
    }
})

export default mongoose.model("comment", commentSchema)