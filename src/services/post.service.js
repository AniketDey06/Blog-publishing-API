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
        status: BlogStatusEnum.APPROVED
    })

    return posts
}

export const getPostById = async(postID) => {
    const post = await Post.findById(postID)
    return post
}

export const updatePost = async ({title, description, postId}) => {
    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            title: title,
            description: description
        },
        {
            new: true
        }
    )
    return updatedPost
}

export const deletePost = async (postId) => {
    const deletedPost = await Post.findByIdAndDelete(postId)
    return deletedPost
}