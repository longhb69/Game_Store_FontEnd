import { useContext, useEffect, useState } from 'react';
import { NavLink,Link, useNavigate, useLocation  } from 'react-router-dom';
import { LoginContext } from '../App';
import { useAccount, useLogin } from '../LoginContext';

export default function Header(props) {
    const [loggedIn, setLoggedIn] = useLogin()
    const [account, setAccount] = useAccount();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout(value) {
        setLoggedIn(value)
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
    })
    return (
        <>
            <div className='flex justify-between items-center mx-28 py-8'>
                <div>
                    <Link to={''} className='text-white'>STORE</Link>
                </div>
                <div className='flex items-center'>
                    {account ? <p className='text-white text-xl mr-5'>{account}</p> : null}
                    <Link to={'/cart'} className='text-white text-xl flex items-center'>Cart</Link>
                </div>
            </div>
            <div>
                {loggedIn ? 
                    <>
                        <p className='mx-5 text-white'>{username}</p>
                        <button
                            className='text-white text-xl'
                            onClick={() => {
                                setLoggedIn(false);
                                setAccount(null)
                            }}
                            >  
                            Logout
                        </button>
                    </>
                :
                    <button
                        className='text-white text-xl'
                        onClick={handleLogin}
                    >  
                        Login
                    </button>
                }
            </div>
        {props.children}
        </>
    );
}