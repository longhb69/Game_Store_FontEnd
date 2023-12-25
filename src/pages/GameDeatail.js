import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../shared';
import axios from 'axios';

export default function GameDeatail() {
    const videoRef = useRef(null);
    const { slug } = useParams(); 
    const [game, setGame] = useState();

    useEffect(() => {
        const url = baseUrl + 'api/game/' + slug
        axios.get(url).then((response) => {
            setGame(response.data)
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
                    <img src={game.image}/>
                    <img src={game.cover}/>
                    <video ref={videoRef} className="video" controls preload="auto" muted>
                        <source src={game.video} type="video/mp4" />
                        <span>Your browser does not support the video tag.</span>
                    </video>
                    <p>{game.name}</p>
                    <p>{game.price}</p>
                </>
            )};
        </>
    )
}