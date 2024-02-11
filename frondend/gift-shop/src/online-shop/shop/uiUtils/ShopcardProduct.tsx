import { Flex, Input, InputNumber , Modal, Radio , notification} from 'antd'
import { MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBIcon, MDBBtn } from 'mdb-react-ui-kit'
import { ShoppingCardType } from '../Shopcard'
import React from 'react'
import axios from 'axios'
import URL from '../../utils/url'
import { PurchaseType } from './Product'

export default function ShopcardProduct( {product} : {product : ShoppingCardType} ) {

      const [quantity , setQuantity] = React.useState<number>(product.quantity)
      const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
      const [giftMessage , setGiftMesage] = React.useState<string>('')
      const [paymentOption , setPaymentOption] = React.useState<string>('CASH_ON')
      const [api , contextHolder] = notification.useNotification()

      const showModal = () => {
          setIsModalOpen(true);
      };
    
      const handleOk = async () => {
        // * purchase the gift
        const newOrder : PurchaseType = {
                userId : localStorage.getItem('userId'),
                giftId : product.giftId._id,
                quantity,
                price : quantity * product.giftId.price ,
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
          console.error(error)
        }
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
          setIsModalOpen(false);
      };

      const updateQuantity = async (value : number | null) => {
            try {
                const userId = localStorage.getItem('userId')
                if (!userId)
                    return
                const response = await axios.patch(`${URL}/card/update_quantity/${product._id}` , {userId , quantity : value})
                setQuantity(value ? value : 1)
            }
            catch (error) {
              console.error(error)
            }
      }

      return (
        
          <MDBCol md="4" className="mb-4 mb-lg-0">
              {contextHolder}
              <MDBCard className="text-black">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-product-cards/img1.webp"
                  position="top"
                  alt=""
                />
                <MDBCardBody>
                    <div className="text-center mt-1">
                      <MDBCardTitle className="h4"> {product.giftId.name} </MDBCardTitle>
                      <h6 className="text-primary mb-1 pb-3">price at ${product.totalPrice}</h6>
                    </div>
                  
                    <div className="d-flex flex-row">
                      <div className="flex-fill ms-1">
                        <div className='d-flex'>
                          <h6 >Quantity : </h6>
                          <InputNumber onChange={updateQuantity} value={quantity} className='ms-3' min={quantity} max={product.giftId.quantity} defaultValue={1}  />
                        </div>
                      </div>
                      <button onClick={showModal} className="flex-fill btn btn-outline-danger ms-2">
                        Buy now
                      </button>
                    </div>
                    <Modal title="Order the Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <div>
                          <Input onChange={(e) => setGiftMesage(e.target.value)}  className='mt-3' placeholder="type a message for gift" />
                        </div>
                        <h6 className='mt-3'> Payment Option  </h6>
                        <Flex onChange={(e : any) => setPaymentOption(e.target.value)} className='mt-3' vertical gap="middle">
                          <Radio.Group defaultValue="CASH_ON" buttonStyle="solid">
                            <Radio.Button value="CASH_ON">Cash On</Radio.Button>
                            <Radio.Button value="CREDIT">Credit</Radio.Button>
                            <Radio.Button value="DEBIT">Debit</Radio.Button>
                          </Radio.Group>
                        </Flex>
                    </Modal>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
        
      )
}
