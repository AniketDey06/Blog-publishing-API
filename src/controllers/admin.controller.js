import { pendingPosts } from "../services/admin.service.js"
import { ApiResponse } from "../utils/api-response.js"

export const getAllPendingPost = async (req, res) => {
    const posts = await pendingPosts()
    if (!posts) {
        throw new ApiError(404, "No Pending Blog Post is there")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            posts,
            "got all pending Posts"
        )
    )
}