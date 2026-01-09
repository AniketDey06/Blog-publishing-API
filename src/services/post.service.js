import { Post } from "../models/post.model.js";

export const createPost = async ({title, description, author }) => {
    const post = await Post.create({
        title,
        description,
        createdBy: author,
    })

    post.save()

    return post
}