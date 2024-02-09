
import { Router } from 'express'
import ShoppingCardController from '../controller/shopping_card.controller'

const router = Router()
const card = new ShoppingCardController()

router.post('/create' , card.create)
router.patch('/cancel_order/:id' , card.update)
router.get('/read/:id' , card.read)
router.delete('/remove/:id' , card.delete)

export default router
