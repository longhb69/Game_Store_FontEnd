import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect,useState } from 'react';
import { baseUrl } from '../shared';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SwiperTest() {
  const [categories, setCategories] = useState();
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [last, setLast] = useState(null)

  const gradientColors = [
    'from-lime-600',
    'from-rose-600',
    'from-fuchsia-600',
    'from-violet-600',
    'from-indigo-600',
    'from-emerald-600',
    'from-amber-600',
    'from-red-600',
    'from-orange-600',
    'from-sky-600',
  ]
  const url_category = baseUrl + 'api/category/'

  function request(url) {
    axios.get(url, {
      method: 'GET',
      'Content-Type': 'application/json',
    }).then((response) => {
      console.log(url)
      setCategories(response.data.results)
      setNext(response.data.links.next)
      setPrev(response.data.links.previous)
      setLast(response.data.total_pages)
    })
    .catch((e) => {
      console.error('Error fetching data:', e);
    })

  }

  useEffect(() => {
    request(url_category)
  }, [url_category])
  return (
    <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
        
      }}
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
        {categories ? (
        <div className=''>
        {categories.map((category, index) => (
            <SwiperSlide>
                <Link className="transition-transform transform transform group hover:scale-105 hover:brightness-110 my-5" key={category.id} to={`/category/${category.slug}`}>
                <div className="mr-15 ml-15">
                    <div>
                    <img
                        className="w-72 h-72"
                        src={category.image}
                        alt={category.name}
                    />
                    </div>
                    <div
                        className={`gradient-overlay absolute bottom-0 left-0 right-0 w-72  h-full bg-gradient-to-t ${gradientColors[index % gradientColors.length]} to-white-500`}
                    ></div>
                    <span className="absolute bottom-5 left-0 right-0 w-72 bg-transparent text-white text-center py-2 text-2xl font-bold">
                        {category.name}
                    </span>
                    </div>
                </Link>
            </SwiperSlide>
        ))}
        </div>
        ) : null}
    </Swiper>
  );
};