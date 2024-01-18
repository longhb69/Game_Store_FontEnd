import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Autoplay,Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../shared';
import Game from '../components/Game';
import axios from 'axios';


export default function MostPopular() {
    const [games, setGames] = useState();
    const swiperRef = useRef(null);
    const [endSlide, setEndSlide] = useState(false);
    const [beginSlide, setBeginSlide] = useState(true);
    useEffect(() => {
        const url = baseUrl + 'api/mostpopular'
        axios.get(url).then((response) => {
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
                        <Link to={`fillter/mostpopular`}>Most Popular</Link>
                        <div>
                            <button className={` ${beginSlide ? 'bg-[#e12] cursor-auto' : ''}`}
                                    onClick={() => prev()}
                            >Prev</button>
                            <button className={` ${endSlide ? 'bg-[#e12] cursor-auto' : ''} `}
                                onClick={() => next()}
                            >Next</button>
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
                                                <div className='w-full h-[280px]'>
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