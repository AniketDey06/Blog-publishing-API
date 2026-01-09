import { Post } from "../models/post.model.js";
import { createPost, publishedPost } from "../services/post.service.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyns-handler.js";
import { createPostRequstBodySchema } from "../utils/validetors.js";

export const createNewPost = asyncHandler(async (req, res) => {
    const validationResult = await createPostRequstBodySchema.safeParseAsync(req.body)
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error })
    }

    const { title, description } = validationResult.data
    const createdPost = await createPost({ title, description, author: req.user._Id })

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

export const getAllPublishedPost = asyncHandler(async (req, res) => {
    const posts = await publishedPost()

    if (!posts || posts.length === 0) {
        throw new ApiError(404, "No Published Blog Post is there")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                posts,
                "All Published Posts"
            )
        )
})