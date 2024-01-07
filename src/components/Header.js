import { useContext, useEffect, useState } from 'react';
import { NavLink,Link, useNavigate, useLocation  } from 'react-router-dom';
import { LoginContext } from '../App';
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
    useEffect(() => {
        console.log(loggedIn)
    }, [loggedIn])
    return (
        <>
            <div className='flex justify-between items-center mx-28 py-8'>
                <div>
                    <Link to={''} className='text-white'>STORE</Link>
                </div>
                <div className='flex items-center'>
                    {account ? <p className='text-white text-xl mr-5'>{account}</p> : null}
                    <div>
                        <div>
                            <li className='flex whitespace-nowrap items-center'>
                                <div>
                                    <Link to={'/cart'} className='text-white text-xl flex items-center p-2'>Cart</Link>
                                </div>
                                {cartQuantity !== 0 && loggedIn ? 
                                    <div className='bg-white h-auto w-[30px] text-center rounded-xl ml-0.5'>
                                        <span id="CartQuantityContainer" className='font-bold text-black '>{cartQuantity}</span>
                                    </div>
                                : null}
                            </li>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {loggedIn ? 
                    <>
                        <p className='mx-5 text-white'>{username}</p>
                        <button
                            className='text-white text-xl'
                            onClick={() => {
                                handleLogout(false)
                            }}
                            >  
                            Logout
                        </button>
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
        {props.children}
        </>
    );
}