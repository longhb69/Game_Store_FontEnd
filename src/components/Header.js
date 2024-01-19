import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { useAccount, useLogin, useCart } from '../LoginContext';

export default function Header(props) {
    const [loggedIn, setLoggedIn] = useLogin();
    const [itemsInCart, setItemsInCart,getItemInCart, cartQuantity, setCartQuantity, getCartQuantity] = useCart();
    const [account, setAccount] = useAccount();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [isInputFocused, setIsInputFocused] = useState(false);

    function handleLogout(value) {
        navigate('');
        setLoggedIn(value);
        setAccount(null);
        setItemsInCart(null)
    }
    const handleSetUsername = (username) => {
        setUsername(username);
    }
    const handleLogin = () => {
        navigate('/login', {
            state: {
                previousUrl: location.pathname
            }
        });
    }
    return (
        <>
            <div className='flex sticky top-0 h-[100px] z-[900] bg-[#121212]'>
                <div className='flex justify-between ml-auto mr-auto w-[75%] max-w-[1600px]'>
                    <div className='flex justify-center items-center'>
                        <Link to={''}>
                            <div id='logo' className='p-2 bg-[#5532db] rounded border border-[#fff]'>
                                <img className='h-9' src='https://res.cloudinary.com/dfo61m8dy/image/upload/v1704796277/Store_yr1avb.svg'/>
                            </div>
                        </Link>
                        <div className='flex h-[55px] ml-5 '>
                            <div className={`flex items-center rounded-[40px] my-2 min-w-[240px] w-[240px] ${isInputFocused ? 'bg-[#fff]/[.1]' : 'bg-[#202020]'} transition ease-in-out duration-100`}>
                                <div className='flex shirk-0 h-full m-[13.62px]'>
                                    <button className='cursor-default text-[#F5F5F5]/[.6]'>
                                        <span className='h-[13px] w-[13px] block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 21 20" preserveAspectRatio="xMidYMid meet"><g transform="scale(1 -1) rotate(-45 -11.93502884 -2)" stroke="currentColor" stroke-width="1.65" fill="none" fill-rule="evenodd"><circle cx="7.70710678" cy="7.70710678" r="7"></circle><path d="M15.2071068 8.62132034h5.6923881" stroke-linecap="square"></path></g></svg>
                                        </span>
                                    </button>
                                </div>
                                <div className='w-full h-full'>
                                    <div className='items-center flex h-full w-full'>
                                        <input className={`mr-[13.62px] text-[#F5F5F5] border-none overflow-hidden whitespace-nowrap w-full outline-0 ${isInputFocused ? 'bg-transparent' : 'bg-[#202020] transition ease-in-out duration-100'}`}
                                        placeholder='Search Store'
                                        onFocus={() => setIsInputFocused(true)}
                                        onBlur={() => setIsInputFocused(false)}/>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        {loggedIn ? 
                            <>
                                <div className='dropdown cursor-pointer relative'>
                                    <p className='account-name text-xl text-[#aaaaae] p-2 mr-2'>{account}</p> 
                                    <div className='friendly-box friendly-box-top'></div>
                                    <div className='friendly-box friendly-box-wide-adjust'></div>
                                    <div className= 'flex flex-col items-center rounded-lg dropdown-menu bg-[#202024] p-2 pr-3'>
                                        <button className='dropdown-btn'>Wallet</button>
                                        <button className='dropdown-btn'>Account</button>
                                        <button className='dropdown-btn'>Wishlist</button>
                                        <div className='flex dropdown-btn dropdown-logout-btn'>
                                            <button onClick={() => handleLogout(false)} className='logout-btn'>
                                                Logout
                                            </button>
                                            <div className='logout-icon'></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <li className='flex whitespace-nowrap items-center'>
                                            <div>
                                                <Link to={'/cart'} className='text-[#aaaaae] hover:text-[#F0FFFF] text-xl flex items-center p-2'>Cart</Link>
                                            </div>
                                            {cartQuantity !== 0 && loggedIn ? 
                                                <div id='cart-quantity-container' className='cart-quantity-container bg-white h-auto w-[30px] text-center rounded-xl ml-0.5'>
                                                    <span id="CartQuantity" className='font-bold text-black '>{cartQuantity}</span>
                                                </div>
                                            : null}
                                        </li>
                                    </div>
                                </div>
                            </>
                        :
                        <button
                            className='text-white text-xl'
                            onClick={() => handleLogin()}
                        >  
                            Login
                        </button>
                        }
                    </div>
                </div>
            </div>
        {props.children}
        </>
    );
}