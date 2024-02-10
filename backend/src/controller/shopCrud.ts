
import { Request , Response } from "express"
import { Model } from 'mongoose';
import Gift from '../models/gift.model';
import ShoppingCard from "../models/shopping_card.model";
import User from "../models/user.model";
import Purchase from "../models/purchase.model";


class ShopCrud<T> {

       private Model : Model<T>
       constructor(model : Model<T>) {
              this.Model = model
       }

       private async isExistUserAndProduct(userId : string , giftId : string)   {
              const user = await User.findOne({_id : userId})
              const gift = await Gift.findOne({_id : giftId})
              return user && gift 
       }
       
       private async isQuantityLessThanGift(quantity : number , giftId : string) : Promise<boolean> {
              const gift = await Gift.findOne({_id : giftId})
              return gift ? gift.quantity >= quantity : false
       }

       public async create(request: Request, response: Response) {

              if (this.Model.modelName ===  ShoppingCard.modelName || this.Model.modelName === Purchase.modelName) {
                     
                     const isExist = await this.isExistUserAndProduct(request.body.userId , request.body.giftId)
                     const isLess = await this.isQuantityLessThanGift(request.body.quantity , request.body.giftId)

                     if (!isExist) {
                            return response.status(404).json({error : 'User or Gift not found'})
                     }
                     if (!isLess) {
                            return response.status(404).json({error : 'Given Quantity is greater'})
                     }
              }

              return await new this.Model({...request.body})
                            .save()
                            .then((data) => { response.status(200).json(data) })
                            .catch((err) => response.status(500).json(err))
       }

       
       public async update(request: Request, response: Response) {
              try {
                     const userId = request.body?.userId;
                     const modelId = request.params?.id;
              
                     if (!userId || !modelId) {
                            return response.status(400).json({ error: 'User ID and model ID is required' });
                     }
              
                     const model = await this.Model.findOne({ _id: modelId, userId });
                     if (!model) {
                            return response.status(404).json({ message: 'Model not found  the specified user' });
                     }
              
                     model.set(request.body);
                     const updatedModel = await model.save();
                     response.status(200).json({ model: updatedModel, message: 'Model updated successfully' });
              } catch (error) {
                     console.error('Error in update:', error);
                     response.status(500).json({ error: 'Internal server error' });
              }
       }
       

       public async delete(request: Request, response: Response) {
              try {
                     const userId = request.body?.userId;
                     const modelId = request.params?.id;
              
                     if (!userId || !modelId) {
                            return response.status(400).json({ error: 'User ID and model ID are required' });
                     }
              
                     const model = await this.Model.findOne({ _id: modelId, userId });
                     if (!model) {
                            return response.status(404).json({ message: 'Model not found for the specified user' });
                     }
              
                     await this.Model.findByIdAndDelete(modelId);
                     response.status(200).json({ message: 'Model deleted successfully' });
              } catch (error) {
                     console.error('Error in delete:', error);
                     response.status(500).json({ error: 'Internal server error' });
              }
       }

       public async read(request: Request, response: Response) {
              try {
                     const userId = request.params?.id;
                     if (!userId) {
                            return response.status(400).json({ error: 'User ID is required' });
                     }
              
                     const documents = await this.Model.find({ userId }).populate('giftId');
                     
                     if (documents.length === 0) {
                            return response.status(404).json({ message: 'No documents found for the specified user ID' });
                     }
              
                     return response.status(200).json(documents);
              } catch (error) {
                     console.error('Error in read:', error);
                     return response.status(500).json({ error: 'Internal server error' });
              }
       }
       
}


const PurchaseCRUD = new ShopCrud(Purchase)
const GiftCRUD = new ShopCrud(Gift)   
const ShopCardCRUD = new ShopCrud(ShoppingCard) 

export {GiftCRUD , ShopCardCRUD , PurchaseCRUD}

