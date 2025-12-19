import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { createNewPost, getAllPost } from "../controllers/post.controller.js";

const router = Router()

router.route('/')
    .post(jwtVerify, createNewPost)
    .get(jwtVerify, getAllPost)

export default router