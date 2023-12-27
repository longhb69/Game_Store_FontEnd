import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../shared';
import axios from 'axios';

export default function GameDeatail() {
    const videoRef = useRef(null);
    const { slug } = useParams(); 
    const [game, setGame] = useState();
    const [categories, setCategories] = useState();
    
    useEffect(() => {
        const url = baseUrl + 'api/game/' + slug
        axios.get(url).then((response) => {
            setGame(response.data)
            setCategories(response.data.category)
        });
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
          }
      }, [game]);
    return (
        <>  
            { game && (
                <>
                    <div className='mx-auto w-4/6'>
                        <div className='text-white text-5xl'>
                            {game.name}
                        </div>
                        <div>
                            <div>
                                <video ref={videoRef} className="video" controls preload="auto" muted>
                                    <source src={game.video} type="video/mp4" />
                                    <span>Your browser does not support the video tag.</span>
                                </video>
                            </div>
                            <div className='text-white'>
                                <div>
                                    <img src={game.image}/>
                                </div>
                                <div>
                                    <p className='text-white'>{game.overview_description}</p>
                                </div>
                                <div>
                                    <div>
                                        <span className='text-white'>RELEASE DATE:</span>
                                        <span className='text-white'>{game.year}</span>
                                    </div>
                                    <div>
                                        <span className='text-white'>Developer:</span>
                                        <span className='text-white'>null</span>
                                    </div>
                                    <div>
                                        <span className='text-white'>Publisher:</span>
                                        <span className='text-white'>null</span>
                                    </div>
                                </div>
                                <div>
                                    <button>
                                        <span>BUY NOW</span>
                                    </button>
                                </div>
                                <div>
                                    <button>
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
                        <div>
                            <div>
                                <div className='text-white'>
                                    <div>
                                        <span>Genres</span>
                                    </div>
                                    <div>
                                        {categories 
                                            ? categories.map((category) => {
                                                return (
                                                    <span>{category.name}</span>
                                                )
                                            })
                                        : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-white'>
                            <div>
                                <p>ABOUT THIS GAME</p>
                                <p dangerouslySetInnerHTML={{ __html: game.detail_description }}></p>
                            </div>             
                        </div>
                        <div className='text-white text-lg'>
                            <div>
                                <span>System Requirements</span>
                            </div>
                            <div className='container'>
                               <div className='MINIMUM div'>
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
                               <div className='RECOMMENDED div'>
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