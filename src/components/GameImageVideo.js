import { useRef,useEffect,useState } from 'react';
import { baseUrl } from '../shared';
import axios from 'axios';
import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';

export default function GameImageVideo(props) {
    const swiperContainerRef = useRef()
    const videoRef = useRef(null);

    function playvideo(play) {
        if(play) {
            if (videoRef.current) {
                try {
                    videoRef.current.play();
                }
                catch(e) {
                    console.log(e)
                }
              }
        }
        else {
            try {
                videoRef.current.pause();
            }
            catch(e) {
                console.log(e)
            }
          }
    }

    useEffect(() => {
        playvideo(true)
    }, []);

    function VideoHandle() {
        const swiper = swiperContainerRef.current.swiper;
        const activeIndex = swiper.activeIndex;
        if(activeIndex !== 0) {
            playvideo(false)
        }
        else {
            playvideo(true)
        }
    }
    function prev() {
        swiperContainerRef.current.swiper.slidePrev()
    }
    function next() {
        swiperContainerRef.current.swiper.slideNext()
    }
    function test() {
        const swiper = swiperContainerRef.current.swiper
    }

    return (
        <>
        <div className='flex .main-container'>
            <div className='next-btn'>
                
            </div>
            <Swiper
                ref={swiperContainerRef}
                modules={[Navigation, A11y]}
                navigation
                rewind
                className='swiper_slide '
                onSlideChange={() => VideoHandle()}
                style={{
                    '--swiper-theme-color': '#fff',
                    '--swiper-navigation-size': '30px',
                }}
            >
                <SwiperSlide>
                    <video ref={videoRef} className="h-full rounded" controls preload="auto" muted>
                                <source src={props.video} type="video/mp4" />
                                <span>Your browser does not support the video tag.</span>
                    </video>
                </SwiperSlide>
                {props.game_image && props.game_image.length > 0 ? 
                    props.game_image.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image.image} className='h-full'></img>
                        </SwiperSlide>
                    ))
                : null}
            </Swiper>
            <div>
                
            </div>
        </div>
        </>
    );
}
// <div className='button'>
//                     <button onClick={() => prev()}>Prev</button>
//                     <button onClick={() => next()}>Next</button>
//                     <button onClick={() => test()}>Next</button>
//         </div>
