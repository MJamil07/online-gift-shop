
import Express , {Request , Response} from 'express';
import {createDb} from './configuration/mongodb'
import cors from 'cors'
import UserRouter from './routes/user.routes'
import ShoppingRouter from './routes/shopping_card.routes'
import GiftRouter from './routes/gift.routes'


// * create instance for express app
const app = Express()
app.use(Express.json())
app.use(Express.urlencoded({extended : true}))
app.use(cors())

// * connect the mongodb
createDb()

app.use('/api/v1/user' , UserRouter)
app.use('/api/v1/gift' , GiftRouter)
app.use('/api/v1/card' , ShoppingRouter)



app.use('*' , (request : Request , response : Response) => {
       response.status(404).json({'message' : `url = ${ request.hostname + request.baseUrl + request.url} , method = ${request.method} , Not Found`})
})

app.listen(8989 , ()=> {
       console.log('Server is running on 8989');
})