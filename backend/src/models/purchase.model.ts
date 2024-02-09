
import { Schema , model } from "mongoose";

export  interface IPurchase {
       userId : number ,
       giftId : number ,
       quantity : number ,
       price : number ,
       paymentOption : string ,
       purchaseDate : Date
       isCancel : boolean
}
const PurchaseSchema = new Schema({
       userId: { type: Number, required: true },
       giftId: { type: Number, required: true },
       quantity: { type: Number, required: true },
       price: { type: Number, required: true },
       paymentOption: { 
              type: String, 
              enum : ['CREDIT' , 'DEBIT' , 'CASH_ON'] , 
              required: true 
       },
       purchaseDate: { type: Date, default: Date.now },
       isCancel: { type: Boolean, default: false }
})

export default model<IPurchase>('Purchase' , PurchaseSchema)