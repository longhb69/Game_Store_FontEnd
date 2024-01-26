import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function NewRelease(props) {
    const [games, setGames] = useState();
    const [activeIndex, setActivteIndex] = useState()
    const activeIndexRef = useRef();
    
    useEffect(() => {
        axios.get(props.url).then((response) => {
            setGames(response.data)
        })
    }, [])
    const handleMouseOver = (index) => {
        setActivteIndex(index)
    };
    useEffect(() => {
        const images = document.querySelectorAll(".game-grid");
        activeIndexRef.current = activeIndex;
        images.forEach((img, i) => {
            if (i !== activeIndex) 
                img.classList.add('not_hover');
            else {
                img.classList.remove('not_hover')
            }
        });
    }, [activeIndex])

    const handleMouseLeave = (index) => {
        activeIndexRef.current = index;
        const images = document.querySelectorAll(".game-grid");
        setTimeout(() => {
            if(index === activeIndexRef.current) {
                images.forEach((img, i) => {
                    img.classList.remove('not_hover')
                });
            }
        }, 150)
        
    }
    return (
        <section className="w-full relative inline-block z-1 bg-[#121314] pb-5">
            <div>
                <div className="mb-14 gdk">
                    <header className="text-center flex justify-between items-end ml-[230px]">
                        <div className="text-center">
                            <h2 className="text-3xl mb-3">Great games out now or comming soon</h2>
                        </div>
                    </header>
                    <div className="relative z-[50]">
                        <div className='mx-[80px]'>
                            <div className="w-full mx-5">
                            </div>
                            <div className="mt-10">
                                <div className="slideInLeft--fast">
                                    <div className="relative w-auto">
                                        <div className="relative mx-[80px]">
                                            <div className="flex justify-center flex-wrap max-w-none w-auto overflow-hidden py-3 carousel-grid">
                                                {games && games.length > 1 ? 
                                                    <>
                                                    {games.map((game,index) => {
                                                        return (
                                                            <a href={`/app/${game.slug}`} className={`game-grid max-w-[100%] ml-4 inline-flex flex-col shrink-0 w-[16%]`}
                                                                onMouseOver={() => handleMouseOver(index)}
                                                                onMouseLeave={() => handleMouseLeave(index)}
                                                                >
                                                                <div className='game-grid-v2'>
                                                                    <div className='absolute z-[-1] inset-0 media-block'>
                                                                        <div className='h-full relative'>
                                                                            <figure className='relative h-full w-full overflow-hidden flex'>
                                                                                <img className='top-0 left-0 absolute w-full h-full media-image object-cover block' 
                                                                                    src={game.cover}
                                                                                    />
                                                                            </figure>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='pt-2'>
                                                                    <div className='text-sm font-normal	'>
                                                                        <p className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>{game.name}</p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        );
                                                    })}
                                                    </>
                                                : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}