import { Schema, model, Document } from 'mongoose';

export interface IGift extends Document {
       name: string;
       price: number;
       image: string;
       categories: string;
       rating: number;
       description: string;
       quantity: number;
}

const GiftSchema = new Schema<IGift>({
       name: {
              type: String,
              required: true
       },
       price: {
              type: Number,
              required: true
       },
       image: {
              type: String,
       },
       categories: {
              type: String,
              required: true,
              enum : ['Book' , 'Flower' , 'Cloth' , 'Toy' , 'Electronic']
       },
       rating: {
              type: Number,
              required: true
       },
       description: {
              type: String,
       
       },
       quantity: {
              type: Number,
              required: true
       }
});

const Gift = model<IGift>('Gift', GiftSchema);

export default Gift;
