import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Autoplay,Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../shared';
import Game from './Game';
import axios from 'axios';


export default function MostPopular(props) {
    const [games, setGames] = useState();
    const swiperRef = useRef(null);
    const [endSlide, setEndSlide] = useState(false);
    const [beginSlide, setBeginSlide] = useState(true);
    useEffect(() => {
        axios.get(props.url).then((response) => {
            setGames(response.data.results)
        })
    }, [])
    function next() {
        swiperRef.current.swiper.slideNext();
        if(swiperRef.current.swiper.isEnd) {
            console.log('end')
        }
    }
    function prev() {
        swiperRef.current.swiper.slidePrev();
    }
    function handlePosition() {
        if(swiperRef.current.swiper.isEnd) {
            setEndSlide(true);
            setBeginSlide(false);
        }
        else if(swiperRef.current.swiper.isBeginning) {
            setEndSlide(false);
            setBeginSlide(true);
        }
    }
    return (
        <>
            {games ? (
                <>
                    <div className='flex justify-between items-center mb-5 text-lg'>
                        {props.linkable ? (
                            <>
                                <Link to={`fillter/${props.slug}`}>
                                    <h2 className='flex items-center link-title'>
                                        {props.title}
                                        <span className='ml-1.5 w-2.5 h-2.5 flex link-arrow'>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 5 9"><path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fill-rule="evenodd"></path></svg>     
                                        </span>
                                    </h2>
                                </Link>
                            </>
                        )
                        : <>
                            <h2 className='text-lg'>{props.title}</h2>
                        </>
                        }
                        <div className='flex'>
                            <div className={`ml-[10px] ${beginSlide ? 'pointer-events-none cursor-default' : ' '}`}>
                                <button className={`css-17 relative w-[30px] h-[30px] flex items-center justify-center `}
                                    onClick={() => prev()}>
                                    <span className={`lock w-[12px] h-[12px] scale-x-[-1] ${beginSlide ? 'opacity-[0.5] select-none' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class={`w-full h-full ${beginSlide ? 'pointer-events-none select-none' : ' '}`} viewBox="0 0 5 9"><path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fill-rule="evenodd"></path></svg>
                                    </span>
                                </button>
                            </div>
                            <div className={`ml-[10px] ${endSlide ? 'pointer-events-none cursor-default' : ' '}`}>
                                <button className='css-17 relative w-[30px] h-[30px] flex items-center justify-center'
                                    onClick={() => next()}>
                                    <span className={`block w-[12px] h-[12px] z-[1] ${endSlide ? 'opacity-[0.5]' : ' '}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class={`w-full h-full ${beginSlide ? 'pointer-events-none select-none' : ' '}`} viewBox="0 0 5 9"><path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fill-rule="evenodd"></path></svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Swiper
                        ref={swiperRef}
                        modules={[]}
                        spaceBetween={20}
                        speed={200}
                        allowTouchMove={false}
                        slidesPerView={6}
                        slidesPerGroup={6}
                        noSwiping={true}
                        className='most-popular-swiper'
                        onSlideChange={() => {
                            handlePosition();
                        }}
                    >
                        {games.map((game) => {
                            return (
                                <div>
                                    <SwiperSlide>
                                        <div className="h-full w-full font-normal font-inter">
                                            <Link className='flex flex-col w-full' to={'/app/' + game.slug}>
                                                <div className='w-full h-[280px] rounded hover-affect relative'>
                                                    <img className='w-full h-full rounded' src={game.cover} loading='lazy'/> 
                                                </div>
                                                <div className='text-base flex flex-col font-normal'>
                                                    <div className='overflow-hidden mt-2'>{game.name}</div>
                                                    <div className='flex items-center mt-1'>
                                                        <div>{game.price}<span className="underline">đ</span></div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </SwiperSlide> 
                                </div>
                            );
                        })}
                    </Swiper>
                </>
            )
            : null}
        </>
    );
}