import { Schema, model , Document } from 'mongoose';

export interface IUser extends Document {
       username: string;
       email: string;
       password: string;
       contact: string;
       created_at: Date;
}

const UserSchema = new Schema<IUser>({

       username: {
              type: String,
              required: true,

       },
       email: {
              type: String,
              required: true,
              unique: true
       },
       password: {
              type: String,
              required: true
       },
       contact: {
              type: String,
              required: true
       },
       created_at: {
              type: Date,
              default: Date.now
       }
});

const User = model<IUser>('User', UserSchema);

export default User;
