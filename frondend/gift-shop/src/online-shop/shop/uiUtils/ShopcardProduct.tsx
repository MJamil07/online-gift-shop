import { Flex, Input, InputNumber, Modal, Radio, notification } from 'antd'
import { MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBIcon, MDBBtn, MDBRow } from 'mdb-react-ui-kit'
import { ShoppingCardType } from '../Shopcard'
import { DeleteFilled } from '@ant-design/icons'
import React from 'react'
import axios from 'axios'
import URL from '../../utils/url'
import { PurchaseType } from './Product'
import Gift from '../../../images/categorie/gift.png'


export default function ShopcardProduct({ product, refresh, setRefresh }: { product: ShoppingCardType, refresh: boolean, setRefresh: React.Dispatch<React.SetStateAction<boolean>> }) {

  const [quantity, setQuantity] = React.useState<number>(product.quantity)
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [giftMessage, setGiftMesage] = React.useState<string>('')
  const [paymentOption, setPaymentOption] = React.useState<string>('CASH_ON')
  const [occasion, setOccasion] = React.useState<string>('Birthday')

  const [api, contextHolder] = notification.useNotification()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    // * purchase the gift
    const newOrder: PurchaseType = {
      userId: localStorage.getItem('userId'),
      giftId: product.giftId._id,
      quantity,
      price: quantity * product.giftId.price,
      paymentOption,
      message: giftMessage,
      occasion
    }

    try {
      const response = await axios.post(`${URL}/purchase/create`, newOrder)
        .then(() => {
          api.success({ message: 'Successfully Order' })
        })
    }
    catch (error) {
      api.error({ message: 'Order not taken' })
      console.error(error)
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const selectOccasion = (e: any) => {
    setOccasion(e.target.value)
  }

  const updateQuantity = async (value: number | null) => {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId)
        return
      const response = await axios.patch(`${URL}/card/update_quantity/${product._id}`, { userId, quantity: value })
      setQuantity(value ? value : 1)
    }
    catch (error) {
      console.error(error)
    }
  }

  const deleteShoppingCardProduct = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId)
        return
      const response = await axios.delete(`${URL}/card/remove/${product._id}`, { headers: { 'Authorization': userId } })
      setRefresh(!refresh)
    }
    catch (error) {
      console.error(error)
    }
  };

  return (

    <MDBCol md="4" className="mb-4 mt-2 mb-lg-0">
      {contextHolder}
      <MDBCard className="text-black">
        <MDBCardImage
          src={product.giftId.image ? `https://online-gift-shop-api.vercel.app/${product.giftId.image}`.replace(/\\/g, '/') : Gift}
          className="align-self-center"
          position='top'
          width="250"
          fluid
          alt=""
        />
        <MDBCardBody>
          <div className="text-center mt-1">
            <MDBCardTitle className="h4"> {product.giftId.name} </MDBCardTitle>
            <h6 className="text-primary mb-1 pb-3">price at ${product.totalPrice * quantity}</h6>
          </div>

          <MDBRow className="d-flex flex-row">
            <div className="flex-fill ms-1">
              <div className='d-flex'>
                <h6 >Q : </h6>
                <InputNumber onChange={updateQuantity} value={quantity} className='ms-3' min={1} max={product.giftId.quantity} defaultValue={1} />
                <button onClick={showModal} className="flex-fill btn btn-outline-success ms-2">
                  Buy now
                </button>
                <button onClick={deleteShoppingCardProduct} className='btn ms-2 btn-outline-danger p-2'> <DeleteFilled /> </button>
              </div>
            </div>

          </MDBRow>
          <Modal title="Order the Product" okText='Purchase' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h5> {product.giftId.name} </h5>
            <div>
              <Input onChange={(e) => setGiftMesage(e.target.value)} className='mt-3' placeholder="type a message for gift" />
            </div>
            <h6 className='mt-3'> Payment Option  </h6>
            <Flex onChange={(e: any) => setPaymentOption(e.target.value)} className='mt-3' vertical gap="middle">
              <Radio.Group defaultValue="CASH_ON" buttonStyle="solid">
                <Radio.Button value="CASH_ON">Cash On</Radio.Button>
                <Radio.Button value="CREDIT">Credit</Radio.Button>
                <Radio.Button value="DEBIT">Debit</Radio.Button>
              </Radio.Group>
            </Flex>
            <h6 className='mt-3'> Choose your Occasion  </h6>
            <Flex onChange={selectOccasion} className='mt-3' vertical gap="middle">
              <Radio.Group defaultValue="Birthday" buttonStyle="solid">
                <Radio.Button value="Birthday">Birthday</Radio.Button>
                <Radio.Button value="Wedding">Wedding</Radio.Button>
                <Radio.Button value="Graduation">Graduation</Radio.Button>
                <Radio.Button value="Anniversary">Anniversary</Radio.Button>
                <Radio.Button value="Valentine\'s Day">Valentine's Day</Radio.Button>
                <Radio.Button value="Mother\'s Day">Mother's Day</Radio.Button>
                <Radio.Button value="Father\'s Day">Father's Day</Radio.Button>
                <Radio.Button value="Christmas">Christmas</Radio.Button>
              </Radio.Group>
            </Flex>
          </Modal>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>

  )
}
