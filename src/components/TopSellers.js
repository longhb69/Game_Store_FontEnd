import axios from 'axios';
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";
import Game from '../components/Game';
import { Link } from 'react-router-dom';

export default function TopSellers() {
    const [games, setGames] = useState();
    useEffect(() => {
        const url = baseUrl + 'api/topsellers'
        axios.get(url).then((response) => {
            setGames(response.data.results)
        })
    }, [])
    return(
        <>
            <div className='flex justify-between items-center mb-[15px]'>
                <h2 className='text-lg'>Top Sellers</h2>
                <Link to={'/fillter/topsellers'} className='text-center items-center text-sm inline-flex font-base rounded border leading-normal  border-[#fff]/[.6] px-5'>VIEW MORE</Link>
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