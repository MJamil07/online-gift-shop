
import { Request , Response } from 'express'
import { ShopCardCRUD } from './shopCrud'

export default class ShoppingCard{
       create(request : Request , response : Response) {
              return ShopCardCRUD.create(request , response)
       }
       update(request : Request , response : Response) {
              return ShopCardCRUD.update(request , response)
       }
       delete(request : Request , response : Response) {
              return ShopCardCRUD.delete(request , response)
       }

       read(request : Request , response : Response) {
              return ShopCardCRUD.read(request , response)
       }
}
