import mongoose, { Schema } from "mongoose";
import { AvailableBlogStatus, BlogStatusEnum } from "../utils/constans.js";

const postSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    status: {
        type: String,
        enum: AvailableBlogStatus,
        default: BlogStatusEnum.PENDING,
    }
},{timestamps: true})

export const Post = mongoose.model("Post", postSchema)