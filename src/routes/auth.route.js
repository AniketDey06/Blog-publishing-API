import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { getCurrentUser, loginUser, registerUser } from "../controllers/auth.controller.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(jwtVerify, getCurrentUser)

export default router