import { LoginContext } from '../App';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart, useLogin } from '../LoginContext';
import { baseUrl } from '../shared';
import { useEffect } from 'react';


//from-[#6164654D] to-[blue-500]    #E2F4FF4D
export default function GameDLC(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn, cartQuantity, setCartQuantity, getCartQuantity] = useLogin()
    const [itemsInCart, setItemsInCart,getItemInCart] = useCart()

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
        <div className='flex flew-row'>
            <div className='block bg-gradient-to-r from-[#6164654D] to-blue-600 basis-2/3 rounded-lg mb-5'>
                <div className="flex flex-row">
                    <div className="basis-1/3 min-w-[200px] min-h-[100px]">
                        <div className="w-full h-full">
                            <Link className='block h-full w-full' to={'/app/dlc/' + props.slug} key={props.id}>
                                <img className="w-full h-full object-fit block" src={props.image} alt={props.name}/>
                            </Link>
                        </div>
                    </div>
                    <div className="right ml-5 mt-3">
                        <div>
                            <Link className='block' to={'/app/dlc/' + props.slug} key={props.id}>
                                <h3 >
                                    <span>{props.name}</span>
                                </h3>
                            </Link>
                        </div>
                        <div className='flex gap-4 mt-2'>
                            <div className='mr-3'>
                                <div className='text-[#75b022] text-lg font-semibold'>   
                                    <span>{props.price}<span className='underline'>đ</span></span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addCart(props.id)
                                        }}>
                                        {itemsInCart && itemsInCart.items_name.includes(props.slug) ? 
                                            <span>IN CART</span>
                                        : <span>ADD TO CART</span>}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <button>
                                        <span>ADD TO WISHLIST</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='space'>
            </div>
        </div>
        </>
    );
} 