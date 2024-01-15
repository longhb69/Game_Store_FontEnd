import GameDeatail from './pages/GameDeatail';
import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryGame from './pages/CategoryGame';
import Header from './components/Header';
import Login from './pages/Login';
import { createContext, useEffect, useState } from 'react';
import { baseUrl } from './shared';
import axios, { Axios } from 'axios';
import { LoginProvider } from './LoginContext';
import DLCDeatail from './pages/DLCDeatail';
import Cart from './pages/Cart';
import Success from './pages/Success';

//export const LoginContext = createContext();
export const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.access ? true : false
  )
  const [username, setUsername] = useState()
  // function changeLoggedIn(value) {
  //   setLoggedIn(value)
  //   if(value === false) {
  //     localStorage.clear();
  //   }
  // }

  // useEffect(() => {
  //   function refreshTokens() {
  //       if(localStorage.refresh) {
  //         const url = baseUrl + 'api/token/refresh/';
  //         axios.post(url, {
  //           refresh: localStorage.refresh,
  //         }).then((respone) => {
  //           console.log(respone.data)
  //           localStorage.access = respone.data.access
  //           localStorage.refresh = respone.data.refresh
  //           setLoggedIn(true)
  //         })
  //       }
  //   }
  //   const minute = 1000 * 60 
  //   refreshTokens();
  //   setInterval(refreshTokens(), minute * 5)
  // })
  
  return (
    <LoginProvider>
        <BrowserRouter>
            <Header>
              <Routes>
                  <Route path="" element={<Home/>}/>
                  <Route path="/app/:slug" element={<GameDeatail/>}/>
                  <Route path="/app/dlc/:slug" element={<DLCDeatail/>}/>
                  <Route path="/category/:slug" element={<CategoryGame/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/cart/success" element={<Success/>}/>
              </Routes>
            </Header>
        </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
