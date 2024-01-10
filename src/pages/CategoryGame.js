import { Link, useParams } from "react-router-dom"
import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useRef } from "react";

export default function CategoryGame() {
    const swiperContainerRef = useRef()
    const slug = useParams().slug;
    function prev() {
        swiperContainerRef.current.swiper.slidePrev()
    }
    return (
        <>
            <div className="mx-auto flex flex-col relative bg-[#0e141bcc]">
                <div className="backgroundoverlay bg-no-repeat bg-[url(https://res.cloudinary.com/dfo61m8dy/image/upload/v1704889982/library_hero_rqdfxb.jpg)]"></div>
                <div className="z-[1]">
                    <div className="text-5xl font-bold mx-auto max-w-[1050px] mt-[6rem] uppercase">
                        {slug}
                    </div> 
                    <div className="relative h-[350px] mt-7">
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
                            modules={[Navigation, A11y]}
                            rewind
                            className='swiper_slide_category'
                            style={{
                                '--swiper-theme-color': '#fff',
                                '--swiper-navigation-size': '30px',
                            }}
                        >

                            <SwiperSlide>
                                <div className="max-w-[950px] flex bg-[#0000004f] info-container">
                                    <Link className="h-[350px] w-[380px]">
                                        <div className="h-[90%] w-full">
                                            <img className="h-full w-full" src='https://res.cloudinary.com/dfo61m8dy/image/upload/v1704100838/ztccdgsit55ep2z39whd.avif'/>
                                        </div>
                                    </Link>
                                    <div className="flex flex-col w-full h-[300px] p-4">
                                        <div className="flex flex-row mb-2">
                                            <div>
                                                <Link className="ledding-[34px] font-semibold text-2xl mb-1">
                                                    Call of Duty
                                                </Link>
                                                <div className="text-lg text-[#c6d4df]">
                                                    Release date: <span>Oct 28, 2022</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-start">
                                            <div className="flex flex-wrap text-sm gap-[1px]">
                                                <Link className="bg-[#c6d4df26] py-[2px] px-[10px] rounded-sm hover:bg-white/[.3] mr-[2px] mb-[2px]">FPS</Link>
                                                <Link className="bg-[#c6d4df26] py-[2px] px-[10px] rounded-sm hover:bg-white/[.3] mr-[2px] mb-[2px]">Multiplayer</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="w-[1000px] max-w-[950px] flex bg-[#0000004f]">
                                    <Link className="h-[350px] w-[300px]">
                                        <div className="h-[80%] w-full">
                                            <img className="h-full w-full" src='https://res.cloudinary.com/dfo61m8dy/image/upload/v1704100838/ztccdgsit55ep2z39whd.avif'/>
                                        </div>
                                    </Link>
                                    <div className="flex flex-col w-full h-[300px] p-4">
                                        <div className="flex flex-row mb-2">
                                            <div>
                                                <Link className="ledding-[34px] font-semibold text-2xl mb-1">
                                                    Call of Duty
                                                </Link>
                                                <div className="text-lg text-[#c6d4df]">
                                                    Release date: <span>Oct 28, 2022</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-start">
                                            <div className="flex flex-wrap text-sm gap-[1px]">
                                                <Link className="bg-[#c6d4df26] py-[2px] px-[10px] rounded-sm hover:bg-white/[.3] mr-[2px] mb-[2px]">FPS</Link>
                                                <Link className="bg-[#c6d4df26] py-[2px] px-[10px] rounded-sm hover:bg-white/[.3] mr-[2px] mb-[2px]">Multiplayer</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
        
                        </Swiper>
                    </div>
                </div>
                <div className="mx-auto mb-5 max-w-[950px] mt-[900px]">
                    <div className="bg-gradient-to-t from-[#2C3037] to-[#505F6E]">
                        <div>
                            <div className="flex px-[16px] py-[4px] w-full items-center text-[#c6d4df]">
                                <div className="border-b-2 p-[4px] mb-[4px] mr-[8px] whitespace-nowrap cursor-pointer text-[#fff]">All ITEMS</div>
                                <div className='p-[4px] mb-[4px] mr-[8px] ml-[8px] whitespace-nowrap cursor-pointer'>TOP SELLERS</div>
                                <div className='p-[4px] mb-[4px] mr-[8px] ml-[8px] whitespace-nowrap cursor-pointer'>TOP RATED</div>
                                <div className='p-[4px] mb-[4px] mr-[8px] ml-[8px] whitespace-nowrap cursor-pointer'>POPULAR UPCOMING</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}