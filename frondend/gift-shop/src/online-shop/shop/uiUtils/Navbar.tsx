
import React, { useState } from 'react';
import {
       MDBContainer,
       MDBNavbar,
       MDBNavbarBrand,
       MDBNavbarToggler,
       MDBNavbarNav,
       MDBNavbarItem,
       MDBNavbarLink,
       MDBCollapse,
       MDBIcon
} from 'mdb-react-ui-kit';
import { LogoutOutlined } from '@ant-design/icons';

export default function App() {
       const [openNav, setOpenNav] = useState(false);
       const logout = () => {
              localStorage.removeItem('userId')
              window.location.assign('/')
       }
       return (
              <MDBNavbar  expand='lg' light bgColor='light'>
                     <MDBContainer fluid>
                            <MDBNavbarBrand href='/'>Gift.io</MDBNavbarBrand>
                            <MDBNavbarToggler
                                   type='button'
                                   aria-expanded='false'
                                   aria-label='Toggle navigation'
                                   onClick={() => setOpenNav(!openNav)}
                            >
                                   <MDBIcon icon='bars' fas />
                            </MDBNavbarToggler>
                            <MDBCollapse navbar open={openNav}>
                                   <MDBNavbarNav>
                                          <MDBNavbarItem>
                                                 <MDBNavbarLink href='/order'>Order</MDBNavbarLink>
                                          </MDBNavbarItem>
                                          <MDBNavbarItem>
                                                 <MDBNavbarLink href='/shopcard'>Shopcard</MDBNavbarLink>
                                          </MDBNavbarItem>
                                          <MDBNavbarItem>
                                                 <MDBNavbarLink onClick={logout} style={{color : 'red'}} href='/shopcard'> <LogoutOutlined /> </MDBNavbarLink>
                                          </MDBNavbarItem>

                                   </MDBNavbarNav>
                            </MDBCollapse>
                     </MDBContainer>
              </MDBNavbar>
       );
}