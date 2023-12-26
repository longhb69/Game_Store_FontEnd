import axios from 'axios';
import { useEffect, useState } from 'react'; 
import Game from '../components/Game';
import { baseUrl } from '../shared';
import Swiper from 'swiper';
import CategorySlider from '../components/CategorySlider';
import Slider from '../components/Slider';

export default function Home() {
    const [games, setGames] = useState();
    useEffect(() => {
        const url = baseUrl + 'api/game/'
        axios.get(url).then((response) => {
            setGames(response.data)
        });
    }, [])

    return( 
            <div className=''>
                <div className='m-20 flex gap-7'>
                    {games ? (
                        <>
                            {games.map((game) => {
                                return (
                                    <div className='min-w-[180px] max-w-[180px] h-100 w-1/5'>
                                        <Game
                                            key={game.id}
                                            name={game.name}
                                            slug={game.slug}
                                            price={game.price}
                                            image={game.image}
                                            cover={game.cover}
                                        />
                                    </div>
                                )
                            })}
                        </>
                    ) : null}
                </div>
                <div className='flex  items-center justify-center'>
                    <Slider/>
                </div>
            </div>
            
    )
}