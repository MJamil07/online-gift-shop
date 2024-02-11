import React from 'react'
import Navbar from './uiUtils/Navbar'
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import axios from 'axios';
import URL from '../utils/url';
import ShopcardProduct from './uiUtils/ShopcardProduct';
import isLogin from '../utils/func';

export type GiftType = {
       _id: string;
       name: string;
       price: number;
       image: string;
       categories: string;
       rating: number;
       description: string;
       quantity: number;
}

export type ShoppingCardType = {
       _id : string;
       giftId: GiftType;
       userId: String;
       quantity: number;
       totalPrice: number;
}



export default function Shopcard() {

       isLogin()
       const [favouriteProducts , setFavouriteProducts] = React.useState<ShoppingCardType[]>()
       React.useEffect(() => {
              async function fetchData() {
                     try {
                            const userId = localStorage.getItem('userId')

                            if (!userId)
                                   return
                            
                            const response = await axios.get(`${URL}/card/read/${userId}`)
                                          .then((data) => {setFavouriteProducts(data.data)} )
                     
                     } catch (error) {
                            console.error('Error fetching data:', error);
                     }
              }
              
              fetchData();
       })
       return (
              <div className='shopcard-container container'>
                     <Navbar />
                     <h3 className='text-center mt-2'> Shopping Card </h3>
                     <MDBContainer fluid className="my-3">
                            <MDBRow>
                                   {
                                          favouriteProducts && favouriteProducts.map((favouriteProduct) => (
                                                 <ShopcardProduct product = {favouriteProduct} key={favouriteProduct._id} />
                                          ))
                                   }
                            </MDBRow>
                     </MDBContainer>
              </div>
       )
}
