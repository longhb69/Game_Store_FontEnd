import { useRef, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../shared';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../App';
import { useLogin } from '../LoginContext';
import GameDLC from '../components/GameDLC';

export default function GameDeatail() {
    const videoRef = useRef(null);
    const { slug } = useParams(); 
    const [game, setGame] = useState();
    const [categories, setCategories] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useLogin()

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
    function addCart(game_id) {
        const url = baseUrl + 'cart/'
        const data = {special:false,dlc:false,game_id:game_id, cart_id: 4515122064}
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
            return response.json();
        })
    }
    return (
        <>  
            { game && (
                <>
                    <div className='mx-auto w-4/6 mt-20'>
                        <div className='text-white text-5xl'>
                            {game.name}
                        </div>
                        <div className='flex mt-5 '>
                            <div className='basis-2/3'>
                                <div className=''>
                                    <video ref={videoRef} className="w-full h-full rounded" controls preload="auto" muted>
                                        <source src={game.video} type="video/mp4" />
                                        <span>Your browser does not support the video tag.</span>
                                    </video>
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