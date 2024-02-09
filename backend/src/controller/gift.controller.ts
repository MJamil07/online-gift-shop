
import { Request , Response } from 'express'
import { GiftCRUD } from './shopCrud';

export default class GiftController{
       create(request : Request , response : Response) {
              return GiftCRUD.create(request , response) 
       }
       update(request : Request , response : Response) {}
       delete(request : Request , response : Response) {}
       getAllGift(request : Request , response : Response) {}
       search(request : Request , response : Response) {}
       
}

