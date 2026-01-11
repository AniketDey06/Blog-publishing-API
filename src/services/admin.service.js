import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { BlogStatusEnum } from "../utils/constans.js"

export const changeRole = async ({userId, role}) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            role: role
        },
        {
            new: true
        }
    )
    return updatedUser
}

export const pendingPosts = async () => {
    const posts = await Post.find({status: BlogStatusEnum.PENDING})
    return posts
}