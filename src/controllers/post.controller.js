import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyns-handler.js";


export const createNewPost = asyncHandler(async (req, res) => {
    const {title, description} = req.body

    if (!title || !description) {
        throw new ApiError(404, "All field are requird")
    }

    const createdPost = await Post.create({
        title,
        description,
        createdBy: req.user._id,
    })

    createdPost.save()

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            createdPost,
            "Post created successfully"
        )
    )
})

export const getAllPost = asyncHandler(async (req, res) => {
    
})