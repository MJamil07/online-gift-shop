import {useState} from 'react'
import {
       MDBContainer,
       MDBInput,
       
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios'
import URL from '../utils/url';
import { notification } from 'antd'


export default function Login() : JSX.Element {

       const [email , setEmail] = useState<string>('')
       const [password , setPassword] = useState<string>('')
       const [api , contextHolder] = notification.useNotification()

       const handleLogin = async () => {
              try {
                     const response = await axios.post(`${URL}/user/login`, { email, password });
                     if (response.status === 200) {
                            api.success({ message: 'Login Successful' });
                            localStorage.setItem('userId' , response.data?.user?._id)
                            window.location.assign('/')
                     }
              } catch (error) {
                     api.error({ message: 'Login Failed'});
                     console.log(error);
              }
              
       }

       return (
              <MDBContainer className="p-3 my-5 d-flex flex-column w-25 ">
                     {contextHolder}
                     <h2 className="mb-4">Login</h2>
                     
                     <MDBInput 
                            wrapperClass='mb-4' 
                            label='Email address' 
                            id='form1' 
                            type='email'
                            value={email}
                            required = { true }
                            onChange={(e) => setEmail(e.target.value)}
                     />
                     <MDBInput 
                            wrapperClass='mb-4' 
                            label='Password' 
                            id='form2' 
                            type='password'
                            required = { true }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                     />
                     <button onClick={handleLogin} className="mb-4 btn btn-primary">Sign in</button>

                     <div className="text-center">
                            <p>Not a member? <Link to="/signup">SignUp</Link></p>
                     </div>

              </MDBContainer>
       )
}
