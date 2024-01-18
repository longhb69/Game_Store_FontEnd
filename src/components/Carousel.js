import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Autoplay,Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../shared';
import { useCart, useLogin } from '../LoginContext';

export default function Carousel(props) {
    const [activeSlide, setActiveSlide] = useState(0)
    const swiperRef = useRef(null);
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useLogin();
    const [itemsInCart, setItemsInCart,getItemInCart, cartQuantity, setCartQuantity, getCartQuantity] = useCart();
    const location = useLocation();

    function addCart(game_id) {
        const url = baseUrl + 'cart/'
        const data = {type:'game', base_game_id: game_id}
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'), 
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.status === 403 || response.status === 401) {
                setLoggedIn(false);
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname
                    }
                });
            }
            else if(!response.ok) {
                throw new Error('Something went wrong')
            }
            getCartQuantity();
            getItemInCart();
            return response.json();
        })
    }
    function handSlideChange() {
        setActiveSlide(swiperRef.current.swiper.realIndex)
    }
    function Silde(index) {
       
        swiperRef.current.swiper.slideTo(index);
        //swiperRef.current.swiper.autoplay.start();
    }
    return (
        <>
            {props.newfeatured && props.newfeatured.length > 0 ? 
                <div className='mb-[50px]'>
                    <div className='flex '>
                        <div className="relative h-full">
                            <Swiper
                                ref={swiperRef}
                                modules={[Autoplay]}
                                autoplay={{ delay: 4200, disableOnInteraction: false }}
                                //loop
                                speed={700}
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
                                                    <img className='object-cover rounded-xl' src={game.background}/>
                                                <div className={`absolute z-[1] left-[32px] w-[320px] bottom-[40px] flex flex-col items-start pointer-events-none transition-opacity duration-300 ease-in-out`}>
                                                    <div>
                                                        <div className='overflow-hidden break-words	text-lg'>
                                                            {game.name}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='text-lg'>
                                                            <span>
                                                                {game.price}<span className='underline'>đ</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px]'>
                                                        <div className='flex'>
                                                            <Link to={`/app/${game.slug}`} className='mr-[10px] min-w-[150px] relative items-center text-[#000] h-[50px] w-auto bg-[#fff] justify-center text-center rounded-sm inline-flex'>
                                                                BUY NOW
                                                            </Link>
                                                            <button className='mr-[10px] min-w-[150px] relative items-center text-[#fff] h-[50px] bg-transparent w-auto  justify-center text-center rounded-sm inline-flex hover:bg-[#db55db] pointer-events-auto'
                                                                onClick={() => addCart(game.id)}>
                                                                <span>ADD TO CART</span>
                                                            </button>
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
                        <div className='ml-[30px] basis-1/4'>
                            <ul className='h-full w-full flex flex-col relative'>
                                <li></li>
                                {props.newfeatured.map((game, index) => {
                                    return (
                                        <li className='rounded-2xl flex h-[20%] overflow-hidden] mb-2'>
                                            <div className='w-full h-full'>
                                                <Link>
                                                    <div className={`carouselThumbnail ${index === activeSlide? ' slide addbackground' : 'removebackground'} p-4 rounded-2xl relative`}
                                                        onClick={(e) => Silde(index)}>
                                                        <div className='pr-[10px] w-full h-full relative flex justify-start items-center cursor-pointer'>
                                                            <div className='min-w-[63px] my-auto h-[80px] w-[63px] rounded-lg overflow-hidden z-[1] mr-[15px]'>
                                                                <img className='thumbnail-image w-full h-full object-fit' src={game.cover}/>
                                                            </div>
                                                            <div className='font-base z-[1] leading-5'>
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