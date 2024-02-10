import React from 'react'
import Navbar from './uiUtils/Navbar'
import axios from 'axios'
import URL from '../utils/url'
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import OrderProduct from './uiUtils/OrderProduct'

export type GiftType = {
       _id: string;
       name: string;
       price: number;
       image: string;
       categories: string;
       rating: number;
       description: string;
       quantity: number;
       __v: number;
}
     
export type PurchaseType = {
       _id: string;
       userId: string;
       giftId: GiftType; 
       quantity: number;
       price: number;
       paymentOption: 'CREDIT' | 'DEBIT' | 'CASH_ON';
       isCancel: boolean;
       message: string;
       purchaseDate: Date;
       __v: number;
}
     

export default function Order() {

       const [orders , setOrders] = React.useState<PurchaseType[]>()
       React.useEffect(() => {
              async function fetchData() {
                     try {
                            const userId = localStorage.getItem('userId')

                            if (!userId)
                                   return
                            
                            const response = await axios.get(`${URL}/purchase/read/${userId}`)
                                          .then((data) => {setOrders(data.data)} )
                     
                     } catch (error) {
                            console.error('Error fetching data:', error);
                     }
              }
              
              fetchData();
       }, [])

       return (
              <div className='order-container container'>
                     <Navbar/>
                     <MDBContainer fluid className="my-5 text-center">
                            <h4 className="m3-4 mb-5">
                                   <strong>Orders History</strong>
                            </h4>
                            <MDBRow>
                                   {
                                          orders && orders.map((order)=> (
                                                 <OrderProduct key={order._id} order={order} />
                                          ))
                                   }
                            </MDBRow>
                     </MDBContainer>
              </div>
       )
}
