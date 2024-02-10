import React from 'react';
import { 
  BrowserRouter  ,
  Routes ,
  Route,
  Navigate
} from  'react-router-dom'

// Auth
import Login from './online-shop/auth/Login';
import SignUp from './online-shop/auth/SignUp';

// Shop
import Home from './online-shop/shop/Home';
import Order from './online-shop/shop/Order';


function App() : JSX.Element {

    const isUserLoggedIn = () : boolean => {
        const userId = localStorage.getItem("userId")
        console.log(localStorage.getItem("userId"));
        return userId != undefined
    }

    return (
        <div className="App">
          <BrowserRouter>
            <Routes>
              {isUserLoggedIn() ? (
                <Route path="/" element={<Home />} />
              ) : (
                <Route path="/" element={<Navigate to="/login" />} />
              )}
            
              <Route path="/login" element={<Login />} />
              <Route path='/signup' element= {<SignUp/>} />
              <Route path='/order' element= {<Order/>} />


            </Routes>
          </BrowserRouter>
      </div>
    )
}

export default App;
