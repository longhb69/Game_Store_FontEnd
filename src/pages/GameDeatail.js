import { useRef, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../shared';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../App';
import { useLogin } from '../LoginContext';
import GameDLC from '../components/GameDLC';
import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';




export default function GameDeatail() {
    const videoRef = useRef(null);
    const { slug } = useParams(); 
    const [game, setGame] = useState();
    const [categories, setCategories] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn, cartQuantity, setCartQuantity, getCartQuantity] = useLogin()
    const url = baseUrl + 'cart/'

    const swiper = useSwiper();

    useEffect(() => {
        const url = baseUrl + 'api/game/' + slug
        axios.get(url).then((response) => {
            setGame(response.data)
            setCategories(response.data.category)
        });
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            try {
                videoRef.current.play();
            }
            catch(e) {
                console.log(e)
            }
          }
      }, [game]);

    useEffect(() => {
        console.log("Change")
    }, [cartQuantity])

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
            return response.json();
        })
    }
    const swiperContainerRef = useRef()
    function prev() {
        swiperContainerRef.current.swiper.slidePrev()
    }
    function next() {
        swiperContainerRef.current.swiper.slideNext()
    }
    function test() {
        const swiper = swiperContainerRef.current.swiper

    }
      
    //   <div className=''>
    //     <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
    //         <SwiperSlide>
    //             <video ref={videoRef} className="" controls preload="auto" muted>
    //                 <source src={game.video} type="video/mp4" />
    //                 <span>Your browser does not support the video tag.</span>
    //             </video>
    //         </SwiperSlide>
    //     </Swiper>
    //     </div>
      
    return (
        <>  
            { game && (
                <>
                    <div className='mx-auto w-4/6 mt-20'>
                        <div className='text-white text-6xl'>
                            {game.name}
                        </div>
                        <div className='flex mt-5 '>
                            <div className='basis-2/3'>
                                    <div className='flex .main-container'>
                                        <div className='absolute next-btn'>
                                            next
                                        </div>
                                        <Swiper
                                            ref={swiperContainerRef}
                                            modules={[Navigation, A11y]}
                                            navigation
                                            className='swiper_slide'>
                                            <SwiperSlide>
                                                <video ref={videoRef} className="h-full" controls preload="auto" muted>
                                                            <source src={game.video} type="video/mp4" />
                                                            <span>Your browser does not support the video tag.</span>
                                                </video>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src={game.image}>
                                                </img>
                                            </SwiperSlide>
                                        </Swiper>
                                        <div>
                                            pre
                                        </div>
                                    </div>
                                    <div className='button'>
                                                <button onClick={() => prev()}>Prev</button>
                                                <button onClick={() => next()}>Next</button>
                                                <button onClick={() => test()}>Next</button>
                                    </div>
                            </div>
                            <div className='text-white basis-1/3 ml-7'>
                                <div className='mb-3'>
                                    <img src={game.image}/>
                                </div>
                                <div className='mb-3'>
                                    <p className='text-white text-sm'>{game.overview_description}</p>
                                </div>
                                <div>
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
                                            <span>ADD TO CART</span>
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
                                    <div className='flex flex-col mb-5'>
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
                                    <div className='flex flew-row'>
                                        <div className='basis-3/4'>
                                            <div className='flex justify-end'>
                                                <div>330</div>
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