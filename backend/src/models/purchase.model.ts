
import { Schema , model } from "mongoose";

export  interface IPurchase {
       userId : string ,
       giftId : string ,
       quantity : number ,
       price : number ,
       paymentOption : string ,
       purchaseDate : Date
       isCancel : boolean
       message : string | null
}
const PurchaseSchema = new Schema<IPurchase>({
       userId: { type: String, required: true },
       giftId: { type: String, required: true , ref: 'Gift' },
       quantity: { type: Number, required: true },
       price: { type: Number, required: true },
       paymentOption: { 
              type: String, 
              enum : ['CREDIT' , 'DEBIT' , 'CASH_ON'] , 
              required: true ,
              default : 'CASH_ON'
       },
       message : {type : String},
       purchaseDate: { type: Date, default: Date.now },
       isCancel: { type: Boolean, default: false },
})

export default model<IPurchase>('Purchase' , PurchaseSchema)