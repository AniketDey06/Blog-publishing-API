import { Post } from "../models/post.model.js";
import { BlogStatusEnum } from "../utils/constans.js";

export const createPost = async ({title, description, author }) => {
    const post = await Post.create({
        title,
        description,
        createdBy: author,
    })

    post.save()

    return post
}

export const publishedPost = async () => {
    const posts = await Post.find({
        status: BlogStatusEnum.APPROVE
    })

    return posts
}