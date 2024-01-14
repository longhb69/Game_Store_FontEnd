import { useRef, useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../shared';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart, useLogin } from '../LoginContext';
import GameDLC from '../components/GameDLC';
import GameImageVideo from '../components/GameImageVideo';
import Lottie from "lottie-react";
import * as animationData from "../loading.json";
import SystemRequirements from '../components/SystemRequirements';


export default function GameDeatail() {
    const { slug } = useParams(); 
    const [game, setGame] = useState();
    const [categories, setCategories] = useState();
    const [totalDlcPrice, setTotalDlcPrice] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const [showAllDLC, setShowAllDLC] = useState(false); 
    const [loggedIn, setLoggedIn, cartQuantity, setCartQuantity, getCartQuantity] = useLogin()
    const [itemsInCart, setItemsInCart,getItemInCart] = useCart()
    const url = baseUrl + 'cart/'
    const addCartRef = useRef()
    const lottieRef = useRef();

    useEffect(() => {
        const url = baseUrl + 'api/game/' + slug
        axios.get(url).then((response) => {
            setGame(response.data)
            setCategories(response.data.category)
            var toalDLCPrice = 0
            response.data.dlc.forEach(dlc => {
                toalDLCPrice += parseFloat(dlc.price)
            });
            setTotalDlcPrice(toalDLCPrice.toFixed(3))
        }).catch((e) => {
            console.log(e)
        });
        getItemInCart()
    }, []);

    function addCart(game_id) {
        const data = {type:'game', base_game_id: game_id}
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
                getCartQuantity();
                getItemInCart();
            }, 100)
            return response.json();
        })
    }
    function addAllDlcToCart(game_id) {
        const add_on = game.dlc.map(dlc => ({
            game_id: dlc.id
        }))
        const data = {type:'game', base_game_id:game_id, add_on:add_on}
        console.log(data)
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'), 
            },
            body: JSON.stringify(data),
        }).then((response) => {
            console.log(localStorage.getItem('access'))
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
            navigate('/cart');
            return response.json();
        })
    }
    return (
        <>  
            { game && (
                <>
                    <div className='mx-auto w-[70%] mt-2 text-nowrap'>
                        <div className='text-white text-6xl'>
                            {game.name}
                        </div>
                        <div className='flex'>
                            <div className='w-[75%] mt-5'>
                                <div className='w-[calc(100%)] '>
                                    <GameImageVideo
                                        image={game.image}
                                        video={game.video}
                                        game_image={game.game_image}
                                        />
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <div className='flex flex-row mb-10 mt-10'>
                                        <div className='flex flex-col px-5 border-r border-l border-[#F5F5F5]/[.6]'>
                                            <div className='text-white'>
                                                <div>
                                                    <span className='text-[#F5F5F5]/[.6]'>Genres</span>
                                                </div>
                                                <div>
                                                    {categories 
                                                        ? categories.map((category) => {
                                                            return (
                                                                <Link to={`/category/${category.slug}`} key={category.id}>
                                                                    <span className='mr-2 underline hover:no-underline'>{category.name},</span>
                                                                </Link>
                                                            )
                                                        })
                                                    : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-white text-lg'>
                                    {game.dlc && game.dlc.length > 0 ? (
                                        <>
                                            <h2 className='mb-1'>Content For This Game</h2>
                                            <div className='flex flex-wrap flex-col gap-4'>
                                                    {game.dlc.slice(0,5).map((dlc) => {
                                                        return (
                                                            <div className='flex flew-row w-ful'>
                                                                <GameDLC
                                                                    key={dlc.id}
                                                                    id={dlc.id}
                                                                    name={dlc.name}
                                                                    slug={dlc.slug}
                                                                    price={dlc.price}
                                                                    cover={dlc.cover}
                                                                    image={dlc.image}/>
                                                            </div>
                                                        )
                                                    })}
                                                    {game.dlc.slice(5).map((dlc) => {
                                                        return (
                                                            <div className={`${showAllDLC ? '' : 'hidden'} flex flew-row w-full`}>
                                                                <GameDLC
                                                                    key={dlc.id}
                                                                    id={dlc.id}
                                                                    name={dlc.name}
                                                                    slug={dlc.slug}
                                                                    price={dlc.price}
                                                                    cover={dlc.cover}
                                                                    image={dlc.image}
                                                                    />
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                            <div className='flex flew-row min-w-[880px]'>
                                                <div className='ml-auto'>
                                                    <div className='flex justify-end'>
                                                        <div className={`flex ${showAllDLC ? 'mt-2 p-1 pl-3 rounded bg-[#202020]' : 'mt-2'} bg-[#202020] rounded`}>
                                                                {game.dlc.length < 5 || showAllDLC? 
                                                                    <>
                                                                        <div className='flex items-center pl-3'>{totalDlcPrice}<span className='underline'>đ</span></div>
                                                                        <div className='ml-2 hover:brightness-110 text-[#d2efa9] hover:text-white'>
                                                                            <button className='bg-gradient-to-r from-[#75b022] to-[#588a1b] py-1 px-3 rounded'
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault()
                                                                                        addAllDlcToCart(game.id)
                                                                                    }}>
                                                                                <span className=''>Add all DLC to Cart</span>
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                :
                                                                <>
                                                                    <div className='flex mr-3 items-center text-base text-cyan-500'>SHOWING 1-5 OF {game.dlc.length}</div>
                                                                    <div className='bg-[#202020] py-0.5 pl-6 pr-3 rounded-sm hover:brightness-110 cursor-pointer hover:bg-gradient-to-r from-[#06BFFF] to-[#2D73FF]'>
                                                                        <div className='pr-5 bg-[length:22px_22px] bg-[url(https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png)] bg-no-repeat bg-right'
                                                                                onClick={(e) => {
                                                                                    e.preventDefault()
                                                                                    setShowAllDLC(true)
                                                                                }}>
                                                                            <span className='text-base'>SEE ALL</span>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                }
                                                        </div>
                                                    </div>
                                                </div>                  
                                                <div className='space'></div> 
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                                <div className='flex mt-5 w-full'>
                                    <div className='w-full'>
                                        <h2 className='text-lg border-b'>ABOUT THIS GAME</h2>
                                        <p className='mt-5' dangerouslySetInnerHTML={{ __html: game.detail_description }}></p>
                                    </div>             
                                </div>
                            </div>
                            <aside className='max-w-[350px]'>
                                <div className='flex sticky top-[100px] mt-5 flex-nowrap w-full'>
                                    <div className=' text-white ml-7 w-[100%]'>
                                        <div className='mb-3 '>
                                            <img src={game.image}/>
                                        </div>
                                        <div className='mb-3 text-nowrap'>
                                            <p className='text-white text-base'>{game.overview_description}</p>
                                        </div>
                                        <div className='text-nowrap	text-base'>
                                            <div className='flex flex-nowrap pb-2 border-b border-[#fff]/[.1]'>
                                                <span className='basis-2/5 text-[#aaae]'>RELEASE DATE</span>
                                                <span className='basis-3/5 text-end'>{game.year}</span>
                                            </div>
                                            <div className='flex flex-nowrap pb-2 border-b border-[#fff]/[.1]'>
                                                <span className='basis-2/5 text-[#aaae]'>Developer</span>
                                                <a href="#" className='basis-3/5 text-end'>null</a>
                                            </div>
                                            <div className='flex flex-nowrap pb-2 border-b border-[#fff]/[.1]'>
                                                <span className='basis-2/5 text-[#aaae]'>Publisher</span>
                                                <a href="#" className='basis-3/5 text-end'>null</a>
                                            </div>
                                        </div>
                                        <div className='text-base flex flex-col'>
                                            <div className='mt-1 text-lg'>
                                                <p>{game.price}<span className="underline">đ</span></p>
                                            </div>
                                            <div className='text-center rounded transition ease-in bg-[#5532db] mt-3 hover:bg-[#db55db] duration-[300ms] hover:font-semibold'>
                                                <button className='p-3 w-full'>
                                                    <span className=''>BUY NOW</span>
                                                </button>
                                            </div>
                                            <div ref={addCartRef} className='flex flex-col justify-items-center rounded border border-[245_245_245_0.6] mt-3 hover:bg-white/[.07] transition ease-out duration-[200ms] w-full max-h-[50px]'>   
                                                <Lottie className='lottie' lottieRef={lottieRef} animationData={animationData} loop={true}/>
                                                <button
                                                    className='p-3 w-full'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        addCart(game.id)
                                                    }}
                                                >
                                                    {itemsInCart && itemsInCart.items_name.includes(game.slug) ? 
                                                        <span className='cart-text'>IN CART</span>
                                                    : <span className='cart-text'>ADD TO CART</span>}
                                                </button>
                                            </div>
                                            <div className='rounded border border-[245_245_245_0.6] mt-3 hover:bg-white/[.07] transition ease-out duration-[200ms]'>
                                                <button className='p-3 w-full'>
                                                    <span>ADD TO WISHLIST</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        
                        <div className='text-white text-lg w-[75%]'>
                            <SystemRequirements
                                os_min={game.os_min}
                                processor_min={game.processor_min}
                                memory_min={game.memory_min}
                                graphics_min={game.graphics_min}
                                storage_min={game.storage_min}
                                os_rec={game.os_rec}
                                processor_rec={game.processor_rec}
                                memory_rec={game.memory_rec}
                                graphics_rec={game.graphics_rec}
                                storage_rec={game.storage_rec}
                            />
                        </div>
                    </div>
                </>
            )};
        </>
    )
}