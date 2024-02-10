import { useState } from 'react';
import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import axios from 'axios';
import URL from '../utils/url';
import { notification } from 'antd';

export type UserType = {
       username: string;
       email: string;
       password: string;
       contact: string;
};

export default function SignUp(): JSX.Element {
       const [user, setUser] = useState<UserType>({
              username: '',
              email: '',
              contact: '',
              password: '',
       });
       const [api, contextHolder] = notification.useNotification();
       
       const handleLogin = async () => {
              console.log(user);
              
              try {
                     const response = await axios.post(`${URL}/user/register`, user);
                     if (response.status === 201) {
                            api.success({ message: 'Signup Successful' });
                            localStorage.setItem('userId' , response.data?.user?._id)
                            window.location.assign('/')
                     }
              } catch (error) {
                     api.error({ message: 'Login Failed' });
                     console.log(error);
              }
       };

       const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
              const { name, value } = e.target;
              setUser((prevUser) => ({
                     ...prevUser,
                     [name]: value,
              }));
       };

       return (
              <MDBContainer className="p-3 my-5 d-flex flex-column w-25 ">
                     {contextHolder}
                     <h2 className="mb-4">Sign Up</h2>

                     <MDBInput
                            wrapperClass="mb-4"
                            label="Username"
                            id="form1"
                            type="text"
                            name="username"
                            required={true}
                            value={user.username}
                            onChange={handleInputChanged}
                     />

                     <MDBInput
                            wrapperClass="mb-4"
                            label="Email address"
                            id="form2"
                            type="email"
                            name="email"
                            required={true}
                            value={user.email}
                            onChange={handleInputChanged}
                     />
                     <MDBInput
                            wrapperClass="mb-4"
                            label="Password"
                            id="form3"
                            type="password"
                            name="password"
                            required={true}
                            value={user.password}
                            onChange={handleInputChanged}
                     />

                     <MDBInput
                            wrapperClass="mb-4"
                            label="Contact"
                            id="form4"
                            type="text"
                            name="contact"
                            required={true}
                            value={user.contact}
                            onChange={handleInputChanged}
                     />

                     <button onClick={handleLogin} className="mb-4 btn btn-primary">
                            Sign Up
                     </button>

                     <div className="text-center">
                            <p>
                                   Already Signed up? <Link to="/login">login</Link>
                            </p>
                     </div>
              </MDBContainer>
       );
}
