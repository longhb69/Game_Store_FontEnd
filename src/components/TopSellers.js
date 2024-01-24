import axios from 'axios';
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";
import Game from '../components/Game';
import { Link } from 'react-router-dom';

export default function TopSellers() {
    const [games, setGames] = useState();
    useEffect(() => {
        const url = baseUrl + 'api/top-sellers'
        axios.get(url).then((response) => {
            setGames(response.data)
        })
    }, [])
    return(
        <>
            <div className='flex justify-between items-center mb-[15px]'>
                <h2 className='text-lg'>Top Sellers</h2>
                <Link to={'/fillter/top-sellers'} className='text-center text-[11px] items-center justify-center font-base text-sm inline-flex rounded border leading-normal  border-[#fff]/[.6] px-3 py-1 transition ease-in-out hover:border-[#fff]/[.3]'>VIEW MORE</Link>
            </div>
            <div className='flex items-stretch w-full top-sellers-container h-full'>
                {games ? (
                    <>
                        {games.map((game, index) => {
                            return (
                                <>
                                    <div className={`css-5a ${index===0 ? 'ml-0' : 'ml-4'}` }>
                                        <Game 
                                            key={game.id}
                                            name={game.name}
                                            slug={game.slug}
                                            price={game.price}
                                            image={game.image}
                                            cover={game.cover}
                                        />
                                    </div>
                                </>
                            );
                        })}
                    </>
                )
                : null }
            </div>
        </>
    );
}