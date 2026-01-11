import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/asyns-handler.js";

export const getUserByEmail = async ({ email }) => {
    const existingUser = await User.findOne({ email })
    return existingUser
}

export const getUserById = async (userId) => {
    const user = await User.findById(userId)
    return user 
}

export const registerNewUser = async ({ name, email, password }) => {
    const createdUser = await User.create({
        name,
        email,
        password,
    })

    return createdUser
}

export const loginUserService = async ({ user, password }) => {
    const isPasswordValid = await user.isPasswordCorrect(password)

    return { isPasswordValid }
} 