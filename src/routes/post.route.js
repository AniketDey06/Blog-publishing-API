import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { createNewPost, getAllPublishedPost } from "../controllers/post.controller.js";

const router = Router()

router.route('/')
    .post(jwtVerify, createNewPost)
    .get(jwtVerify, getAllPublishedPost)

export default router