import { Schema, model, Document } from 'mongoose';

export interface IShoppingCard extends Document {
       giftId: number;
       userId: number;
       quantity: number;
       totalPrice: number;
}

const ShoppingCardSchema = new Schema<IShoppingCard>({

       giftId: {
              type: Number,
              required: true
       },
       userId: {
              type: Number,
              required: true
       },
       quantity: {
              type: Number,
              required: true
       },
       totalPrice: {
              type: Number,
              required: true
       }
});

export default model<IShoppingCard>('ShoppingCard', ShoppingCardSchema);
