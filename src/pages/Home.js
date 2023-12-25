import axios from 'axios';
import { useEffect, useState } from 'react'; 
import Game from '../components/Game';
import { baseUrl } from '../shared';

export default function Home() {
    const [games, setGames] = useState();
    const [categories, setCategories] = useState();
    useEffect(() => {
        const url = baseUrl + 'api/game/'
        axios.get(url).then((response) => {
            setGames(response.data)
            console.log(response.data)
        });
        const url_category = baseUrl + 'api/category/'
        axios.get(url_category).then((response) => {
            setCategories(response.data)
        })

    }, [])

    return (
            <div className=''>
                <div className='m-20 flex gap-7'>
                    {games ? (
                        <>
                            {games.map((game) => {
                                return (
                                    <Game
                                        key={game.id}
                                        name={game.name}
                                        slug={game.slug}
                                        price={game.price}
                                        image={game.image}
                                        cover={game.cover}
                                    />
                                )
                            })}
                        </>
                    ) : null}
                </div>
            </div>
    )
}