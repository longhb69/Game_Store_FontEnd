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
            }, 2000)
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
                        <div className='flex mt-5 flex-nowrap'>
                            <div className='basis-2/3'>
                                    <GameImageVideo
                                        image={game.image}
                                        video={game.video}
                                        game_image={game.game_image}/>
                            </div>
                            <div className='text-white basis-1/3 ml-7 min-w-[300px] '>
                                <div className='mb-3 '>
                                    <img src={game.image}/>
                                </div>
                                <div className='mb-3 text-nowrap'>
                                    <p className='text-white text-sm'>{game.overview_description}</p>
                                </div>
                                <div className='text-nowrap	text-sm'>
                                    <div className='flex flex-nowrap'>
                                        <span className='basis-2/5 text-white'>RELEASE DATE:</span>
                                        <span className='basis-3/5 text-white'>{game.year}</span>
                                    </div>
                                    <div className='flex flex-nowrap'>
                                        <span className='basis-2/5 text-white'>Developer:</span>
                                        <a href="#" className='basis-3/5 text-white'>null</a>
                                    </div>
                                    <div className='flex flex-nowrap'>
                                        <span className='basis-2/5 text-white'>Publisher:</span>
                                        <a href="#" className='basis-3/5 text-white'>null</a>
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
                        <div className='text-white text-lg'>
                            {game.dlc && game.dlc.length > 0 ? (
                                <>
                                    <h2 className='mb-1'>Content For This Game</h2>
                                    <div className='flex flex-col min-w-[900px] gap-4'>
                                            {game.dlc.slice(0,5).map((dlc) => {
                                                return (
                                                    <div className='flex flew-row'>
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
                                                    <div className={`${showAllDLC ? '' : 'hidden'} flex flew-row`}>
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
                                    <div className='flex flew-row min-w-[900px]'>
                                        <div className='basis-2/3'>
                                            <div className='flex justify-end'>
                                                <div className={`flex ${showAllDLC ? 'mt-2 p-1 pl-3 rounded bg-[#202020]' : 'mt-1'} bg-[#202020] rounded`}>
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
                        <div className='text-white mt-5'>
                            <div>
                                <h2 className='text-lg border-b'>ABOUT THIS GAME</h2>
                                <p className='mt-5' dangerouslySetInnerHTML={{ __html: game.detail_description }}></p>
                            </div>             
                        </div>
                        <div className='text-white text-lg'>
                            <div className='text-xl border-b pb-[1px] my-5'>
                                <span className=''>System Requirements</span>
                            </div>
                            <div className='container flex bg-[#202020] pt-3 px-10 pb-10 rounded'>
                               <div className='MINIMUM div basis-1/2'>
                                    <ul>
                                       <strong className='text-[#F5F5F5]/[.6]'>Minimum</strong>
                                       <br/>
                                       <ul>
                                            <li className='flex gap-3'>
                                                <span className='text-[#F5F5F5]/[.6]'>OS:</span>
                                                <p>{game.os_min}</p>
                                            </li>
                                            <li className='flex gap-3'>
                                                <span className='text-[#F5F5F5]/[.6]'>Processor:</span>
                                                <p>{game.processor_min}</p>
                                            </li>
                                            <li className='flex gap-3'>
                                                <span className='text-[#F5F5F5]/[.6]'>Memory:</span>
                                                <p>{game.memory_min}</p>
                                            </li>
                                            <li className='flex gap-3'>
                                                <span className='text-[#F5F5F5]/[.6]'>Graphics:</span>
                                                <p>{game.graphics_min}</p>
                                            </li>
                                            <li className='flex gap-3'>
                                                <span className='text-[#F5F5F5]/[.6]'>Storage:</span>
                                                <p>{game.storage_min}</p>
                                            </li>   
                                       </ul>
                                    </ul>
                               </div>
                               <div className='RECOMMENDED div basis-1/2'>
                                    <ul>
                                    <strong className='text-[#F5F5F5]/[.6]'>RECOMMENDED</strong>
                                    <br/>
                                    <ul>
                                            <li className='flex gap-3'>
                                                <span className='text-[#F5F5F5]/[.6]'>OS:</span>
                                                <p>{game.os_rec}</p>
                                            </li>
                                            <li className='flex gap-3'>
                                                <span className='text-[#F5F5F5]/[.6]'>Processor:</span>
                                                <p>{game.processor_rec}</p>
                                            </li>
                                            <li className='flex gap-3'>
                                                <span className='text-[#F5F5F5]/[.6]'>Memory:</span>
                                                <p>{game.memory_rec}</p>
                                            </li>
                                            <li className='flex gap-3'>
                                                <span className='text-[#F5F5F5]/[.6]'>Graphics:</span>
                                                <p>{game.graphics_rec}</p>
                                            </li>
                                            <li className='flex gap-3'>
                                                <span className='text-[#F5F5F5]/[.6]'>Storage:</span>
                                                <p>{game.storage_rec}</p>
                                            </li>   
                                    </ul>
                                    </ul>
                               </div>
                            </div>
                        </div>
                    </div>
                </>
            )};
        </>
    )
}