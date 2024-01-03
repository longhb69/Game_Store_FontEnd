import axios from 'axios';
import { baseUrl } from '../shared';
import { useEffect, useState } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../LoginContext';

export default function Cart() {
    const [cart, setCart] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useLogin();

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
            console.log(response)
            setCart(response)
        })
    }, [])
    return(
        <>
            <div className='mx-auto w-3/4 mt-20'>
                <div className='mb-5'>
                    <h1>
                        <span className='text-2xl'>Your Shopping Cart</span>
                    </h1>
                </div>
                <div className='flex '>
                    <div className='flex flex-col gap-x-10 basis-4/6 mr-10'>
                            {cart ? (
                                <>
                                    {cart.items.map((item) => {
                                        return (
                                                <div key={item.product.pk} className='flex flex-row bg-[#0e141bcc] py-5 px-4 mb-4'>
                                                    <div className=''>
                                                        <Link to={'#'}>
                                                            <img className='min-w-[150px] h-[200px] rounded object-fit' src={item.product.cover}/>
                                                        </Link>
                                                    </div>
                                                    <div className='px-3 pt-3'>
                                                        <p className='text-2xl'>{item.product.name}</p>
                                                    </div>
                                                    <div className='ml-auto	p-0 m-0'>
                                                        <div>{item.product.price}<span className='underline'>đ</span></div>
                                                    </div>
                                                </div>
                                        );
                                    })}
                                </>
                            ) : null}
                    
                    </div>
                    <div className="basis-4/12">
                        <div>
                                <div>
                                    <span>Games Summary</span>
                                </div>
                        </div>  
                    </div>
                </div>
            </div>
        </>
    )
}