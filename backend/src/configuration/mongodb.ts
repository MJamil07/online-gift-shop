import mongoose from 'mongoose'

export const createDb = async () => {
       await mongoose.connect('mongodb+srv://klenty_assign:assignment-gift@gift-cluster.lcxdlnr.mongodb.net/gift_shop' , {retryWrites : true , w : "majority" })
       .then(()=> {
              console.log('Mongodb was connected');
       })
       .catch((error) => {
              console.log(error);
       })
}
