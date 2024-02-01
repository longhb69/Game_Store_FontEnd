import { Swiper, SwiperSlide} from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useFetchData from '../useFetchData';

export default function DeveloperSlider(props) {
    //const [games, setGames] = useState();
    //const [publisher, setPublisher] = useState();
    const swiperRef = useRef(null);
    const [endSlide, setEndSlide] = useState(false);
    const [beginSlide, setBeginSlide] = useState(true);
    // useEffect(() => {
    //     axios.get(props.url).then((response) => {
    //         setGames(response.data.games)
    //         setPublisher(response.data.publisher.name)
    //         init();
    //     })
    // }, [])
    const {data:games, loading, error, publisher} = useFetchData(props.url)
    init()
    function init() {
        if(swiperRef.current?.swiper.slides.length === 7) {
            setBeginSlide(true);
            setEndSlide(true);
        }
    }
    function next() {
        swiperRef.current.swiper.slideNext();
    }
    function prev() {
        swiperRef.current.swiper.slidePrev();
    }
    function handlePosition() {
        if(!swiperRef.current.swiper.isEnd && !swiperRef.current.swiper.isBeginning) {
            setEndSlide(false);
            setBeginSlide(false);
        }
        else if(swiperRef.current.swiper.isEnd) {
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
            <div className='flex'>
                <div className='w-[20%] flex flex-col'>
                    {props.logo ? 
                        <div className='flex justify-center my-auto select-none'>
                            <div className='h-[60%] w-[60%]'>
                                <img src={props.logo}/>
                            </div>
                        </div>
                    : null}
                        <div className='flex justify-center mb-2 w-full font-semibold'>
                            <div>{publisher}</div>
                        </div>
                </div>
                <div className='w-[80%] pr-6'>
                    <div className='flex pt-2 justify-end'>
                        <div className={`ml-[10px] ${beginSlide ? 'pointer-events-none select-none cursor-default' : ''}`}>
                            <button className={` ${beginSlide ? 'css-172': 'css-17'} relative w-[31px] h-[31px] flex items-center justify-center`}
                                onClick={() => prev()}>
                                <span className={`lock w-[13px] h-[13px] scale-x-[-1] ${beginSlide ? 'opacity-[0.5] select-none' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class={`w-full h-full ${beginSlide ? 'pointer-events-none select-none' : ' '}`} viewBox="0 0 5 9"><path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fill-rule="evenodd"></path></svg>
                                </span>
                            </button>
                        </div>
                        <div className={`ml-[10px] ${endSlide ? 'select-none pointer-events-none cursor-default' : ' '}`}>
                            <button className={`${endSlide ? 'css-172': 'css-17'} relative w-[31px] h-[31px] flex items-center justify-center`}
                                onClick={() => next()}>
                                <span className={`block w-[13px] h-[13px] z-[1] ${endSlide ? 'opacity-[0.5]' : ' '}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class={`w-full h-full ${endSlide ? 'pointer-events-none select-none' : ' '}`} viewBox="0 0 5 9"><path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fill-rule="evenodd"></path></svg>
                                </span>
                            </button>
                        </div>
                    </div>
                    <Swiper
                        ref={swiperRef}
                        modules={[]}
                        spaceBetween={25}
                        speed={320}
                        allowTouchMove={false}
                        slidesPerView={7}
                        slidesPerGroup={7}
                        noSwiping={true}
                        className='developer-swiper'
                        onSlideChange={() => {
                            handlePosition();
                        }}
                        {...{
                            lazy: {
                            loadPrevNext: false,
                            loadPrevNextAmount: 0, 
                            loadOnTransitionStart: true,
                            }
                        }}
                    >
                        {games && games.length > 1 ?
                            games.map((game) => {
                                return (
                                    <SwiperSlide className='bg-[#25282c] rounded mt-2 developer-slide' style={{ width: '230px' }}>
                                        <a href={`/app/${game.slug}`} className='select-none h-full w-full rounded'>
                                            <div className='h-full w-full rounded-tr rounded-tl'>
                                                <div className='game-grid-v3 h-full h-full'>
                                                    <div className='absolute z-[-1] inset-0 media-block'>
                                                        <div className='h-full relative'>
                                                            <figure className='relative h-full w-full overflow-y-hidden flex'>
                                                                <img className='z-[10] top-0 left-0 absolute rounded-tr rounded-tl w-full h-full media-image block' src={game.cover12x12}/>
                                                            </figure>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='relative pt-1.5 pb-6 '>
                                                <div className='hover-affect pl-2 text-lg'>
                                                    <div className='font-semibold overflow-hidden whitespace-nowrap text-overflow-ellipsis'>{game.name}</div>
                                                    <div>{game.price}<span className='underline'>đ</span></div>
                                                    <div className='text-base text-[#838587]'>{publisher}</div>
                                                </div>
                                            </div>
                                        </a>
                                    </SwiperSlide>
                                );
                                })
                        : null}
                    </Swiper>
                </div>
            </div>
        </>
    );
}