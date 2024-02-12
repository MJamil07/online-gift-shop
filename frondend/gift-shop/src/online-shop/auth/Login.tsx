import { useState } from 'react'
import {
       MDBCol,
       MDBContainer,
       MDBInput,
       MDBRow,

} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import axios from 'axios'
import URL from '../utils/url';
import { notification } from 'antd'
import Gift from '../../images/categorie/gift.png'


export default function Login(): JSX.Element {

       const [email, setEmail] = useState<string>('')
       const [password, setPassword] = useState<string>('')
       const [api, contextHolder] = notification.useNotification()

       const handleLogin = async () => {
              try {
                     const response = await axios.post(`${URL}/user/login`, { email, password });
                     if (response.status === 200) {
                            api.success({ message: 'Login Successful' });
                            localStorage.setItem('userId', response.data?.user?._id)
                            window.location.assign('/')
                     }
              } catch (error) {
                     api.error({ message: 'Login Failed' });
                     console.log(error);
              }

       }

       return (
              <MDBContainer style={{backgroundColor : 'white' , padding : '50px' , marginTop : '150px' }} >
                     {contextHolder}
                     <MDBRow className="justify-content-center">
                            <MDBCol md="8" lg="6" className="text-center">
                                   <img width="70" height="70" src= {Gift} alt="Logo" className="mb-4" />
                                   <h2 className="mb-4">Gift.io</h2>
                            </MDBCol>
                     </MDBRow>
                     <MDBRow  className="justify-content-center">
                            <MDBCol md="8" lg="6">
                                   <h3 className="mb-4">Login</h3>
                                   <MDBInput
                                          wrapperClass='mb-4'
                                          label='Email address'
                                          id='form1'
                                          type='email'
                                          value={email}
                                          required={true}
                                          onChange={(e) => setEmail(e.target.value)}
                                   />
                                   <MDBInput
                                          wrapperClass='mb-4'
                                          label='Password'
                                          id='form2'
                                          type='password'
                                          required={true}
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                   />
                                   <button onClick={handleLogin} className="mb-4 btn btn-primary">Login in with Gift.io</button>

                                   <div className="text-center">
                                          <p>Not a member? <Link to="/signup">Sign Up</Link></p>
                                   </div>
                            </MDBCol>
                     </MDBRow>
              </MDBContainer>


       )
}
