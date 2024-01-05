import axios from 'axios';
import { baseUrl } from '../shared';
import { useEffect, useState } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../LoginContext';

export default function Cart() {
    const [cart, setCart] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn, cartQuantity, setCartQuantity, getCartQuantity] = useLogin();


    useEffect(() => {
        const url = baseUrl + 'cart/'
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'), 
            },
        }).then((response) => {
            if (response.status === 403 || response.status === 401) {
                setLoggedIn(false);
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname
                    }
                });
            }
            else if(!response.ok) {
                throw new Error('Something went wrong')
            }
            return response.json();
        }).then((response) => {
            const reversedItems = response.items.reverse();
            setCart({...cart, items:reversedItems})
        })
    }, [])
    
    function handleDelete(item_id) {
        const url = baseUrl + `cart/cartitem/delete/${item_id}`
        axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'), 
            },
        }).then((response) => {
            if(response.status >= 200 && response.status < 300) {
                setCart((prevCart) => {
                    const updateItems = prevCart.items.filter(item => item.id != item_id);
                    console.log(prevCart)
                    return {
                        ...prevCart,
                        items: updateItems
                    }
                })
                getCartQuantity()
            }
        })
    }
    return(
        <>
            <div className='mx-auto w-3/4 mt-20'>
                <div className='mb-5'>
                    <h1>
                        <span className='text-5xl'>Your Shopping Cart</span>
                    </h1>
                </div>
                <div className={`flex ${cart && cart.items.length <= 0 ? 'justify-center items-center'  : ''}`}>
                            {cart && cart.items.length > 0 ? (
                                <>
                                    <div className='flex flex-col gap-x-10 basis-4/6 mr-10'>
                                        {cart.items.map((item) => {
                                            return (
                                                    <div key={item.pk} className='flex flex-row bg-[#0e141bcc] py-5 px-4 mb-4'>
                                                        <div className=''>
                                                            <Link to={item.type === 'game' ? '/app/'+item.slug : '/app/dlc/'+item.slug}>
                                                                <img className='min-w-[150px] h-[200px] rounded object-fit hover:brightness-125' src={item.cover}/>
                                                            </Link>
                                                        </div>
                                                        <div className='px-3 pt-3'>
                                                            <Link to={item.type === 'game' ? '/app/'+item.slug : '/app/dlc/'+item.slug}>
                                                                <p className='text-2xl hover:underline decoration-1'>{item.name}</p>
                                                            </Link>
                                                        </div>
                                                        <div className='ml-auto	p-0 m-0'>
                                                            <div className='text-right'>
                                                                <div>{item.price}<span className='underline'>đ</span></div>
                                                                <div>
                                                                    <button className='text-gray-400 underline hover:no-underline'
                                                                            onClick={() => handleDelete(item.id)}>
                                                                        <span className=''>Remove</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : 
                                <>
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="mb-3 h-[100px]">
                                        </div>
                                        <div className="text-3xl mb-5">
                                            <span>Your cart is empty.</span>
                                        </div>
                                        <div>
                                            <span>
                                                <Link to={'/'} className='text-lg border-b border-dotted border-gray-600 hover:border-white hover:border-solid'>
                                                    Shop for Games
                                                </Link>
                                            </span>
                                        </div>
                                    </div>            
                                </>
                            }
                    {cart && cart.items.length > 0 ? 
                        <div className="basis-4/12">
                            <div>
                                <div>
                                    <span>Games Summary</span>
                                </div>
                            </div>  
                    </div>
                    : null}               
                </div>
            </div>
        </>
    )
}