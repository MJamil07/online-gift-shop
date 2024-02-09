
import { Router } from 'express'
import GiftController from '../controller/gift.controller'

const router = Router()
const gift = new GiftController()

router.post('/create' , gift.create)
router.delete('/delete/:id' , gift.delete)
router.patch('/update/:id' , gift.update)
router.get('/search' , gift.search)
router.get('/all_gifts' , gift.getAllGift)

export default router