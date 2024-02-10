
import { Request , Response } from 'express'
import Gift , {IGift} from '../models/gift.model';

export default class GiftController{
       async create(request : Request , response : Response) {
              try {
                     const imagePath = request.file ? request.file.path : null;
                     const newGift = new Gift({
                            image: imagePath ,
                            ...request.body
                     });
                     const savedGift = await newGift.save();
                     response.status(200).json(savedGift);
              } catch (error) {
                     console.error('Error creating gift:', error);
                     response.status(500).json({ error: 'Internal server error' });
              }
       }
       async update(request: Request, response: Response) {
              try {
                     const { id } = request.params;
                     const updatedGift: IGift | null = await Gift.findByIdAndUpdate(id, request.body, { new: true });
                     if (updatedGift) {
                            response.status(200).json(updatedGift);
                     } else {
                            response.status(404).json({ error: 'Gift not found' });
                     }
              } catch (error) {
                     console.error('Error updating gift:', error);
                     response.status(500).json({ error: 'Internal server error' });
              }
       }

       async delete(request: Request, response: Response) {
              try {
                     const { id } = request.params;
                     const deletedGift  = await Gift.findByIdAndDelete(id);
                     if (deletedGift) {
                            response.status(200).json({ message: 'Gift deleted successfully', gift: deletedGift });
                     } else {
                            response.status(404).json({ error: 'Gift not found' });
                     }
              } catch (error) {
                     console.error('Error deleting gift:', error);
                     response.status(500).json({ error: 'Internal server error' });
              }
       }

       async getAllGift(request: Request, response: Response) {
              try {
                     const gifts: IGift[] = await Gift.find();
                     response.status(200).json(gifts);
              } catch (error) {
                     console.error('Error fetching gifts:', error);
                     response.status(500).json({ error: 'Internal server error' });
              }
       }
       
       search(request : Request , response : Response) {}
       
}

