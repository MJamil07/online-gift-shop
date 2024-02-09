
import { Router } from 'express'
import Purchase from '../controller/purchase.controller'


const router = Router()
const purchase = new Purchase()

router.post('/create' , purchase.createOrder)
router.patch('/cancel_order/:id' , purchase.createOrder)
router.get('/read/:id' , purchase.readOrders)
router.delete('/remove/:id' , purchase.removeOrders)

export default router
