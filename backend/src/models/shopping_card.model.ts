import { Schema, model, Document , Types} from 'mongoose';

export interface IShoppingCard extends Document {
       giftId: String;
       userId: String;
       quantity: number;
       totalPrice: number;
       created_at : Date
}

const ShoppingCardSchema = new Schema<IShoppingCard>({

       giftId: {
              type: String,
              required: true,
              ref : 'Gift'
       },
       userId: {
              type: String,
              required: true,
              ref : 'User'
       },
       quantity: {
              type: Number,
              required: true
       },
       totalPrice: {
              type: Number,
              required: true
       },
       created_at : {
              type : Date,
              default : Date.now
       }
});

export default model<IShoppingCard>('ShoppingCard', ShoppingCardSchema);
