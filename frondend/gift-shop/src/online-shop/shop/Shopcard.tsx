import React from 'react'
import Navbar from './uiUtils/Navbar'
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import axios from 'axios';
import URL from '../utils/url';
import ShopcardProduct from './uiUtils/ShopcardProduct';
import isLogin from '../utils/func';
import Loading from './uiUtils/Loding';
import NoData from './uiUtils/NoData';
import ShoppingCardEmpty from '../../images/categorie/shopping.png'

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
       _id: string;
       giftId: GiftType;
       userId: String;
       quantity: number;
       totalPrice: number;
}



export default function Shopcard() {

       isLogin()
       const [favouriteProducts, setFavouriteProducts] = React.useState<ShoppingCardType[] | null>(null)
       const [isShopEmpty, setIsShopEmpty] = React.useState<boolean>(false)
       const [refresh, setRefresh] = React.useState<boolean>(false)


       React.useEffect(() => {
              async function fetchData() {
                     try {
                            const userId = localStorage.getItem('userId')

                            if (!userId)
                                   return

                            const response = await axios.get(`${URL}/card/read/${userId}`)
                                   .then((data) => { setFavouriteProducts(data.data) })
                            setIsShopEmpty(false)

                     } catch (error) {
                            console.error('Error fetching data:', error);
                            setFavouriteProducts([])
                            setIsShopEmpty(true)
                     }
              }

              fetchData();
       }, [refresh])

       return (
              <div className='shopcard-container container'>
                     <Navbar />
                     <h3 className='text-center mt-5'> Shopping Card </h3>
                     <MDBContainer fluid className="my-3">
                            <MDBRow>
                                   {
                                          favouriteProducts == null ? <Loading /> : favouriteProducts.length != 0 ? favouriteProducts.map((favouriteProduct) => (
                                                 <ShopcardProduct
                                                        product={favouriteProduct}
                                                        key={favouriteProduct._id}
                                                        refresh={refresh}
                                                        setRefresh={setRefresh}
                                                 />
                                          )) : <NoData />
                                   }
                            </MDBRow>
                     </MDBContainer>
              </div>
       )
}
