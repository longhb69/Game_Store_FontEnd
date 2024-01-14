import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { useAccount, useLogin, useCart } from '../LoginContext';

export default function Header(props) {
    const [loggedIn, setLoggedIn, cartQuantity, setCartQuantity] = useLogin();
    const [itemsInCart, setItemsInCart,getItemInCart] = useCart();
    const [account, setAccount] = useAccount();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

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
            <div className='flex  sticky top-0 h-[100px] z-[900] bg-[#121212]'>
                <div className='flex justify-between items-center ml-auto mr-auto w-[70%] max-w-[1600px]'>
                    <Link to={''}>
                        <div id='logo' className='p-2 bg-[#5532db] rounded border border-[#fff]'>
                            <img className='h-9' src='https://res.cloudinary.com/dfo61m8dy/image/upload/v1704796277/Store_yr1avb.svg'/>
                        </div>
                    </Link>
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