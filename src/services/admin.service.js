import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"
import { BlogStatusEnum } from "../utils/constans.js"


export const pendingPosts = async (params) => {
    const posts = await Post.find({status: BlogStatusEnum.PENDING})
    return posts
}