

import { Request , Response } from "express"; 
import { PurchaseCRUD } from "./shopCrud";

export default class Purchase {
       createOrder(request : Request , response : Response) {
              return PurchaseCRUD.create(request , response)
       }
       cancelOrder(request : Request , response : Response) {
              return PurchaseCRUD.update(request , response)
       }
       readOrders(request : Request , response : Response) {
              return PurchaseCRUD.read(request , response)
       }
       removeOrders(request : Request , response : Response) {
              return PurchaseCRUD.delete(request , response)
       }
}

