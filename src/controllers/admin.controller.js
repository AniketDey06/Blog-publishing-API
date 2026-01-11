import { changeRole, pendingPosts } from "../services/admin.service.js"
import { getUserById } from "../services/auth.service.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"

export const changeUserRole = (role = []) => (async (req, res) => {
    const userId = req.params.id
    if (!userId) {
        throw new ApiError(400, "Params do not have user id")
    }

    const user = await getUserById(userId)
    if (!user) {
        throw new ApiError(404, "No user found in DB")
    }

    if (user.role === role) {
        throw new ApiError(404, `the user is alredy a ${role}`)
    }

    const updatedUser = await changeRole({ userId, role })
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedUser,
                "User role is updated"
            )
        )
})

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