import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart, useLogin } from '../LoginContext';
import { baseUrl } from '../shared';
import { useRef, useEffect } from 'react';
import Lottie from "lottie-react";
import * as animationData from "../loading.json";


//from-[#6164654D] to-[blue-500]    #E2F4FF4D
export default function GameDLC(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn, cartQuantity, setCartQuantity, getCartQuantity] = useLogin()
    const [itemsInCart, setItemsInCart,getItemInCart] = useCart()
    const addCartRef = useRef()
    const lottieRef = useRef();

    function addCart(game_id) {
        const url = baseUrl + 'cart/'
        const data = {type: "dlc", base_game_id: game_id}
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'), 
            },
            body: JSON.stringify(data),
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
            addCartRef.current.classList.add('loading');
            setTimeout(() => {
                addCartRef.current.classList.remove('loading')
            }, 2000)
            getCartQuantity();
            getItemInCart();
            return response.json();
        })
    }
    useEffect(() => {
        if(itemsInCart) {
            console.log(itemsInCart)
        }
    },[])

    return (
        <>
            <div className='block bg-gradient-to-r from-[#2a0e4e] to-[#5532db] rounded-lg w-full'>
                <div className="flex flex-row flex-nowrap	">
                    <div className="basis-1/3">
                        <div className="min-h-[154px]">
                            <Link className='' to={'/app/dlc/' + props.slug} key={props.id}>
                                <img className="rounded-l" src={props.image} alt={props.name}/>
                            </Link>
                        </div>
                    </div>
                    <div className="basis-2/3 right ml-3 mt-1">
                        <div>
                            <Link className='block' to={'/app/dlc/' + props.slug} key={props.id}>
                                <h3 >
                                    <span>{props.name}</span>
                                </h3>
                            </Link>
                        </div>
                        <div className='flex gap-4 mt-5 items-center'>
                            <div className='mr-3'>
                                <div className='text-[#32db55] text-lg font-semibold p-1.5'>   
                                    <span>{props.price}<span className='underline'>đ</span></span>
                                </div>
                            </div>
                            <div className=''>
                                <div ref={addCartRef} className='rounded border border-[245_245_245_0.6] hover:bg-white/[.07] transition ease-out duration-[150ms] min-w-[80px]'>
                                    <Lottie className='lottie-dlc' lottieRef={lottieRef} animationData={animationData} loop={true}/>
                                    <button 
                                        className='p-1.5'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addCart(props.id)
                                        }}>
                                        {itemsInCart && itemsInCart.items_name.includes(props.slug) ? 
                                            <span className='cart-text'>IN CART</span>
                                        : <span className='cart-text'>ADD TO CART</span>}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className='rounded border border-[245_245_245_0.6] hover:bg-white/[.07] transition ease-out duration-[150ms] mr-2'>
                                    <button className='p-1.5'>
                                        <span>ADD TO WISHLIST</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
} 