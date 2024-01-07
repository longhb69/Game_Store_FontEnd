import axios from 'axios';
import { baseUrl } from '../shared';
import { useEffect, useState } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../LoginContext';
import CartItem from '../components/CartItem';

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
            const updateItem = {...cart, items:reversedItems}
            setCart({...updateItem, pk:response.pk, total_price: parseFloat(response.total_price).toFixed(3)})
        }).catch((e) => {
            console.error('Error fetching cart data:', e);
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
            <div className='mx-auto w-4/5 mt-20'>
                <div className='mb-12'>
                    <h1>
                        <span className='text-5xl'>Your Shopping Cart</span>
                    </h1>
                </div>
                <div className={`flex ${cart && cart.items.length <= 0 ? 'justify-center items-center'  : ''}`}>
                            {cart && cart.items.length > 0 ? (
                                <>
                                    <div className='flex flex-col  gap-x-10 basis-4/6 mr-10'>
                                        {cart.items.map((item) => {
                                            return (
                                                    <CartItem
                                                        key={cart.pk}
                                                        id={item.id}
                                                        slug={item.slug}
                                                        type={item.type}
                                                        name={item.name}
                                                        price={item.price}
                                                        cover={item.cover}
                                                        dlcs = {item.dlcs}
                                                        handleDelete={handleDelete}
                                                        />
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
                                <div className='text-3xl'>
                                    <span>Games Summary</span>
                                </div>
                                <div className='mt-2 text-lg'>
                                        <div className='flex justify-between'>
                                            <div className='mr-5'>
                                                <span>Price</span>
                                            </div>
                                            <span>{cart.total_price}<span className='underline'>đ</span></span>
                                        </div>
                                </div>
                                <div className='pt-6 border-t mt-8 border-gray-100 text-lg'>
                                    <div className='flex justify-between'>
                                        <div className='mr-5 font-bold'>
                                            <span>Subtotal</span>
                                        </div>
                                        <span className='font-bold '>{cart.total_price}<span className='underline'>đ</span></span>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <button className='w-full h-[50px] bg-[#0066CC] rounded font-medium	hover:brightness-125'>
                                        <span>CHECK OUT</span>
                                    </button>
                                </div>
                            </div>  
                        </div>
                    : null}               
                </div>
            </div>
        </>
    )
}