import mongoose from 'mongoose'

export const createDb = async () => {
       await mongoose.connect('mongodb://127.0.0.1:27017/gift_shop' , {retryWrites : true , w : "majority" })
       .then(()=> {
              console.log('Mongodb was connected');
       })
       .catch((error) => {
              console.log(error);
       })
}
