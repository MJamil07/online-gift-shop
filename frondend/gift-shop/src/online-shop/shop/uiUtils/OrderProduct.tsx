import { MDBCol, MDBCard, MDBCardImage, MDBCardBody,  MDBCardFooter, MDBTypography } from 'mdb-react-ui-kit'
import { PurchaseType } from '../Order'
import Gift from '../../../images/categorie/gift.png'
import '../styles/orderProduct.css'    
import axios from 'axios'
import URL from '../../utils/url'
import React from 'react'

export default function OrderProduct({ order , refresh , setReferesh }: { order: PurchaseType , refresh : boolean , setReferesh : React.Dispatch<React.SetStateAction<boolean>>}) {

       const cancelOrder = async () => {
              try {
                  const userId = localStorage.getItem('userId')
                  if (!userId)
                      return

                  const response = await axios.patch(`${URL}/purchase/cancel_order/${order._id}` , {userId , orderTrack : 'Cancel'})
                  setReferesh(!refresh)
              }
              catch (error) {
                console.error(error)
              }
       }

       const removeOrder = async () => {
              try {
                     const userId = localStorage.getItem('userId')
                     if (!userId)
                         return
                     const response = await axios.delete(`${URL}/purchase/remove/${order._id}` , {headers: { 'Authorization': userId}})
                     setReferesh(!refresh)
                 }
                 catch (error) {
                   console.error(error)
                 }
            };
            

       return (
              <>
                     <MDBCol  className='mt-3' md="10" lg="8" xl="6">
                            <MDBCard
                                   className="card-stepper"
                                   style={{ borderRadius: "16px" }}
                            >
                                   <MDBCardBody className="p-4">
                                          <div className="d-flex flex-row mb-4 pb-2">
                                                 <div className="flex-fill">
                                                        <MDBTypography tag="h5" className="bold">
                                                               {order.giftId.name}
                                                        </MDBTypography>
                                                        <p className="text-muted"> Qt: {order.quantity}</p>
                                                        <MDBTypography tag="h4" className="mb-3">
                                                               $ {order.price}
                                                               <span className="small text-muted"> via ( {order.giftId.categories} ) </span> {" "}
                                                        </MDBTypography>
                                                        <p className="text-muted">
                                                               Tracking Status on:
                                                               <span className="text-success">{order.orderTrack} </span>
                                                               <br />
                                                               Gift Message on:
                                                               <span className="text-success">{order.message}</span>
                                                               <br />
                                                                Occasion:
                                                               <span className="text-success">{order.occasion}</span>
                                                        </p>
                                                 </div>
                                                 <div>
                                                        <MDBCardImage
                                                               fluid
                                                               className="align-self-center"
                                                               src={order.giftId.image ? `https://online-gift-shop-api.vercel.app/${order.giftId.image}`.replace(/\\/g, '/') : Gift}
                                                               width="250"
                                                              
                                                        />
                                                 </div>
                                          </div>
                                   </MDBCardBody>
                                   <MDBCardFooter className="p-4">
                                          <div className="d-flex justify-content-between">
                                                 <button onClick={cancelOrder} className='btn btn-danger'> Cancel Order </button>
                                                 { order.orderTrack === 'Cancel' ? <button onClick={removeOrder} className='btn btn-outline-dark'> Remove </button> : <></> }
                                          </div>
                                   </MDBCardFooter>
                            </MDBCard>
                     </MDBCol>

              </>
       )
}
