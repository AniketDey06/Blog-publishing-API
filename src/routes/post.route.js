import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {
    createNewPost,
    getAllPublishedPost,
    getPublishedPostById,
    updatePostById
} from "../controllers/post.controller.js";

const router = Router()

router.use(jwtVerify)

router.route('/')
    .post(createNewPost)
    .get(getAllPublishedPost)

router.route('/:id')
    .get(getPublishedPostById)
    .put(updatePostById)

export default router