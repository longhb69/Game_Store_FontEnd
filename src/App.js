import GameDeatail from './pages/GameDeatail';
import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryGame from './pages/CategoryGame';
import Header from './components/Header';
import Login from './pages/Login';
import { createContext, useEffect, useState } from 'react';
import { LoginProvider } from './LoginContext';
import DLCDeatail from './pages/DLCDeatail';
import Cart from './pages/Cart';
import Success from './pages/Success';
import NotFound from './pages/NotFound';
import FillterPage from './pages/FilterPage';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
export const UserContext = createContext();

function App() {
  return (
    <LoginProvider>
        <BrowserRouter>
            <Header>
              <Routes>
                  <Route path="" element={<Home/>}/>
                  <Route path="/app/:slug" element={<GameDeatail/>}/>
                  <Route path="/app/dlc/:slug" element={<DLCDeatail/>}/>
                  <Route path="/category/:slug" element={<CategoryGame/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/cart/success/:id" element={<Success/>}/>
                  <Route path="fillter/:slug" element={<FillterPage/>}/>
                  <Route path="search/:q" element={<Search/>}/>
                  <Route path="/404" element={<NotFound/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/signup" element={<SignUp/>}/>
              </Routes>
            </Header>
        </BrowserRouter>
    </LoginProvider>
  );
}
export default App;
