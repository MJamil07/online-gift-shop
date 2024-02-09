
import { Router } from 'express'
import UserController from '../controller/user.controller'

const router = Router()
const user = new UserController()

router.post('/login' , user.login)
router.post('/register' , user.register)


export default router
