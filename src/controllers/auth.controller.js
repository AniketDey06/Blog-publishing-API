import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyns-handler.js";
import { options } from "../utils/jwt-options.js";
import { loginPostRequstBodySchema, registerPostRequstBodySchema } from "../utils/validetors.js";

const generateAccessAndRefeshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something want wrong while generating accessToken and refreshToken")
    }
}

export const registerUser = asyncHandler(async (req, res) => {
    const validationResult = await registerPostRequstBodySchema.safeParseAsync(req.body)

    if (!validationResult) {
        return res.status(400).json({ error: validationResult.error })
    }

    const { name, email, password } = validationResult.data

    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        throw new ApiError(400, "User is already there is the DB")
    }

    const createdUser = await User.create({
        name,
        email,
        password,
    })

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdUser,
                "user register successfully"
            )
        )
})

export const loginUser = asyncHandler(async (req, res) => {
    const validationResult = await loginPostRequstBodySchema.safeParseAsync(req.body)

    if (!validationResult) {
        return res.status(400).json({ error: validationResult.error })
    }

    const { email, password } = validationResult.data
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefeshTokens(user._id)

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    "user": user,
                    accessToken,
                    refreshToken,
                },
                "login success full"
            )
        )
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    const userID = req.user.id

    const user = await User.findById(userID)
    if (!user) {
        throw new ApiError(404, "user not foud")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "User found"
            )
        )
})