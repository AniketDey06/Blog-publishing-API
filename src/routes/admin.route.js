import { Router } from 'express'
import { checkRole, jwtVerify } from '../middlewares/auth.middleware.js'
import { UserRoleEnum } from '../utils/constans.js'
import { changeUserRole, getAllPendingPost } from '../controllers/admin.controller.js'

const router = Router()

router.use(jwtVerify, checkRole([UserRoleEnum.ADMIN]))

router.route('/user/role/:id/admin')
    .put(changeUserRole(UserRoleEnum.ADMIN))
router.route('/user/role/:id/user')
    .put(changeUserRole(UserRoleEnum.USER))

router.route('/user/role/:id/user')

router.route('/posts')
    .get(getAllPendingPost)

export default router