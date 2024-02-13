import mongoose from 'mongoose'

export const createDb = async () => {
       const LOCALURL = 'mongodb://127.0.0.1:27017/gift_shop'
       const ATLASURL = 'mongodb+srv://klenty_assign:assignment-gift@gift-cluster.lcxdlnr.mongodb.net/gift_shop'
       await mongoose.connect(ATLASURL , {retryWrites : true , w : "majority" })
       .then(()=> {
              console.log('Mongodb was connected');
       })
       .catch((error) => {
              console.log(error);
       })
}
