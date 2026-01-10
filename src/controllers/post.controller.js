import { Post } from "../models/post.model.js";
import { createPost, getPostById, publishedPost, updatePost } from "../services/post.service.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyns-handler.js";
import { BlogStatusEnum } from "../utils/constans.js";
import { createPostRequstBodySchema } from "../utils/validetors.js";

export const createNewPost = asyncHandler(async (req, res) => {
    const validationResult = await createPostRequstBodySchema.safeParseAsync(req.body)
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error })
    }

    const { title, description } = validationResult.data
    const createdPost = await createPost({ title, description, author: req.user._id })

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

export const getPublishedPostById = asyncHandler(async (req, res) => {
    const postID = req.params.id

    const post = await getPostById(postID)
    if (!post) {
        throw new ApiError(404, "Blog not found")
    }

    if (post.status !== BlogStatusEnum.APPROVED) {
        throw new ApiError(400, "Blog have not APPROVED yet.")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                post,
                "this Blog post have approved."
            )
        )
})

export const updatePostById = asyncHandler(async (req, res) => {
    const postID = req.params.id

    const post = await getPostById(postID)
    if (!post || post.status === BlogStatusEnum.APPROVED) {
        throw new ApiError(404, "Blog not found or Its APPROVED")
    }

    const userId = req.user.id
    if (post.createdBy != userId) {
        throw new ApiError(404, "This user have not created this blog post")
    }

    const validationResult = await createPostRequstBodySchema.safeParseAsync(req.body)
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error })
    }

    const { title, description } = validationResult.data
    if (post.title === title && post.description === description) {
        throw new ApiError(400, "User is filling same data")
    }
    const updatedPost = await updatePost({ title, description, postId: post._id })

    return res
        .status(202)
        .json(
            new ApiResponse(
                202,
                updatedPost,
                "this Blog post have been updated"
            )
        )
})

