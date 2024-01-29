import { Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link,useLocation } from 'react-router-dom';
import { useLayoutEffect,useEffect, useRef, useState } from 'react';
import { useCart, useLogin } from '../LoginContext';

export default function Carousel(props) {
    const [activeSlide, setActiveSlide] = useState(0)
    const swiperRef = useRef(null);
    const [loggedIn, setLoggedIn] = useLogin();
    const [itemsInCart, setItemsInCart,getItemInCart, cartQuantity, setCartQuantity, getCartQuantity] = useCart();

    function handSlideChange() {
        const gamelogosRef = document.querySelectorAll(".game-logo");
        const GameInfoRef = document.querySelectorAll('.css-show');
        const realIndex = swiperRef.current.swiper.realIndex
        setActiveSlide(realIndex);

        GameInfoRef[realIndex].classList.add('game-name-show')
        GameInfoRef.forEach((info,i) => {
            if(i !== realIndex) {
                info.classList.remove('game-name-show')
            }
        })
        
        //gamelogosRef[realIndex].style.backgroundImage = `url(${props.newfeatured[realIndex].logo})`;
        gamelogosRef[realIndex].classList.remove("disappear")
        gamelogosRef[realIndex].classList.add("show")
        gamelogosRef.forEach((logo,i) => {
            if(i !== realIndex) {
                logo.classList.remove('show')
                logo.classList.add('disappear')
            }
    });
        
    }
    function Silde(index) {
        swiperRef.current.swiper.slideTo(index);
        const gamelogosRef = document.querySelectorAll(".game-logo");
        const GameInfoRef = document.querySelectorAll('.css-show');

        gamelogosRef[index].classList.remove('disappear')
        gamelogosRef[index].classList.add('show')
        gamelogosRef.forEach((logo,i) => {
            if(i !== index) {
                logo.classList.remove('show')
                logo.classList.add('disappear')
            }
        });
        
    }
    return (
        <>
            {props.newfeatured && props.newfeatured.length > 0 ? 
                <div className='mb-[50px] h-[600px]'>
                    <div className='flex w-full h-full'>
                        <div className="relative w-full h-full">
                            <Swiper
                                ref={swiperRef}
                                modules={[Autoplay]}
                                autoplay={{ delay: 7200, disableOnInteraction: false }}
                                //loop
                                allowTouchMove={false}
                                noSwiping={true}
                                speed={500}
                                className='carousel-swiper'
                                onSlideChange={() => {
                                    handSlideChange()
                                }}
                            >
                            {props.newfeatured.map((game, index) => {
                                return (
                                    <SwiperSlide>
                                        <div className='h-full w-full relative cursor-pointer rounded-xl'>
                                            <Link to={`/app/${game.slug}`} className='w-full h-full block rounded-xl'>
                                                    <img className='object-cover rounded-xl block h-full w-full' src={game.background}/>
                                                <div className={`absolute z-[1] left-[38px] w-[320px] bottom-[70px] flex flex-col items-start pointer-events-none transition-opacity duration-300 ease-in-out`}>
                                                    <div className='css-show game-name-show'>
                                                        <div>
                                                            <div className={`game-logo show w-[280px] h-[200px]`} style={{ backgroundImage: `url('${game.logo}')` }}></div>
                                                            <div className='overflow-hidden break-words	text-lg mb-2 font-bold'>
                                                                {game.name}
                                                            </div>
                                                        </div>
                                                        <div className=''>
                                                            <div className='text-lg font-medium'>
                                                                <span>
                                                                    {game.price}<span className='underline'>đ</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='mt-2'>
                                                            <div className='flex'>
                                                                <Link to={`/app/${game.slug}`} className='mr-[10px] min-w-[120px] relative items-center text-[#000] h-[40px] w-auto bg-[#fff] justify-center text-center rounded-sm inline-flex rounded'>
                                                                    BUY NOW
                                                                </Link>
                                                                {/* <button className='mr-[10px] min-w-[150px] relative items-center text-[#fff] h-[50px] bg-transparent w-auto  justify-center text-center rounded-sm inline-flex hover:bg-[#db55db] pointer-events-auto'
                                                                    onClick={() => addCart(game.id)}>
                                                                    <span>ADD TO CART</span>
                                                                </button> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                            </Swiper>
                        </div>
                        <div className='ml-[30px] basis-1/4 max-h-[100%]'>
                            <ul className='h-full w-full flex flex-col gap-1 relative'>
                                {props.newfeatured.map((game, index) => {
                                    return (
                                        <li className='rounded-2xl h-full flex overflow-hidden'>
                                            <div className='w-full h-full'>
                                                <Link>
                                                    <div className={`carouselThumbnail ${index === activeSlide ? ' slide addbackground' : 'removebackground'} p-4 rounded-2xl relative`}
                                                        onClick={(e) => Silde(index)}>
                                                        <div className='pr-[10px] w-full h-full relative flex justify-start  cursor-pointer'>
                                                            <div className='min-w-[63px] my-auto h-[74px] w-[58px] rounded-lg overflow-hidden z-[1] mr-[15px] '>
                                                                <img className='thumbnail-image w-full h-full ' src={game.cover}/>
                                                            </div>
                                                            <div className='font-medium text-[16px] z-[1] leading-6'>
                                                                <div className='overflow-hidden'>{game.name}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            : null}
        </>
    );
}