import {
       MDBCard,
       MDBCardBody,
       MDBCardImage,
       MDBCol,
       MDBIcon,
       MDBRipple,
       MDBRow
} from 'mdb-react-ui-kit';
import {   Modal , InputNumber, Input , Flex, Radio , notification } from 'antd'
import { ProductType } from '../Home';
import Gift from '../../../images/categorie/gift.png'
import { useState } from 'react';
import axios from 'axios';
import URL from '../../utils/url';


export  type PurchaseType = {
  userId : string | null ,
  giftId : string ,
  quantity : number ,
  price : number ,
  paymentOption : string,
  message : string | null
}

export default function Product({product} : {product : ProductType} ) {


        const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
        const [quantity , setQuantity] = useState<number>(0)
        const [giftMessage , setGiftMessage] = useState<string>('')
        const [paymentOption , setPaymentOption] = useState<string>('CASH_ON')
        const [api , contextHolder] = notification.useNotification()

        const showModal = () => {
          setIsModalOpen(true);
        };

        const handleOk = async () => {
          // * purchase the gift
          const newOrder : PurchaseType = {
                  userId : localStorage.getItem('userId'),
                  giftId : product._id,
                  quantity,
                  price : quantity * product.price,
                  paymentOption,
                  message : giftMessage
          }

          console.log(newOrder);

          try {
              const response = await axios.post(`${URL}/purchase/create` , newOrder)
                                .then(() => {
                                  api.success({message : 'Successfully Order'})
                                })
          }
          catch(error) {
            api.error({message : 'Order not taken'})
          }
          setIsModalOpen(false);
        };

        const handleCancel = () => {
          setIsModalOpen(false);
        };

        const handleQuantity = (value: number | null) => {
          
          if (value)
              setQuantity(value)
            
        };

        const selectPaymentOption = (e : any) => {
          console.log(e.target.value);
          setPaymentOption(e.target.value)
        }
       
       return (
              <>
                {contextHolder}
                <MDBRow className="justify-content-center mb-0">
                  <MDBCol md="12" xl="10">
                    <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                            <MDBRipple
                              rippleColor="light"
                              rippleTag="div"
                              className="bg-image rounded hover-zoom hover-overlay"
                            >
                              <MDBCardImage
                                src={Gift}
                                fluid
                                className="w-70"
                              />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                ></div>
                              </a>
                            </MDBRipple>
                          </MDBCol>
                          <MDBCol md="6">
                            <h5>{product.name}</h5>
                            <div className="d-flex flex-row">
                              <div className="text-danger mb-1 me-2">
                                <MDBIcon fas icon="star" />
                                <MDBIcon fas icon="star" />
                                <MDBIcon fas icon="star" />
                                <MDBIcon fas icon="star" />
                              </div>
                              
                            </div>
                            <div className="mt-1 mb-0 text-muted small">
                              <span> {product.quantity} </span>
                              <span className="text-primary"> • </span>
                              <span> {product.categories} </span>
                              
                            </div>
                            <p className="text-truncate mb-4 mb-md-0">
                              {product.description}
                            </p>
                          </MDBCol>
                          <MDBCol
                            md="6"
                            lg="3"
                            className="border-sm-start-none border-start"
                          >
                            <div className="d-flex flex-row align-items-center mb-1">
                              <h4 className="mb-1 me-1"> {product.price} </h4>
                              <span className="text-danger">
                                <s> { product.price - 100} </s>
                              </span>
                            </div>
                            <h6 className="text-success">Free shipping</h6>
                            <div className="d-flex flex-column mt-4">
                              <button onClick={showModal} className='btn btn-primary' >
                                Purchase
                              </button>
                              <button   className="mt-2 btn btn-outline-primary">
                                Add to Shopping Card
                              </button>
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>

                <Modal title="Purchase" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <h5> {product.name} </h5>
                  <div className='d-flex'>
                    <h6 >Quantity : </h6>
                    <InputNumber className='ms-3' min={1} max={product.quantity} defaultValue={1} onChange={handleQuantity} />
                  </div>
                  <div>
                    <Input onChange={(e) => setGiftMessage(e.target.value)} className='mt-3' placeholder="type a message for gift" />
                  </div>
                  <h6 className='mt-3'> Payment Option  </h6>
                  <Flex onChange={selectPaymentOption} className='mt-3' vertical gap="middle">
                    <Radio.Group defaultValue="CASH_ON" buttonStyle="solid">
                      <Radio.Button value="CASH_ON">Cash On</Radio.Button>
                      <Radio.Button value="CREDIT">Credit</Radio.Button>
                      <Radio.Button value="DEBIT">Debit</Radio.Button>
                    </Radio.Group>
                  </Flex>
                </Modal>
              
              </>
);
}