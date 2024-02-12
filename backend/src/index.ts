
import Express , {Request , Response} from 'express';
import cors from 'cors'

import {createDb} from './configuration/mongodb'
import storage from './configuration/storage';

import UserRouter from './routes/user.routes'
import ShoppingRouter from './routes/shopping_card.routes'
import GiftRouter from './routes/gift.routes'
import PurchaseRouter from './routes/purchase.routes'

// * create instance for express app
const app = Express()
app.use(Express.json())
app.use(Express.urlencoded({extended : true}))
app.use(cors())
app.use(Express.static(__dirname));

// * connect the mongodb
createDb()

app.use('/api/v1/user' , UserRouter)
app.use('/api/v1/gift' , storage.single('image') , GiftRouter)
app.use('/api/v1/card' , ShoppingRouter)
app.use('/api/v1/purchase' , PurchaseRouter)



app.use('*' , (request : Request , response : Response) => {
       response.status(404).json({'message' : `url = ${ request.hostname + request.baseUrl + request.url} , method = ${request.method} , Not Found`})
})

export default app
 