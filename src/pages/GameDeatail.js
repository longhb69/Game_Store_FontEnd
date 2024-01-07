import { useRef, useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../shared';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart, useLogin } from '../LoginContext';
import GameDLC from '../components/GameDLC';
import GameImageVideo from '../components/GameImageVideo';


export default function GameDeatail() {
    const { slug } = useParams(); 
    const [game, setGame] = useState();
    const [categories, setCategories] = useState();
    const [totalDlcPrice, setTotalDlcPrice] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn, cartQuantity, setCartQuantity, getCartQuantity] = useLogin()
    const [itemsInCart, setItemsInCart,getItemInCart] = useCart()
    const url = baseUrl + 'cart/'

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
            getCartQuantity();
            getItemInCart();
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
                    <div className='mx-auto w-4/6 mt-20 text-nowrap'>
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
                                <div className='text-nowrap	'>
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
                                <div className=''>
                                    <div>
                                        <p>{game.price}<span className="underline">đ</span></p>
                                    </div>
                                    <div>
                                        <button>
                                            <span>BUY NOW</span>
                                        </button>
                                    </div>
                                    <div>   
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                addCart(game.id)
                                            }}
                                        >
                                            {itemsInCart && itemsInCart.items_name.includes(game.slug) ? 
                                                    <span>IN CART</span>
                                                : <span>ADD TO CART</span>}
                                        </button>
                                    </div>
                                    <div>
                                        <button>
                                            <span>ADD TO WISHLIST</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row mb-10 mt-10'>
                            <div className='flex flex-col px-5 border-r border-l'>
                                <div className='text-white'>
                                    <div>
                                        <span>Genres</span>
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
                                    <h2 className='mb-5'>Content For This Game</h2>
                                    <div className='flex flex-col min-w-[900px]'>
                                            {game.dlc.map((dlc) => {
                                                return (
                                                    <GameDLC
                                                        key={dlc.id}
                                                        id={dlc.id}
                                                        name={dlc.name}
                                                        slug={dlc.slug}
                                                        price={dlc.price}
                                                        cover={dlc.cover}
                                                        image={dlc.image}/>
                                                )
                                            })}
                                    </div>
                                    <div className='flex flew-row min-w-[900px]'>
                                        <div className='basis-2/3'>
                                            <div className='flex justify-end'>
                                                <div className='flex p-1 pl-3 rounded bg-[#202020]'>
                                                    <div className='flex items-center'>{totalDlcPrice}<span className='underline'>đ</span></div>
                                                    <div className='ml-2 hover:hover:brightness-110 text-[#d2efa9] hover:text-white'>
                                                        <button className='bg-gradient-to-r from-[#75b022] to-[#588a1b] py-1 px-3 rounded'
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    addAllDlcToCart(game.id)
                                                                }}>
                                                            <span className=''>Add all DLC to Cart</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                  
                                        <div className='space'></div> 
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <div className='text-white'>
                            <div>
                                <h2 className='text-lg border-b'>ABOUT THIS GAME</h2>
                                <p className='mt-5' dangerouslySetInnerHTML={{ __html: game.detail_description }}></p>
                            </div>             
                        </div>
                        <div className='text-white text-lg'>
                            <div className='text-xl border-b py-2'>
                                <span className=''>System Requirements</span>
                            </div>
                            <div className='container flex'>
                               <div className='MINIMUM div basis-1/2'>
                                    <ul>
                                       <strong>Minimum</strong>
                                       <br/>
                                       <ul>
                                            <li>
                                                <span>OS:</span>
                                                <p>{game.os_min}</p>
                                            </li>
                                            <li>
                                                <span>Processor:</span>
                                                <p>{game.processor_min}</p>
                                            </li>
                                            <li>
                                                <span>Memory:</span>
                                                <p>{game.memory_min}</p>
                                            </li>
                                            <li>
                                                <span>Graphics:</span>
                                                <p>{game.graphics_min}</p>
                                            </li>
                                            <li>
                                                <span>Storage:</span>
                                                <p>{game.storage_min}</p>
                                            </li>   
                                       </ul>
                                    </ul>
                               </div>
                               <div className='RECOMMENDED div basis-1/2'>
                                    <ul>
                                    <strong>RECOMMENDED</strong>
                                    <br/>
                                    <ul>
                                            <li>
                                                <span>OS:</span>
                                                <p>{game.os_rec}</p>
                                            </li>
                                            <li>
                                                <span>Processor:</span>
                                                <p>{game.processor_rec}</p>
                                            </li>
                                            <li>
                                                <span>Memory:</span>
                                                <p>{game.memory_rec}</p>
                                            </li>
                                            <li>
                                                <span>Graphics:</span>
                                                <p>{game.graphics_rec}</p>
                                            </li>
                                            <li>
                                                <span>Storage:</span>
                                                <p>{game.storage_rec}</p>
                                            </li>   
                                    </ul>
                                    </ul>
                               </div>
                            </div>
                        </div>
                        <p>{game.price}</p>
                    </div>
                </>
            )};
        </>
    )
}