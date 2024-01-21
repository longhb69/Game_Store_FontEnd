import { Link, useParams } from "react-router-dom"
import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useEffect, useRef, useState } from "react";


export default function CategoryPageSlider(props) {
    const swiperContainerRef = useRef();
    const backgroundRef = useRef();
   
    useEffect(() => {
        handleBackgroundChange();
    }, [])

    function prev() {
        swiperContainerRef.current.swiper.slidePrev()
    }
    function next() {
        swiperContainerRef.current.swiper.slideNext()
    }
    function handleBackgroundChange() {
        let currentIndex = swiperContainerRef.current.swiper.activeIndex
        if(props.games) {
            backgroundRef.current.style.backgroundImage = `url(${props.games[currentIndex].hero})`;
        }        
    }
    return (
        <>
        <div ref={backgroundRef} className={`backgroundoverlay`}></div>
        <div className="z-[1]">
            <div className="text-5xl font-bold mx-auto max-w-[1050px] mt-[4rem] uppercase">
                {props.name}
            </div> 
            <div className="relative h-[360px] mt-7">
                <button className="flex items-center bg-[#00000000]/[.3] rounded absolute top-0 bottom-0 w-[60px] h-[200px] pl-[7px] my-auto left-[calc(50%-620px)] hover:bg-[#5532db] transition ease-out duration-[150ms]"
                        onClick={() => prev()}>
                    <svg
                        className="w-[50px] h-[50px] rotate-180" 
                        version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="100px" viewBox="0 0 50 100">
                            <polygon fill="#ffffff" points="0,0.093 0,25.702 24.323,50.026 0,74.349 0,99.955 49.929,50.026 "></polygon>
                    </svg>
                </button>
                <Swiper
                    ref={swiperContainerRef}
                    modules={[Navigation,Pagination, A11y]}
                    rewind
                    className='swiper_slide_category'
                    style={{
                        '--swiper-theme-color': '#fff',
                        '--swiper-navigation-size': '30px',
                    }}
                    onSlideChange={() => {
                        handleBackgroundChange();
                    }}
                >
                    {props.games ? 
                        <>
                            {props.games.map((game) => {
                                return (
                                    <SwiperSlide>
                                        <div className="w-full max-w-[1100px] h-[400px] flex bg-[#0000004f] info-container">
                                            <Link to={`/app/${game.slug}`} className="h-[350px] w-[360px]">
                                                <div className="h-[92%] w-full">
                                                    <img className="h-full w-full" src={game.cover} loading="lazy"/>
                                                </div>
                                                <div className="bg-[#000] flex items-center">
                                                    <span className="ml-auto flex">
                                                        <div className="flex mt-1 h-[38px] whitespace-nowrap">
                                                            <div className="text-lg px-2 py-0.5 text-[#32db55]">
                                                                {game.price}<span className='underline'>đ</span>
                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </Link>
                                            <div className="flex flex-col w-full h-[300px] p-4">
                                                <div className="flex flex-row mb-2">
                                                    <div>
                                                        <Link to={`/app/${game.slug}`} className="ledding-[34px] font-semibold text-2xl mb-1">
                                                            {game.name}
                                                        </Link>
                                                        <div className="text-lg text-[#c6d4df]">
                                                            Release date: <span>{game.year}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-start">
                                                    <div className="flex flex-wrap text-sm gap-[1px]">
                                                        {game.category.map((category) => {
                                                            return (
                                                                <a href={`/category/${category.slug}`} className="bg-[#c6d4df26] py-[2px] px-[10px] rounded-sm hover:bg-white/[.3] mr-[2px] mb-[2px]">{category.name}</a>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </>
                    : null}
                </Swiper>
                <button className="flex items-center bg-[#00000000]/[.3] rounded absolute top-0 bottom-0 w-[60px] h-[200px] pl-[7px] my-auto left-[calc(50%+560px)] hover:bg-[#5532db] transition ease-out duration-[150ms]"
                        onClick={() => next()}>
                    <svg
                        className="w-[50px] h-[50px]" 
                        version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="100px" viewBox="0 0 50 100">
                            <polygon fill="#ffffff" points="0,0.093 0,25.702 24.323,50.026 0,74.349 0,99.955 49.929,50.026 "></polygon>
                    </svg>
                </button>
            </div>
        </div>
        </>
    );
}