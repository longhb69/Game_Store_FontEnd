import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../shared';

export default function Search() {
    const params = useParams();
    const [games, setGames] = useState();
    let getData = (query='') => {
        axios.get(`${baseUrl}search?q=${query}&tag=Action`).then((response) => {
            setGames(response.data)
        })
    }
    let searchData = () => {
        getData(params.q)
    }
    useEffect(() => {
        console.log("Use effect")
        searchData();
    }, [params])
    return (
        <>
            {games ? <>
                {games.map((game) => {
                    return (
                        <>
                            <div className='h-[200px] w-[150px]'>
                                <img src={game.cover}/>
                            </div>
                        </>
                    );
                })}
            </>
            : null}
        </>
    );
}