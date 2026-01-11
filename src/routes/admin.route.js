import { Router } from 'express'
import { checkRole, jwtVerify } from '../middlewares/auth.middleware.js'
import { BlogStatusEnum, UserRoleEnum } from '../utils/constans.js'
import { changeUserRole, getAllPendingPost, updateBlogStatus } from '../controllers/admin.controller.js'

const router = Router()

router.use(jwtVerify, checkRole([UserRoleEnum.ADMIN]))

router.route('/user/role/:id/admin')
    .put(changeUserRole(UserRoleEnum.ADMIN))
router.route('/user/role/:id/user')
    .put(changeUserRole(UserRoleEnum.USER))

router.route('/posts')
    .get(getAllPendingPost)

router.route('/posts/:id/approve')
    .put(updateBlogStatus(BlogStatusEnum.APPROVED))
router.route('/posts/:id/rejecte')
    .put(updateBlogStatus(BlogStatusEnum.REJECTED))

export default router