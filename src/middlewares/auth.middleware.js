import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js"
import { ApiError } from "../utils/api-error.js"
import { asyncHandler } from "../utils/asyns-handler.js"
import { getUserById } from "../services/auth.service.js";

export const jwtVerify = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "No Token Found");
    }

    try {
        const decodeedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodeedToken?._id).select("-password")

        if (!user) {
            throw new ApiError(401, "Invalid token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(500, "Something want wrong")
    }
})

export const checkRole = (role = []) => (async (req, res, next) => {
    const user = req.user


    if (!user) {
        throw new ApiError(400, "User should loged in")
    }

    const userdata = await getUserById(user._id)

    if (!userdata) {
        throw new ApiError(400, "No user found in the DB")
    }

    if (!role.includes(userdata.role)) {
        throw new ApiError(400, "You do not have permissinon to perforn this action")
    }

    next()
})