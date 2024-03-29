
import { Schema , model } from "mongoose";

export  interface IPurchase {
       userId : string ,
       giftId : string ,
       quantity : number ,
       price : number ,
       paymentOption : string ,
       purchaseDate : Date
       orderTrack : string
       message : string | null
       occasion : string 
       created_at : Date
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
       orderTrack: { type: String, default: 'Order Confirm' , enum : ['Order Confirm' , 'Shipped' , 'Delivered' , 'Cancel'] },
       occasion : {
              type : String, 
              enum : [
                     'Birthday',
                     'Anniversary',
                     'Wedding',
                     'Graduation',
                     'Valentine\'s Day',
                     'Mother\'s Day',
                     'Father\'s Day',
                     'Christmas',
                     'New Year',
              ],
       },
       created_at : {
              type : Date,
              default : Date.now
       }
})

export default model<IPurchase>('Purchase' , PurchaseSchema)