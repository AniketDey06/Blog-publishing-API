import { Router } from 'express'
import { checkRole, jwtVerify } from '../middlewares/auth.middleware.js'
import { UserRoleEnum } from '../utils/constans.js'
import { getAllPendingPost } from '../controllers/admin.controller.js'

const router = Router()

router.use(jwtVerify, checkRole([UserRoleEnum.ADMIN]))

router.route('/user/:id')
    // .post()

router.route('/posts')
    .get(getAllPendingPost)

export default router