import { MDBCol, MDBCard, MDBRipple, MDBCardImage, MDBCardBody } from 'mdb-react-ui-kit'
import React from 'react'
import { PurchaseType } from '../Order'

export default function OrderProduct({order} : {order : PurchaseType}) {
       console.log(order);
       
       return (
              <>
                     <MDBCol md="12" lg="4" className="mb-4">
                            <MDBCard>
                                   <MDBRipple
                                          rippleColor="light"
                                          rippleTag="div"
                                          className="bg-image rounded hover-zoom"
                                   >
                                          <MDBCardImage
                                                 src= {''}
                                                 fluid
                                                 className="w-100"
                                          />
                                          <a href="#!">
                                                 <div className="mask">
                                                        <div className="d-flex justify-content-start align-items-end h-100">
                                                               <h5>
                                                                      <span className="badge bg-primary ms-2"> Q : {order.quantity} </span>
                                                               </h5>
                                                               <h5>
                                                                      <span className="badge bg-success ms-2"> {order.paymentOption} </span>
                                                               </h5>
                                                               
                                                        </div>
                                                 </div>
                                                 <div className="hover-overlay">
                                                        <div
                                                               className="mask"
                                                               style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}>
                                                        </div>
                                                 </div>
                                          </a>
                                   </MDBRipple>
                                   <MDBCardBody>
                                          <a href="#!" className="text-reset">
                                                 <h5 className="card-title mb-3"> {order.giftId.name} </h5>
                                                 <h5 className="card-title mb-3"> {order.isCancel} </h5>

                                          </a>
                                          <a href="#!" className="text-reset">
                                                 <p> {order.giftId.categories} </p>
                                                 <p> {order.message ? order.message : 'No gift message'} </p>

                                          </a>
                                          <h6 className="mb-3">${order.price}</h6>
                                   </MDBCardBody>
                            </MDBCard>
                     </MDBCol>
              </>
       )
}
